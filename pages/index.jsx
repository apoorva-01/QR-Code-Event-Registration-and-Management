import React, { useContext, useEffect} from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataStore } from '../utils/DataStore';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
const theme = createTheme();

export default function SignInSide() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const { state, dispatch } = useContext(DataStore);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, [userInfo,router]);

  const submitHandler = async ({ email, mobile }) => {
    closeSnackbar();
    try {
      Cookies.set('registeringUserData', {"email":email,"mobile":mobile} );
      router.push(redirect || '/step2');
    } catch (err) {
      enqueueSnackbar("There is some error",
        { variant: 'error' }
      );
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
              <Typography component="p" sx={{ fontWeight: 700 }} variant="h6">
                Registeration
              </Typography>
              <Box sx={{ mt: 1 }}>

                {/* Email */}
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <TextField
                      sx={{ my: 4 }}
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email"
                      inputProps={{ type: 'text' }}
                      error={Boolean(errors.email)}
                      helperText={
                        errors.email?'Email is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>



                <Controller
                  name="mobile"
                  control={control}
                  defaultValue=""
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
                          ? errors.mobile.type === 'minLength'
                            ? 'Mobile length must be more than 8'
                            : 'Mobile is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>


                  <Button className='hvr-grow' type="submit" 
                    style={{ width: '100%', backgroundColor: '#38B6FF', color: 'white', marginTop: '2rem', marginBottom: '2rem' }} >
                    Next
                  </Button>
                
            
              </Box>
            </Box>
          </form>
        
    </ThemeProvider>
  );
}