import styled from '@emotion/styled';
import { InputLabel, InputLabelProps, Theme } from '@mui/material';
import React from 'react';

interface StyledInputLabelProps extends InputLabelProps {
  theme: Theme;
}

const ExtendInputLable = styled(InputLabel)((props: StyledInputLabelProps) => {
  // const { theme } = props;
  return {
    '&': {
      fontSize: '20px',
      marginTop: '20px',
      color: 'black',
    },
  };
});

const StyledInputLabel = (props: StyledInputLabelProps): JSX.Element => {
  return <ExtendInputLable {...props} />;
};
export default StyledInputLabel;
