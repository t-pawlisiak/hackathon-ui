import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'build')));


function removeDuplicates(arr: any) {
    return arr.filter((item: any, index: any) => {
        return arr.indexOf(item) === index;
    });
}


app.post('/suggestions/organizations', async (req: Request, res: Response) => {
   res.json(await db.any(
     `SELECT id, name FROM organizations WHERE
     name ILIKE $1 OR
     id::text ILIKE $1
     limit 10`,
     ["%" + req.body.query + "%"]
   ));
});

app.post('/suggestions/workspaces', async (req: Request, res: Response) => {
  const data = req.body;

   res.json(await db.any(
     `SELECT id, name FROM projects WHERE name ILIKE
     $1 and organization_id = $2 or
     id::text ILIKE $1
     limit 10`,
     [
       "%" + req.body.query + "%",
       data.organization_id,
     ]
   ));
});

app.post('/suggestions/prompts', async (req: Request, res: Response) => {
  const data = req.body;

  let prompts = (await promptsHistory) as string[];

  // if (data.query) {
  //   prompts = prompts.filter((s) => s.toLowerCase().indexOf(data.query) === 0)
  // }

  res.json(prompts);
});

app.post('/messages', async (req: Request, res: Response) => {
  let tries = 0;

  if (req.body.prompt == "INVALID REQUEST") {
    return res.status(500).end("Invalid requests")
  }

  const tryPrompt = () =>
    prompt(req.body as any)
      .then(r => res.json(r))
      .catch(e => {
        console.error(e);

        if (tries++ > 3) {
          console.log({tries})
          res.status(500).end(`Error: ${e}`)
        }
        else tryPrompt()
      })

  tryPrompt();
});

interface MessageProps {
  organization?: number;
  wokspace_id?: number;
  industry?: string;
  prompt: string;
};

const prompt = async (data: MessageProps) => {
  console.log("===================")

  let prompt = promptIntro;
  let conditions: string[] = [];

  if (data.organization) {
    conditions.push(`organization with id ${data.organization}`)
  }

  if (data.wokspace_id) {
    conditions.push(`workspace with id ${data.wokspace_id}`)
  }

  if (data.industry) {
    conditions.push(`industry "${data.industry}"`)
  }

  if (conditions.length) {
    prompt += "Given following conditions:\n"
    prompt += conditions.map(_ => ` - ${_}`).join("\n")
  }

  prompt += `\n\n${data.prompt}\n`;
  prompt += promptOutro;

  console.log(prompt);

  const messages = [
    { role: "user", content: prompt },
    { role: "system", content: `
- Write only query without any text, only sql
- Limit every query to max 10 rows
- In select fields use human readable values e.g. SELECT survey_points_count as 'Responses count' etc
- Never select survey id or organization id or any id at all
- Select max 5 columns
- When you are asked about completion rate or response rate take only rates that are <= 90. Use where condition e.g. completion_rate < 80
- Always add order closure
- Always use group by, rows are time aggregated basing on month value.
    ` },
  ];

  const options = {
    temperature: 0,
    max_tokens: 1400,
  };

  const getQuery = async () => {
    const choices = await createChatCompletion(messages, options);

    const msg = choices[0].message;

    messages.push(msg)

    const query = choices[0].message.content;

    console.log("====== Query")
    console.log(query);

    return query;
  }

  let tries = 0;

  const getResult = async (): Promise<any> => {
    return await db.any(await getQuery())
      .catch((e: any) => {
        if (tries++ > 4) return e;

        console.log(`Error: ${e.message}`)

        messages.push({ role: 'system', content: `I ran the query and Postgres thrown following error:\n${e.message}\n\n Fix the query`});

        return getResult();
      })
    ;
  }

  const result = await getResult();

  console.log("====== Results")

  console.log(result)

  messages.push({
    role: "system",
    content: `I ran the query and there is the result in json: ${JSON.stringify(result)}. \n Write a summary in markdown, add your interpretation to this. Add suggestions to the initial user prompt.`,
  })

  // const choices = await createChatCompletion(messages, options);
  //
  // console.log(choices);

  const prompts = await promptsHistory;

  prompts.push(data.prompt);

  writeAsync(removeDuplicates(prompts))

  return result;
};


const PORT = (process.argv[2] ?? 3000) as any;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});


import pgPromise from "pg-promise";
import { readAsync, writeAsync } from './localStorage';
import { env } from './env';

const pgp = pgPromise({});

const connection = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_DB,
  user: env.DB_USER,
  password: env.DB_PASS,
};

const db = pgp(connection as any);

const openai = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${env.OPENAI_SECRET}`,
  },
});


async function createChatCompletion(messages: any, options = {}) {
  try {
    const response = await openai.post("/chat/completions", {
      model: "gpt-4",
      messages,
      ...options,
    });

    return response.data.choices;
  } catch (error) {
    console.error("Error creating chat completion:", error);
  }
}

const viewName = `ai_statistics_v5`;
const promptIntro = `
In survey hosting company we want to analyze some metrics.

There is a table in postgres sql:

CREATE TABLE ${viewName} (
  month DATE,
  org_id VARCHAR(255),
  survey_type VARCHAR(255),
  survey_name VARCHAR(255),
  organization_name VARCHAR(255),
  workspace_id VARCHAR(255),
  industry VARCHAR(255),
  completion_rate INTEGER,
  response_count VARCHAR(255),
  survey_points_count VARCHAR(255),
  score_type VARCHAR(255),
  nps_score VARCHAR(255),
  response_rate integer
);

response_rate and competion_rate is percent value
survey_points_count is number of questions in the survey
survey_type is sometimes called survey channel
allowed vlues for survey type are: PageSurvey, MobileSurvey, IntercomSurvey, WidgetSurvey, FeedbackSurvey



industry is an enum. Below all allowed values are listed. If user provide invalid one use some familiar one:
Arts, Automotive, Constructions & Engineering, Consulting, Consumer Goods, Education, Energy, Entertainment, Finance, Fintech, Food & Beverages, Government, Healthcare, Human Resources, Insurance, IT, Logistics, Manufacturing, Marketing, Media, NGO, Professional Services, Real Estate, Restaurants, Retail, Software, Sports, Telecom, Travel & Leisure, Other
`;

const promptOutro = `

Write only query without formatting please and addional text, just sql itself

In select fields use human readable values e.g. SELECT survey_points_count as 'Responses count' etc
`

// db.any(`
// CREATE materialized view ai_statistics_v5 AS
// SELECT s.id as survey_id, s.name as survey_name, s.type as survey_type, ss.month as month,
//     o.id as org_id, o.name as organization_name, o.company_type as industry,
//     s.project_id as worksapce_id,
//     sp.count as survey_points_count,
//     ss.responses_count as response_count,
//     ss.response_rate as response_rate,
//     CASE WHEN ss.responses_count > 0 THEN least(round(cr.completion_rate_sum/ss.responses_count, 2), 100) END as completion_rate,
//     npsscore.NPS_score
// FROM surveys as s
//         LEFT JOIN projects as p ON s.project_id = p.id
//         LEFT JOIN organizations as o on p.organization_id = o.id
//         LEFT JOIN (SELECT count(id) as count, survey_id FROM survey_points group by survey_id) as sp on sp.survey_id=s.id
//         LEFT JOIN (SELECT sum(completion_rate) as completion_rate_sum,DATE_TRUNC('month', created_at) as month, r.survey_id as rid FROM responses as r group by month, r.survey_id) as cr on s.id=cr.rid and month = month
//         INNER JOIN (SELECT survey_id,
//                        DATE_TRUNC('month', collected_at) AS month,
//                        SUM(responses_count) as responses_count,
//                        least(round(SUM(responses_count) *100/ NULLIF(SUM(visitors_count), 0), 2), 100) AS response_rate
//                    FROM survey_stats
//                    WHERE collected_at >= NOW() - INTERVAL '1 year'
//                    GROUP BY survey_id, month) as ss on ss.survey_id = s.id
//         LEFT JOIN (SELECT npsscore.NPS_score as NPS_score, npsscore.survey_id as survey_id, month FROM (
//                    WITH NPS_CTE AS (
//                        SELECT
//                            sp.id AS survey_point_id,
//                            CASE
//                                WHEN CAST(vp.content AS INTEGER) BETWEEN 9 AND 10 THEN 'Promoter'
//                                WHEN CAST(vp.content AS INTEGER) BETWEEN 7 AND 8 THEN 'Passive'
//                                ELSE 'Detractor'
//                                END AS respondent_type,
//                            sp.survey_id as survey_id,
//                            date_trunc('month', vp.created_at) as month
//                        FROM survey_points sp
//                                 LEFT JOIN visit_points vp ON vp.survey_point_id = sp.id
//                        WHERE sp.type = 'SurveyNps'
//                          AND vp.content SIMILAR TO '[0-9]+'
//                    )
//                    SELECT
//                        survey_id,
//                        month,
//                        COUNT(*) AS total_responses,
//                        SUM(CASE WHEN respondent_type = 'Promoter' THEN 1 ELSE 0 END) AS promoters_count,
//                        SUM(CASE WHEN respondent_type = 'Detractor' THEN 1 ELSE 0 END) AS detractors_count,
//                        ROUND(100.0 * SUM(CASE WHEN respondent_type = 'Promoter' THEN 1 ELSE 0 END) / COUNT(*)) AS promoters_percentage,
//                        ROUND(100.0 * SUM(CASE WHEN respondent_type = 'Detractor' THEN 1 ELSE 0 END) / COUNT(*)) AS detractors_percentage,
//                        ROUND(100.0 * SUM(CASE WHEN respondent_type = 'Promoter' THEN 1 ELSE 0 END) / COUNT(*)
//                            - 100.0 * SUM(CASE WHEN respondent_type = 'Detractor' THEN 1 ELSE 0 END) / COUNT(*)) AS NPS_score
//                    FROM NPS_CTE
//                    GROUP BY month, survey_id
//                    ORDER BY total_responses desc) as npsscore ) as npsscore on npsscore.survey_id = s.id
// ;
// `).catch(console.error).then(_ => console.log("MIGRATION DONE"))


// PORT == "3000" || prompt({
//   // organization: 100,
//   prompt: ` Show me 3 surveys with the best completion rate that is not 100%`
// }).catch(console.error)

const promptsHistory = readAsync().then(removeDuplicates);

// prompt({
//   prompt: "Show me max and min nps score for 5 organisations with highest response count, include their industry to the report. "
// })
