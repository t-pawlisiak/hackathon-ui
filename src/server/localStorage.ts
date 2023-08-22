const filePath = "prompts.txt";

import { promises as fs } from 'fs';

export async function writeAsync(content: any): Promise<void> {
  const serializedContent = JSON.stringify(content, null, 2);  // 2 spaces indentation
  await fs.writeFile(filePath, serializedContent, 'utf8');
}

// Read content from a file and parse it from JSON format
export async function readAsync(): Promise<any> {
  const serializedContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(serializedContent);
}

