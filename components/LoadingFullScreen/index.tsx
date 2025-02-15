import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {}

const LoadingFullScreen = (props: Props) => {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 bg-white z-50 flex items-center justify-center'>
      <CircularProgress />
    </div>
  )
}

export default LoadingFullScreen