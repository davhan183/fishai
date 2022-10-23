import { useState } from 'react';
import { Grid, Typography } from '@mui/material';

import { CustomButton } from '../components/CustomButton';
import { Accordion, AccordionDetails, AccordionSummary } from '../components/CustomAccordion';

export default function Result(props) {
  const { data, isExample, goHome } = props;

  const [expanded, setExpanded] = useState('panel1');
  const handleChange = (panel) => (newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      <Grid container direction='column' justifyContent='center' alignItems='center' spacing={2} margin-left='3vw'>
        <Grid item>
          <img class='fish-img'
            src={!isExample ? url : 'https://3try4a3p71br2sde7i3zw7sx-wpengine.netdna-ssl.com/wp-content/uploads/2014/08/Atlantic-Cod-1-770x510.jpg'}
            height='50'
            width='100'
            style={{ borderColor: data.allowed_catch ? '#56a446' : '#FF0000'}}
          />
        </Grid>
        <Grid item>
          <Typography variant='h3' align='center'>The fish identified was</Typography>
        </Grid>
        <Grid item>
          <Typography variant='h2' align='center'>{data.name}</Typography>
        </Grid>
        <Grid item>
          <Accordion 
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            sx={{ borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
          >
            <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
              <Typography sx={{ fontWeight: 'bold' }}>Is Endangered?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {data.allowed_catch == 0 ? 'Yes' : 'No'}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
              <Typography sx={{ fontWeight: 'bold' }}>Time period (allowed to catch)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {data.dates}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
              <Typography sx={{ fontWeight: 'bold' }}>Minimum size</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {data.minimum_size} inches
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion 
            expanded={expanded === 'panel4'} 
            onChange={handleChange('panel4')} 
            sx={{borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px'}}
          >
            <AccordionSummary aria-controls='panel4d-content' id='panel4d-header'>
              <Typography sx={{ fontWeight: 'bold' }}>Description</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {data.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item>
          <CustomButton onClick={goHome} children={'To Home'}/>
        </Grid>
      </Grid>
      <img class='logo-img'
        src='https://drive.google.com/uc?export=view&id=1xsPQpPHm8moF9j1hDlrxo9SFYFbfFsGg'
      />
    </>
  )
}