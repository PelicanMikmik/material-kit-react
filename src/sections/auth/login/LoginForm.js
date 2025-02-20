import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Iconify from '../../../components/iconify';

export default function LoginForm({ socket }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');

  const handleClick = (e) => {
    e.preventDefault();

    if (userName === 'admin') {
      localStorage.setItem('userName', userName);
      socket.emit('newUser', { userName, socketID: socket.id });
      navigate('/dashboard/app', { replace: true });
    } else {
      localStorage.setItem('userName', userName);
      socket.emit('newUser', { userName, socketID: socket.id });
      navigate('/userPlayer', { replace: true });
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="username"
          label="Name"
          type="text"
          minLength={3}
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} sx={{ my: 2 }}>
        Login
      </LoadingButton>
    </>
  );
}

LoginForm.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
