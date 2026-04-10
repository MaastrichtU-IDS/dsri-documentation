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

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    let errors = { ...state.errorMessages };

    if (id === 'email') {
      errors['email'] = value.match(/^[a-zA-Z0-9\._-]+@(?:student.)?maastrichtuniversity.nl$/)
        ? null : 'Must end with @maastrichtuniversity.nl or @student.maastrichtuniversity.nl';
    } else {
      errors[id] = value.match(/^[a-zA-Z0-9-]*$/) ? null : 'Alphanumeric and - only';
    }

    const formObj = { ...state.formObj, [id]: value };
    updateState({ errorMessages: errors, formObj });
  };

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
    const color = booking.gpus.length > 4 ? 'error' : 'success';
    return (
      <Badge badgeContent={booking.gpus.length} color={color} invisible={booking.gpus.length === 0} style={{padding: '0 4px'}}>
        <div style={{ cursor: booking.fullyBooked ? 'not-allowed' : 'pointer' }}>
          <span style={{ color: booking.fullyBooked ? '#b0bec5' : 'inherit', fontWeight: 300 }}>
            {format(day, "d")}
          </span>
        </div>
      </Badge>
    );
  }

  return (
    <Layout title="Book a GPU">
      <FormControl fullWidth style={{ textAlign: 'center', marginTop: '30px', padding: '0 20px' }}>
        
        {/* 1. Centered Title */}
        <h1 style={{ fontWeight: 'bold' }}>Book a GPU</h1>

        {/* 2 & 3. Original Font Colors and Emojis */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ marginTop: '10px' }}>
            Once you booked a GPU, you will receive an email with more information. You can book a GPU for a maximum of <strong>4 days per calendar month</strong>.
          </p>

          <p style={{ color: '#d32f2f', fontWeight: 'bold', marginBottom: '20px' }}>
            ⚠️ Same-day Booking: To ensure automatic activation, please book BEFORE 09:00 AM. 
            If you book after 09:00 AM for today, it will not enable automatically.
          </p>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={4} style={{ textAlign: 'right' }}><p className={styles.required}>Your UM email:</p></Grid>
              <Grid item xs={12} md={6} style={{ textAlign: 'left' }}>
                <TextField id='email' label='Email' variant="outlined" onBlur={handleTextFieldChange} size='small' required fullWidth error={checkError('email')} helperText={checkErrorMessage('email')} />
              </Grid>

              <Grid item xs={12} md={4} style={{ textAlign: 'right' }}><p className={styles.required}>DSRI project ID:</p></Grid>
              <Grid item xs={12} md={6} style={{ textAlign: 'left' }}>
                <TextField id='project_id' label='Project ID' variant="outlined" onChange={handleTextFieldChange} size='small' required fullWidth error={checkError('project_id')} helperText={checkErrorMessage('project_id')} />
              </Grid>

              <Grid item xs={12} md={4} style={{ textAlign: 'right' }}><p className={styles.required}>DSRI app ID:</p></Grid>
              <Grid item xs={12} md={6} style={{ textAlign: 'left' }}>
                <TextField id='app_id' label='App ID' variant="outlined" onChange={handleTextFieldChange} size='small' required fullWidth error={checkError('app_id')} helperText={checkErrorMessage('app_id')} />
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
                  calendarFocus="backwards"
                />
              </Grid>
            </Grid>

            <Box style={{ textAlign: 'center', marginBottom: '20px' }}>
              {state.loading && <CircularProgress />}
              <Paper elevation={4} style={{ backgroundColor: "#e57373", padding: '15px', color: 'white' }} sx={{ display: state.openError }}>
                ⚠️ {state.errorMessage}
              </Paper>
              <Paper elevation={4} style={{ backgroundColor: "#81c784", padding: '15px', color: 'white' }} sx={{ display: state.openSuccess }}>
                ✔️ GPU requested successfully! If you booked for today after 09:00 AM, please contact support for manual activation.
              </Paper>
            </Box>

            {/* 5. Original Red/Primary Button */}
            <button type="submit" className={clsx('button button--outline button--primary button--lg')} style={{ marginBottom: '40px' }}>
              Request a GPU for the selected period
            </button>
          </form>

          {/* 4. Bigger and Explicit Footer Links */}
          <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'center' }}>
             <p style={{ fontSize: '1.1rem' }}>
              🔎 <strong><a href="https://calendar.dsri.maastrichtuniversity.nl" target="_blank">View the Detailed GPU Schedule</a></strong>
            </p>
            <p style={{ fontSize: '1.1rem' }}>
              ❌ <strong><a href="https://servicedesk.icts.maastrichtuniversity.nl/..." target="_blank">Cancel your Reservation</a></strong>
            </p>
            <p style={{ fontSize: '1.1rem' }}>
              ⏳ <strong><a href="https://servicedesk.icts.maastrichtuniversity.nl/..." target="_blank">Need more than 4 days? Submit a ticket</a></strong>
            </p>
          </div>
        </div>
      </FormControl>
    </Layout>
  );
}

export default GpuBooking;