import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataStore } from '../../utils/DataStore';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import axios from 'axios'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const theme = createTheme();

export default function AlreadyRegistered() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const { state } = useContext(DataStore);
  const { userInfo } = state;
  useEffect(() => {

  }, [userInfo, router]);

  const submitHandler = async ({ mobile }) => {

    closeSnackbar();
    try {
      const { data } = await axios.post('/api/fetchEntryByMobile', { mobile });
      console.log(data)
      Cookies.set('alreadyRegisteredUserData', data);
      router.push(redirect || '/already-registered/step2');
    } catch (err) {
      enqueueSnackbar("There is some error",{ variant: 'error' });
    }
  };

  return (
    <ThemeProvider theme={theme}>

      <form onSubmit={handleSubmit(submitHandler)} >
        <Box
          sx={{
            my: 8,
            mx: 4,
          }}
        >
           <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={() => router.back()} />


          <Typography style={{ marginTop: 10 }} component="p" sx={{ fontWeight: 700 }} variant="h6">
            Enter the Mobile Number you used while Registration
          </Typography>
          <Box sx={{ mt: 1 }}>


            <Controller
              name="mobile"
              control={control}
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({ field }) => (
                <TextField
                  sx={{ mb: 4 }}
                  variant="outlined"
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  inputProps={{ type: 'number' }}
                  error={Boolean(errors.mobile)}
                  helperText={
                    errors.mobile
                      ? errors.mobile.type === 'minLength' ? 'Mobile length must be more than 8'
                        : 'Mobile is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>


            <Button className='hvr-grow' type="submit"
              style={{ width: '100%', backgroundColor: '#202082', color: 'white', marginTop: '2rem', marginBottom: '2rem' }} >
              Submit
            </Button>

            <Typography textAlign="center">
              <Link href="/" style={{ color: "#202082" }}>Have not Registered? Click Here</Link>
            </Typography>

          </Box>
        </Box>
      </form>

    </ThemeProvider>
  );
}