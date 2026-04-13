import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import axios from 'axios';
import { Badge, Tooltip, CircularProgress, Grid, TextField, FormControl, Box, Paper } from "@mui/material";

import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

// Resolve environment variables:
declare var process : { env: { API_URL: string } }
const apiUrl: string = (process.env.API_URL as string) || 'http://localhost:8000';
const ticketUrl = 'https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=1ffa93e9ecd94d938ad46e3cb24c2392';

const IconMonitor = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.5, flexShrink: 0 }}>
    <rect x="1" y="2" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M5 14h6M8 11v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconInfo = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }} xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.3"/>
    <path d="M8 5v4M8 11v.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconInfoAlt = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }} xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.3"/>
    <path d="M8 7v4M8 5v.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

function GpuBooking() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const errorMessages: any = {}
  const [state, setState] = React.useState({
    errorMessages: errorMessages,
    formObj: { email: '', project_id: '', app_id: ''},
    errorMessage: '',
    openSuccess: 'none',
    openError: 'none',
    loading: false,
    reservations: {},
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
  }, [setState]);

  React.useEffect(() => {
    getBookedDays()
    const selection1 = {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection1'
    }
    updateState({
      selection1: selection1,
      windowSize: window.innerWidth
    })
  }, [])

  const checkError = (field: string) => !!(state.errorMessages[field]);
  const checkErrorMessage = (field: string) => state.errorMessages[field] || null;

  const handleTextFieldChange = (event: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    let errorMessages = {...state.errorMessages};

    if (id === 'email') {
      if (!value.match(/^[a-zA-Z0-9\._-]+@(?:student.)?maastrichtuniversity.nl$/)) {
        errorMessages['email'] = 'Provide your email, must end with @maastrichtuniversity.nl or @student.maastrichtuniversity.nl'
      } else {
        errorMessages['email'] = null
      }
    } else {
        errorMessages[id] = value.match(/^[a-zA-Z0-9-]*$/) ? null : 'Only alphanumeric characters and -'
    }
    
    updateState({ errorMessages, formObj: {...state.formObj, [id]: value} });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateState({ loading: true, openError: 'none', openSuccess: 'none', errorMessage: '' })
    axios.post(apiUrl + '/gpu/request', state.formObj, { headers: { 'Content-Type': 'application/json' } })
      .then((res: any) => {
        if (res.data.errorMessage) {
          updateState({ openError: 'inline', errorMessage: res.data.errorMessage, loading: false })
        } else {
          updateState({ openSuccess: 'inline', loading: false });
        }
        getBookedDays()
      })
      .catch((error) => {
        updateState({ openError: 'inline', loading: false, errorMessage: error.message });
      })
  }

  const getBookedDays = () => {
    axios.get(apiUrl + '/gpu/booked-days').then((res: any) => updateState({bookedDays: res.data})).catch(err => console.log(err));
  }

  const isBooked = (day: any) => {
    const dayDate = format(day, "yyyy-MM-dd");
    const bookings = {fullyBooked: false, gpus: []}
    if (state.bookedDays[dayDate]) {
      Object.keys(state.bookedDays[dayDate]).forEach(k => {
        if (k !== 'fullyBooked') bookings.gpus.push(k);
      });
      if (state.bookedDays[dayDate]['fullyBooked']) bookings.fullyBooked = true;
    }
    return bookings;
  }

  const getGpuColor: any = (gpuCount: any) => gpuCount > 4 ? 'error' : 'success';
  
  // FIX: RESTORED THE INITIAL BADGE LOGIC
  function customDayContent(day: any) {
    const booking = isBooked(day)
    const dayIsBooked = booking['fullyBooked']
    const gpuCount = booking['gpus'].length;

    return (
      <Badge 
        badgeContent={gpuCount > 0 ? gpuCount : null} 
        color={getGpuColor(gpuCount)}
        style={{right: -3, top: 0, padding: '0 4px'}}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <div style={{cursor: dayIsBooked ? 'not-allowed' : 'pointer'}}>
          <span style={{color: dayIsBooked ? '#b0bec5' : 'inherit', fontWeight: dayIsBooked ? '300' : '400'}}>
            {format(day, "d")}
          </span>
        </div>
      </Badge>
    )
  }

  return (
    <Layout title={`${siteConfig.title}`} description="Data Science Research Infrastructure at Maastricht University">

      <style>{`
        .gpu-subtitle { font-size: 0.9rem; color: #000000; margin-bottom: 20px; font-weight: 400; }
        .gpu-meta { display: flex; gap: 24px; justify-content: center; margin-bottom: 20px; }
        .gpu-meta-chip { font-size: 0.8rem; color: #000000; display: flex; align-items: center; gap: 7px; }
        .gpu-meta-dot { width: 8px; height: 8px; border-radius: 50%; background: #000000; }
        .gpu-notice { display: flex; gap: 10px; padding: 15px; margin: 10px auto; max-width: 800px; font-size: 0.9rem; font-weight: 500; text-align: left; border-radius: 4px; line-height: 1.5; }
        .gpu-notice.orange { background: #fff7ed; border-left: 5px solid #f97316; color: #7c2d12; }
        .gpu-notice.blue { background: #eff6ff; border-left: 5px solid #3b82f6; color: #1e3a5f; }
        .footer-link-item { font-size: 1.1rem; margin: 15px 0; font-weight: bold; }
        .footer-link-item a { color: #000000 !important; text-decoration: none; }
        .footer-link-item a:hover { text-decoration: underline; }
      `}</style>

        <FormControl fullWidth style={{textAlign: 'center', marginTop: '30px'}}>
          <h1>Book a GPU</h1>

          <p className="gpu-subtitle">
            Reserve GPU resources on the DSRI for your project. You'll receive a confirmation email once your booking is processed.
          </p>

          <div className="gpu-meta">
            <div className="gpu-meta-chip"><IconMonitor /> <strong>7 GPUs</strong> available</div>
            <div className="gpu-meta-chip"><div className="gpu-meta-dot" /> Greyed dates = fully booked</div>
          </div>

          <div className="gpu-notice orange">
            <IconInfo color="#f97316" />
            <div>
              You can book a GPU for a <strong>maximum of 4 days per calendar month</strong>. Bookings are monitored to ensure fair usage. Consecutive or excessive bookings may be adjusted. If you need more time, <a href={ticketUrl} target="_blank">submit a ticket</a> and we'll look into it.
            </div>
          </div>

          <Paper elevation={4} style={{backgroundColor: "#81c784", padding: '15px', color: '#fff'}} sx={{ display: state.openSuccess }}>
  ✔️ GPU requested successfully! You will receive an email shortly.
  <br /> 
  <small>
    <strong>Note:</strong> If you booked for today after 09:00 AM, the GPU will not enable automatically. 
    Please <a href="mailto:rcs-ub@maastrichtuniversity.nl" style={{color: '#d32f2f', fontWeight: 'bold'}}>contact us</a> to have it enabled.
  </small>
</Paper>

          <form onSubmit={handleSubmit}>
            <p style={{ margin: '20px auto', fontSize: '0.9rem', color: '#000', fontWeight: 'bold' }}>
               The DSRI has 7 GPUs, the number in the badge on a date indicates the number of GPUs already booked this day, and greyed out days are already fully booked.
            </p>

            <Grid container spacing={2}>
              <Grid item xs={5} style={{textAlign: 'right'}}><p className={styles.required}>Your UM email:</p></Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <TextField id='email' label='Email' placeholder='Email' variant="outlined" onBlur={handleTextFieldChange} size='small' required error={checkError('email')} helperText={checkErrorMessage('email') || "Must end with @maastrichtuniversity.nl"} />
              </Grid>

              <Grid item xs={5} style={{textAlign: 'right'}}><p className={styles.required}>DSRI project ID:</p></Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <TextField id='project_id' label='DSRI project ID' placeholder='e.g. machine-learning-analysis' variant="outlined" onChange={handleTextFieldChange} size='small' required error={checkError('project_id')} helperText={checkErrorMessage('project_id') || "Alphanumeric and - only"} />
              </Grid>

              <Grid item xs={5} style={{textAlign: 'right'}}><p className={styles.required}>DSRI app ID:</p></Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <TextField id='app_id' label='DSRI app ID' placeholder='e.g. jupyterlab-gpu' variant="outlined" onChange={handleTextFieldChange} size='small' required error={checkError('app_id')} helperText={checkErrorMessage('app_id') || "The ID of the app where the GPU will be enabled."} />
              </Grid>

              {/* FIX: RESTORED GRID OFFSET FOR CORRECT CALENDAR WIDTH */}
              {  state.windowSize > 760 && <Grid item xs={1}></Grid> }
              <Grid item xs={state.windowSize <= 760 ? 12 : 10} style={{textAlign: 'center', margin: '20px 0px'}}>
                <DateRange
                  editableDateInputs={true}
                  ranges={[state.selection1]}
                  onChange={(item: any) => updateState({ ...state, ...item })}
                  dayContentRenderer={customDayContent}
                  minDate={new Date()}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={state.windowSize <= 760 ? 1 : 2}
                  weekStartsOn={1}
                  direction={state.windowSize <= 760 ? 'vertical' : 'horizontal'}
                  preventSnapRefocus={true}
                  calendarFocus="forwards"
                />
              </Grid>
            </Grid>

            <Box style={{ textAlign: 'center', marginTop: '10px'}}>
              {state.loading && <CircularProgress style={{marginTop: '20px'}} />}
              <Paper elevation={4} style={{backgroundColor: "#e57373", padding: '15px', color: '#fff'}} sx={{ display: state.openError }}>
                ⚠️ {state.errorMessage}
              </Paper>
              <Paper elevation={4} style={{backgroundColor: "#81c784", padding: '15px', color: '#fff'}} sx={{ display: state.openSuccess }}>
                ✔️ GPU requested successfully! Note: if you booked for today after 09:00 AM, manual activation is required.
              </Paper>
            </Box>

            <button type="submit" style={{margin: '30px 0px'}} className={clsx('button button--outline button--primary button--lg')}>
              Request a GPU for the selected period
            </button> 
          </form>

          {/* Footer links reordered and line removed */}
          <div style={{ paddingBottom: '50px', maxWidth: '800px', margin: '0 auto' }}>
            <div className="footer-link-item">⏳ <a href={ticketUrl} target="_blank">Need more than 4 days? Submit a ticket</a></div>
            <div className="footer-link-item">🔎 <a href="https://calendar.dsri.maastrichtuniversity.nl" target="_blank">View the Detailed GPU Schedule</a></div>
            <div className="footer-link-item">❌ <a href={ticketUrl} target="_blank">Cancel your Reservation</a></div>
          </div>

        </FormControl>
    </Layout>
  );
}

export default GpuBooking;