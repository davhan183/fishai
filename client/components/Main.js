import { Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { CustomButton } from '../components/CustomButton';
import Logo from '../assets/logo.png'

export default function Main(props) {
  const { goHome, analyze, example } = props;
  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
      <Grid item>
        <img src={Logo.src} className='center'/>
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
          onClick={goHome}
          children={
            <>
              Upload Image
              <input hidden accept='image/*' multiple type='file' onChange={analyze} />
            </>
          }  
        />
      </Grid>
      <Grid item>
        <Link style={{ color: '#699ed3' }} underline='none' onClick={example}>
          See Example
        </Link>
      </Grid>
    </Grid>
  )
}