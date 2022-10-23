import Button from '@mui/material/Button';

export const CustomButton = (props) => (
  <Button
    variant='contained'
    style={{ maxWidth: '150px', maxHeight: '50px', minWidth: '150px', minHeight: '50px' }}
    sx={{ color: 'white', backgroundColor: '#1952EB', borderColor: '#1952EB' }}
    {...props}
  >
    {props.children}
  </Button>
)