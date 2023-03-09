import { getData } from '../../utils/googleSheet';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Layout from '../../Layout/Layout'
export default function IndexPage({ data }) {
  return (
    <Layout>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {data.map((row, rowIndex) => (
              <div key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell align="right" key={cellIndex}>{cell}</TableCell>
                ))}
              </div>
            ))}
            {/* {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      </Layout>
  );
}

export async function getStaticProps() {
  const data = await getData();
  return {
    props: {
      data: data, // remove sheet header
    },
  };
}