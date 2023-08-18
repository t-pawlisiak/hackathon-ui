import React, { useContext } from 'react';
import { Button, Table, TableHead, TableBody, TableCell, TableRow, TableContainer } from '@mui/material';
import { ConfigContext } from './ConfigProvider';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'

const generatePDF = () => {
  const doc = new jsPDF();
  
  autoTable(doc, { html: '#results-table table' });
  doc.save('table.pdf');
};

const ResultsTable: React.FC = () => {
  const { response } = useContext(ConfigContext);

  return (
    <div>
      <TableContainer id="results-table">
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(response[0]).map((key) => (
                <TableCell><strong>{key}</strong></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {response.map((result) => (
              <TableRow>
                {Object.keys(result).map((key) => (
                  <TableCell>{ !isNaN(parseInt(result[key])) ? parseInt(result[key]).toFixed(2) : result[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        onClick={generatePDF}
        variant="contained"
        color="primary"
        style={{ marginTop: '1rem' }}
      >
        Download PDF
      </Button>
    </div>
  )
}

export default ResultsTable;
