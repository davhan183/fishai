import { Grid, Typography } from '@mui/material';

import { CustomButton } from '../components/CustomButton';

export default function NoResult(props) {
  const { url, goHome } = props;
  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' spacing={2} margin-left='3vw'>
      <Grid item>
        <img class='fish-img'
          src={url}
          height='50'
          width='100'
        />
      </Grid>
      <Grid item>
        <Typography variant='h3' align='center' mb={3}>No fish species in data was identified</Typography>
      </Grid>
      <Grid item>
        <CustomButton onClick={goHome} children={'To Home'}/>
      </Grid>
    </Grid>
  );
};