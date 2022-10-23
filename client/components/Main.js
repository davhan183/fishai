import { Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { CustomButton } from '../components/CustomButton';

export default function Main(props) {
  const { goHome, analyze, example } = props;
  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
      <Grid item>
        <img src='https://drive.google.com/uc?export=view&id=1xsPQpPHm8moF9j1hDlrxo9SFYFbfFsGg' className='center'/>
      </Grid>
        <Typography
          variant='h3'
          align='center'
          mb={3}
        >
          Check the endangered status of your fish!
        </Typography>
      <Grid item>
        <CustomButton
          component='label'
          onClick={props.goHome}
          children={
            <>
              Upload Image
              <input hidden accept='image/*' multiple type='file' onChange={props.analyze} />
            </>
          }  
        />
      </Grid>
      <Grid item>
        <Link style={{ color: '#699ed3' }} underline='none' onClick={props.example}>
          See Example
        </Link>
      </Grid>
    </Grid>
  )
}