import { fetchRow } from '../../utils/googleSheet';
import Layout from '../../Layout/Layout'
import axios from 'axios';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
export default function IndexPage({data }) {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  function markAttendance ( email){
    try {
        const data= axios.post('/api/attendance', { email });
        enqueueSnackbar("Attendance Marked", { variant: 'success' });
    } catch (err) {
        enqueueSnackbar("There is some error", { variant: 'error' });
    }
};



  return (
    <Layout>
      {data}

      <Button className='hvr-grow' onClick={()=>markAttendance(data[3])}
                    style={{ width: '100%', backgroundColor: '#38B6FF', color: 'white', marginTop: '2rem', marginBottom: '2rem' }} >
                    Mark Attendance
                  </Button>
    </Layout>
  );
}


export async function getServerSideProps(context) {
  const { email } = context.query;

  // Fetch data for the given email from your database or API
  const data = await fetchRow(email);
  console.log(data)
  return {
    props: {data:data}
  };
}