import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import axios from 'axios';
import { Badge, Tooltip, CircularProgress, Grid, TextField, FormControl, Box, Paper } from "@mui/material";

import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';

declare var process : { env: { API_URL: string } }
const apiUrl: string = (process.env.API_URL as string) || 'http://localhost:8000';

// CSS for the Notice Boxes and Footer
const customStyles = `
  .notice-box {
    display: flex;
    gap: 12px;
    padding: 15px;
    margin: 10px auto;
    max-width: 800px;
    font-size: 0.9rem;
    text-align: left;
    border-radius: 4px;
    line-height: 1.5;
  }
  .notice-orange {
    background: #fff7ed;
    border-left: 5px solid #f97316;
    color: #7c2d12;
  }
  .notice-blue {
    background: #eff6ff;
    border-left: 5px solid #3b82f6;
    color: #1e3a5f;
  }
  .footer-link-item {
    font-size: 1.15rem;
    margin: 15px 0;
    font-weight: bold;
  }
`;

function GpuBooking() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const [state, setState] = React.useState({
    errorMessages: {},
    formObj: { email: '', project_id: '', app_id: ''},
    errorMessage: '',
    openSuccess: 'none',
    openError: 'none',
    loading: false,
    bookedDays: {},
    selection1: {
      startDate: null,
      endDate: null,
      key: 'selection1'
    },
    windowSize: 1000
  });

  const stateRef = React.useRef(state);
  const updateState = React.useCallback((update) => {
    stateRef.current = {...stateRef.current, ...update};
    setState(stateRef.current);
  }, []);

  React.useEffect(() => {
    getBookedDays();
    updateState({
      selection1: { startDate: new Date(), endDate: addDays(new Date(), 7), key: 'selection1' },
      windowSize: window.innerWidth
    });
  }, []);

  const checkError = (field: string) => !!(state.errorMessages[field]);
  const checkErrorMessage = (field: string) => state.errorMessages[field] || null;

  const handleTextFieldChange = (event: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    let errors = { ...state.errorMessages };

    if (id === 'email') {
      errors['email'] = value.match(/^[a-zA-Z0-9\._-]+@(?:student.)?maastrichtuniversity.nl$/)
        ? null : 'Provide your email, must end with @maastrichtuniversity.nl or @student.maastrichtuniversity.nl';
    } else if (id === 'project_id' || id === 'app_id') {
      errors[id] = value.match(/^[a-zA-Z0-9-]*$/) ? null : 'The ID should only contains alphanumeric characters and -';
    }

    const formObj = { ...state.formObj, [id]: value };
    updateState({ errorMessages: errors, formObj });
  };

  const getBookedDays = () => {
    axios.get(apiUrl + '/gpu/booked-days').then(res => updateState({ bookedDays: res.data }));
  };

  const isBooked = (day: any) => {
    const dayDate = format(day, 'yyyy-MM-dd');
    const bookings = { fullyBooked: false, gpus: [] };
    if (state.bookedDays[dayDate]) {
      Object.keys(state.bookedDays[dayDate]).forEach(k => {
        if (k !== 'fullyBooked') bookings.gpus.push(k);
      });
      if (state.bookedDays[dayDate]['fullyBooked']) bookings.fullyBooked = true;
    }
    return bookings;
  };

  function customDayContent(day: any) {
    const booking = isBooked(day);
    const gpuCount = booking.gpus.length;
    const color = gpuCount > 4 ? 'error' : 'success';

    return (
      <Badge 
        badgeContent={gpuCount > 0 ? gpuCount : null} 
        color={color} 
        style={{ padding: '0 4px' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <div style={{ cursor: booking.fullyBooked ? 'not-allowed' : 'pointer' }}>
          <span style={{ 
            color: booking.fullyBooked ? '#b0bec5' : 'inherit', 
            fontWeight: booking.fullyBooked ? 300 : 400 
          }}>
            {format(day, "d")}
          </span>
        </div>
      </Badge>
    );
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateState({ loading: true, openError: 'none', openSuccess: 'none', errorMessage: '' });

    const data = {
      user_email: state.formObj['email'],
      project_id: state.formObj['project_id'],
      app_id: state.formObj['app_id'],
      starting_date: state.selection1.startDate,
      ending_date: state.selection1.endDate,
    };

    axios.post(apiUrl + '/gpu/request', data)
      .then((res) => {
        if (res.data.errorMessage) {
          updateState({ openError: 'inline', errorMessage: res.data.errorMessage, loading: false });
        } else {
          updateState({ openSuccess: 'inline', loading: false });
        }
        getBookedDays();
      })
      .catch((err) => {
        updateState({ openError: 'inline', loading: false, errorMessage: err.message });
      });
  };

  return (
    <Layout title="Book a GPU">
      <style>{customStyles}</style>
      <FormControl fullWidth style={{ textAlign: 'center', marginTop: '30px', padding: '0 20px' }}>
        
        <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Book a GPU</h1>

        {/* 3. Orange and Blue boxes with correct text */}
        <div className="notice-box notice-orange">
           <span>⚠️</span>
           <div>
            You can book a GPU for a maximum of <strong>4 days per calendar month</strong>. We will monitor bookings to ensure fair usage, and consecutive or excessive bookings may be adjusted if necessary.
           </div>
        </div>

        <div className="notice-box notice-blue">
           <span>ℹ️</span>
           <div>
            <strong>Same-day Booking:</strong> To ensure automatic activation, please book <strong>BEFORE 09:00 AM</strong>. If you book after 09:00 AM for today, it will not enable automatically.
           </div>
        </div>

        <p style={{marginBottom: '20px', marginTop: '10px'}}>
          The DSRI has 7 GPUs, the number in the badge on a date indicates the number of GPUs already booked this day, and greyed out days are already fully booked.
        </p>

        <form onSubmit={handleSubmit} style={{maxWidth: '1000px', margin: '0 auto'}}>
          <Grid container spacing={3} justifyContent="center">
            
            {/* 1. Explanations and Placeholders */}
            <Grid item xs={12} md={5} style={{ textAlign: 'right' }}><p className={styles.required}>Your UM email:</p></Grid>
            <Grid item xs={12} md={7} style={{ textAlign: 'left' }}>
              <TextField 
                id='email' label='Email' placeholder='yourname@maastrichtuniversity.nl' variant="outlined" 
                onBlur={handleTextFieldChange} size='small' required fullWidth 
                error={checkError('email')} 
                helperText={checkErrorMessage('email') || "Must end with @maastrichtuniversity.nl or @student.maastrichtuniversity.nl"} 
              />
            </Grid>

            <Grid item xs={12} md={5} style={{ textAlign: 'right' }}><p className={styles.required}>The DSRI project ID where to enable GPU:</p></Grid>
            <Grid item xs={12} md={7} style={{ textAlign: 'left' }}>
              <TextField 
                id='project_id' label='DSRI project ID' placeholder='e.g. machine-learning-analysis' variant="outlined" 
                onChange={handleTextFieldChange} size='small' required fullWidth 
                error={checkError('project_id')} 
                helperText={checkErrorMessage('project_id') || "The project ID should only contains alphanumeric characters and -"} 
              />
            </Grid>

            <Grid item xs={12} md={5} style={{ textAlign: 'right' }}><p className={styles.required}>The ID of the app deployed on the DSRI where we will enable GPU:</p></Grid>
            <Grid item xs={12} md={7} style={{ textAlign: 'left' }}>
              <TextField 
                id='app_id' label='DSRI app ID' placeholder='e.g. jupyterlab-gpu' variant="outlined" 
                onChange={handleTextFieldChange} size='small' required fullWidth 
                error={checkError('app_id')} 
                helperText={checkErrorMessage('app_id') || "Make sure this value is right as it will be used to automatically enable the GPU in this app."} 
              />
            </Grid>

            <Grid item xs={12} style={{ margin: '30px 0' }}>
              <DateRange
                ranges={[state.selection1]}
                onChange={(item: any) => updateState({ ...state, ...item })}
                dayContentRenderer={customDayContent}
                minDate={new Date()}
                months={state.windowSize <= 760 ? 1 : 2}
                direction={state.windowSize <= 760 ? 'vertical' : 'horizontal'}
                preventSnapRefocus={true}
                calendarFocus="forwards"
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
              />
            </Grid>
          </Grid>

          <Box style={{ textAlign: 'center', marginBottom: '20px' }}>
            {state.loading && <CircularProgress style={{marginBottom: '10px'}}/>}
            <Paper elevation={4} style={{ backgroundColor: "#e57373", padding: '15px', color: 'white' }} sx={{ display: state.openError }}>
              ⚠️ {state.errorMessage}
            </Paper>
            <Paper elevation={4} style={{ backgroundColor: "#81c784", padding: '15px', color: 'white' }} sx={{ display: state.openSuccess }}>
              ✔️ GPU requested successfully! You will receive an email shortly.
            </Paper>
          </Box>

          <button type="submit" className={clsx('button button--outline button--primary button--lg')} style={{ marginBottom: '40px' }}>
            Request a GPU for the selected period
          </button>
        </form>

        {/* 4. Footer links in specific order */}
        <div style={{ borderTop: '1px solid #eee', paddingTop: '30px', paddingBottom: '50px', maxWidth: '800px', margin: '0 auto' }}>
          <div className="footer-link-item">
            ⏳ <a href="https://servicedesk.icts.maastrichtuniversity.nl/..." target="_blank">Need more than 4 days? Submit a ticket</a>
          </div>
          <div className="footer-link-item">
            🔎 <a href="https://calendar.dsri.maastrichtuniversity.nl" target="_blank">View the Detailed GPU Schedule</a>
          </div>
          <div className="footer-link-item">
            ❌ <a href="https://servicedesk.icts.maastrichtuniversity.nl/..." target="_blank">Cancel your Reservation</a>
          </div>
        </div>

      </FormControl>
    </Layout>
  );
}

export default GpuBooking;