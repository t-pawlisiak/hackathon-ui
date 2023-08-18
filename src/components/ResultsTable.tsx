import React, { useContext } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer } from '@mui/material';
import { ConfigContext } from './ConfigProvider';

const ResultsTable: React.FC = () => {
  const { response } = useContext(ConfigContext);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(response[0]).map((key) => (
              <TableCell>{key}</TableCell>
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
  ) 
}

export default ResultsTable;
