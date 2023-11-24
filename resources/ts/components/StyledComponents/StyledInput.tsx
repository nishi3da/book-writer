import styled from '@emotion/styled';
import { InputBase, InputBaseProps, Theme, alpha } from '@mui/material';
import { forwardRef } from 'react';

interface StyledInputProps extends InputBaseProps {
  theme: Theme;
}

const ExtendInput = styled(InputBase)((props: StyledInputProps) => {
  const { theme } = props;
  return {
    '&': {
      width: '100%',
      maxWidth: '100%',
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 12,
      width: '100%',
      padding: '10px 12px',
      marginBottom: '10px',
      transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"'].join(','),
      '&S:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  };
});

const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>((props, ref) => {
  const { theme, ...rest } = props;
  return <ExtendInput {...rest} ref={ref} theme={theme} />;
});
export default StyledInput;
