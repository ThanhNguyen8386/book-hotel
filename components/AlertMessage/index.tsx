import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

interface AlertSnackbarProps {
  message: string;
  type?: AlertColor; // 'success' | 'info' | 'warning' | 'error'
  show: boolean;
  duration?: number;
  onClose?: () => void;
}

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({
  message,
  type = 'info',
  show,
  duration = 3000,
  onClose,
}) => {
  const [open, setOpen] = useState(show);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    onClose?.();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // 👈 vị trí
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={type}
        sx={{ width: '100%' }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertSnackbar;
