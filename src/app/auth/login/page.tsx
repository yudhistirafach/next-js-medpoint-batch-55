'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { loginAction } from './actions';
import { Input } from '@/components';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LoginIcon from '@mui/icons-material/Login';
import { Alert, Snackbar } from '@mui/material';
import React from 'react';

export default function LoginPage() {
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});

  // Set alert
  const [alert, setAlert] = React.useState<{
    open: boolean;
    message: string;
    severity: 'error';
  }>({
    open: false,
    message: '',
    severity: 'error',
  });

  const handleSubmit = async (formData: FormData): Promise<void> => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const newErrors: typeof errors = {};

    // Email Validation
    if (!email) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = 'Format email tidak valid';

    // Password Validation
    if (!password) newErrors.password = 'Password wajib diisi';
    else if (password.length < 6)
      newErrors.password = 'Password minimal 6 karakter';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const result = await loginAction(formData);

      if (!result?.success) {
        setAlert({
          open: true,
          message: result.error,
          severity: 'error',
        });
      }
    } catch (error) {  // eslint-disable-line @typescript-eslint/no-unused-vars
      setAlert({
        open: true,
        message: 'Terjadi kesalahan pada server. Silahkan coba lagi.',
        severity: 'error',
      });
    }
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}
    >
      {/* Alert for error */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      <Box>
        <Image
          src="/mediverse-logo.png"
          alt="Mediverse Logo"
          width="200"
          height="200"
          style={{ marginBottom: '40px' }}
        />
      </Box>
      <Box
        sx={{
          flex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          px: 8,
        }}
      >
        {/* Login FORM */}
        <Box
          component="form"
          action={handleSubmit}
          sx={{ width: '100%', maxWidth: 500 }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography component="h1" variant="h3" sx={{ fontWeight: 'bold' }}>
              Selamat Datang
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              align="left"
              sx={{ color: 'gray' }}
            >
              Masuk dan kelola dashboard Mediverse Anda sekarang
            </Typography>
          </Box>
          <Box>
            <Input
              label="Email"
              name="email"
              autoComplete="email"
              type="email"
              placeholder="Masukkan email"
              error={!!errors.email}
              helperText={errors.email}
              icon={<MailOutlineIcon />}
              autoFocus
            />
            <Input
              label="Password"
              name="password"
              type="password"
              error={!!errors.password}
              helperText={errors.password}
              placeholder="Masukkan password"
              autoComplete="current-password"
              autoFocus
              icon={<LockOutlinedIcon />}
            />
            <Link
              href="#"
              color="inherit"
              sx={{
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'end',
                textDecorationLine: 'none',
              }}
            >
              Lupa kata sandi?
            </Link>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 3,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  width: 300,
                  borderRadius: 999,
                  backgroundColor: '#6200EE',
                  color: 'white',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  justifyContent: 'center',
                  '&:hover': {
                    backgroundColor: '#4B00C4',
                  },
                }}
                endIcon={<LoginIcon sx={{ fontSize: 18 }} />}
              >
                MASUK SEKARANG
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* RIGHT Panel */}
      <Box
        sx={{
          flex: 7,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(180deg, #5E35B1 0%, #7E57C2 100%)',
          color: 'white',
          borderTopLeftRadius: '40px',
          borderBottomLeftRadius: '40px',
          borderTopRightRadius: '40px',
          borderBottomRightRadius: '40px',
          position: 'relative',
          overflow: 'hidden',
          px: 4,
          m: 3,
        }}
      >
        <Image
          src="/mediverse-logo.png"
          alt="Mediverse Logo"
          width={150}
          height={150}
          style={{ marginBottom: 24 }}
        />

        <Box sx={{ position: 'relative', width: 380, height: 380, mb: 4 }}>
          <Image
            src="/ornamen-circle.png"
            alt="Ornament"
            fill
            style={{ objectFit: 'contain' }}
          />
          <Image
            src="/mediverse-person.png"
            alt="Mediverse Assistant"
            fill
            style={{ objectFit: 'contain', zIndex: 2 }}
          />
        </Box>

        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: 400,
            letterSpacing: 0.5,
            lineHeight: 1.4,
          }}
        >
          Your Personal <br />
          Healthcare Assistant
        </Typography>
      </Box>
    </Container>
  );
}
