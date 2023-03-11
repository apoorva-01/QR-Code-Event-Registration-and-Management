import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MenuItem } from '@material-ui/core';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Link from 'next/link'
import axios from 'axios';
const theme = createTheme();

const PREFIX_OPTIONS = [
    {
        value: 'mr',
        label: 'Mr.',
    },
    {
        value: 'ms',
        label: 'Ms.',
    },
    {
        value: 'mrs',
        label: 'Mrs.',
    },
];


export default function Step2() {
    const {
        handleSubmit,
        control, watch,
        formState: { errors },
    } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const { redirect } = router.query; // login?redirect=/shipping
    useEffect(() => {
        const oldData = Cookies.getJSON('registeringUserData') || {};
        if (!oldData) {
            router.push('/');
        }
    }, [router]);

    const submitHandler = async ({ registerationType, prefix, firstName, lastName, organisation, address }) => {
        closeSnackbar();
        try {
            const oldData = Cookies.getJSON('registeringUserData') || {};
            const data = { "registerationType": registerationType, "prefix": prefix, "firstName": firstName, "lastName": lastName, "organisation": organisation, "address": address }
            const newData = { ...oldData, data }
            Cookies.set('registeringUserData', newData);

            await axios.post('/api/addData', { prefix, firstName, lastName, email: oldData.email, mobile: oldData.mobile, organisation, registerationType, address });
            router.push(redirect || '/step3');

        } catch (err) {
            enqueueSnackbar("There is some error", { variant: 'error' });
        }
    };

    const type = watch('registerationType'); // get the value of the gender field

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
                        Registeration Type
                    </Typography>
                    <Box sx={{ mt: 1 }}>

                        <Controller
                            name="registerationType"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            defaultValue="individual"
                            render={({ field }) => (
                                <RadioGroup {...field} sx={{ my: 2 }} row>
                                    <FormControlLabel value="organisation" control={<Radio />} label="Organisation" />
                                    <FormControlLabel value="individual" control={<Radio />} label="Individual" />

                                </RadioGroup>
                            )}
                        ></Controller>


                        <Stack direction="row" sx={{ my: 2 }} spacing={2}>

                            <Controller rules={{
                                required: true,
                            }}
                                name="prefix"
                                control={control}
                                defaultValue="mr"
                                render={({ field }) => (
                                    <TextField
                                        select
                                        fullWidth
                                        label="Prefix"
                                        variant="outlined"
                                        {...field}
                                    >
                                        {PREFIX_OPTIONS.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />

                            <Controller rules={{
                                required: true,
                            }}
                                name="firstName"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        sx={{ my: 2 }}
                                        variant="outlined"
                                        fullWidth
                                        label="First Name"
                                        helperText={
                                            errors.firstName ? 'It is required'
                                                : ''
                                        }
                                        {...field}
                                    />
                                )}
                            />

                            <Controller rules={{
                                required: true,
                            }}
                                name="lastName"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        sx={{ my: 2 }}
                                        variant="outlined"
                                        fullWidth
                                        label="Last Name"
                                        helperText={
                                            errors.lastName ? 'It is required'
                                                : ''
                                        }
                                        {...field}
                                    />
                                )}
                            />
                        </Stack>

                        {type === 'organisation' && (
                            <Controller
                                name="organisation"
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <TextField
                                        sx={{ my: 2 }}
                                        variant="outlined"
                                        fullWidth
                                        label="Organization"
                                        {...field}
                                    />
                                )}
                            />
                        )}

                        <Controller rules={{
                            required: true,
                        }}
                            name="address"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    sx={{ my: 2 }}
                                    variant="outlined"
                                    fullWidth
                                    label="Address"
                                    multiline
                                    helperText={
                                        errors.address ? 'It is required'
                                            : ''
                                    }
                                    rows={4}
                                    {...field}
                                />
                            )}
                        />

                        <Stack direction="row" sx={{ my: 2 }} spacing={2}>
                            <Link href="/">
                                <Button className='hvr-grow' type="submit"
                                    style={{ width: '100%', backgroundColor: '#202082', color: 'white', marginTop: '2rem', marginBottom: '2rem' }} >
                                    Back
                                </Button>
                            </Link>
                            <Button className='hvr-grow' type="submit"
                                style={{ width: '100%', backgroundColor: '#202082', color: 'white', marginTop: '2rem', marginBottom: '2rem' }} >
                                Next
                            </Button>
                        </Stack>

                    </Box>
                </Box>
            </form>

        </ThemeProvider>
    );
}