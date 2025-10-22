'use client';

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type InputProps = TextFieldProps & {
  label: string;
  icon?: React.ReactNode;
};

export default function Input({
  label,
  icon,
  type = 'text',
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === 'password';
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return (
    <Box sx={{ mb: 3, width: '100%' }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          mb: 1,
          fontSize: '1rem',
        }}
      >
        {label}
      </Typography>
      <TextField
        {...props}
        type={isPassword && showPassword ? 'text' : type}
        fullWidth
        slotProps={{
          input: {
            startAdornment: icon ? (
              <InputAdornment position="start" sx={{ color: 'primary' }}>
                {icon}
              </InputAdornment>
            ) : undefined,
            endAdornment: isPassword ? (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : undefined,
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            borderColor: 'white',
            '& fieldset': {
              borderColor: 'currentColor', 
            },
          },
        }}
      />
    </Box>
  );
}
