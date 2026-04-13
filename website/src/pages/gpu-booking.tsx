import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import axios from 'axios';
import { Badge, Tooltip, CircularProgress, Alert, Grid, TextField, FormControl, Box, Card, Paper } from "@mui/material";

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
    formObj: { email: '', project_id: ''},
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

  const checkError = (field: string) => {
    if (field in state.errorMessages && state.errorMessages[field] && state.errorMessages[field].length > 0) {
      return true
    }
    return false
  }
  const checkErrorMessage = (field: string) => {
    if (field in state.errorMessages && state.errorMessages[field] && state.errorMessages[field].length > 0) {
      return state.errorMessages[field]
    }
    return null
  }

  const handleTextFieldChange = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.id === 'email') {
      let errorMessages = state.errorMessages
      if (!event.target.value.match(
          /^[a-zA-Z0-9\._-]+@(?:student.)?maastrichtuniversity.nl$/
        )) {
        errorMessages['email'] = 'Provide your email, must end with @maastrichtuniversity.nl or @student.maastrichtuniversity.nl'
        updateState({ errorMessages: errorMessages})
      } else {
        errorMessages['email'] = null
        updateState({ errorMessages: errorMessages, })
      }
    }

    if (event.target.id === 'project_id') {
      let errorMessages = state.errorMessages
      if (!event.target.value.match(/^[a-zA-Z0-9-]*$/)) {
        errorMessages['project_id'] = 'The project ID should only contains alphanumeric characters and -'
        updateState({ errorMessages: errorMessages})
      } else {
        errorMessages['project_id'] = null
        updateState({ errorMessages: errorMessages, })
      }
    }

    if (event.target.id === 'app_id') {
      let errorMessages = state.errorMessages
      if (!event.target.value.match(/^[a-zA-Z0-9-]*$/)) {
        errorMessages['app_id'] = 'The app ID should only contains alphanumeric characters and -'
        updateState({ errorMessages: errorMessages})
      } else {
        errorMessages['app_id'] = null
        updateState({ errorMessages: errorMessages, })
      }
    }

    if (!state.errorMessages[event.target.id]) {
      let formObj = state.formObj
      formObj[event.target.id] = event.target.value
      updateState({formObj: formObj})
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let error = false;
    updateState({
      loading: true,
      openError: 'none',
      openSuccess: 'none',
      errorMessage: ''
    })

    const data = {
      user_email: state.formObj['email'],
      project_id: state.formObj['project_id'],
      app_id: state.formObj['app_id'],
      starting_date: state.selection1.startDate,
      ending_date: state.selection1.endDate,
    }

    if (!error) {
      axios.post(apiUrl + '/gpu/request',
        data,
        { headers: { 'Content-Type': 'application/json' } }
      )
        .then((res: any) => {
          if (res.data.errorMessage) {
            updateState({
              openError: 'inline',
              openSuccess: 'none',
              errorMessage: res.data.errorMessage,
              loading: false,
            })
          } else {
            updateState({
              openSuccess: 'inline',
              openError: 'none',
              loading: false,
            });
          }
          getBookedDays()
        })
        .catch(function (error) {
          updateState({
            openSuccess: 'none',
            openError: 'inline',
            loading: false,
          });
          if (error.response) {
            if (error.response.data["detail"]) {
              const errorMsg = JSON.stringify(error.response.data["detail"]).replace(/"/g, '').replace(/{/g, '').replace(/}/g, '')
                .replace(/\[/g, '').replace(/\]/g, '').replace(/:/g, '').replace(/,/g, '')
                .replace(/loc/g, '').replace(/body/g, '').replace(/msg/g, ': ').replace(/type/g, '').replace(/value_error.missing/g, ' - ')
              updateState({ errorMessage: 'Error: ' + errorMsg})
            } else {
              updateState({ errorMessage: JSON.stringify(error.response.data) })
            }
          } else if (error.request) {
            console.log('request err');
            console.log(error.request);
          } else {
            console.log('Error', error.message);
            updateState({ errorMessage: error.message })
          }
        })
    }
  }

  const getBookedDays = () => {
    axios.get(apiUrl + '/gpu/booked-days',
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then((res: any) => {
        updateState({bookedDays: res.data})
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const isBooked = (day: any) => {
    let twoDigitMonth = (day.getMonth() + 1).toString();
    if (twoDigitMonth.length == 1)
      twoDigitMonth = "0" + twoDigitMonth;
    let twoDigitDate = day.getDate() + "";
    if (twoDigitDate.length == 1)
        twoDigitDate = "0" + twoDigitDate;
    const dayDate = day.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;
    const bookings = {fullyBooked: false}
    const gpuBooked: any = []
    if (Object.keys(state.bookedDays).indexOf(dayDate) > -1) {
      if (Object.keys(state.bookedDays[dayDate]).length > 1) {
        Object.keys(state.bookedDays[dayDate]).map((booking:any, key: number) => {
          if (booking != 'fullyBooked') {
            gpuBooked.push(booking)
          }
        })
      }
      if (state.bookedDays[dayDate]['fullyBooked'] == true) {
        bookings['fullyBooked'] = true
      }
    }
    bookings['gpus'] = gpuBooked
    return bookings
  }

  function customDayContent(day: any) {
    const booking = isBooked(day)
    const dayIsBooked = booking['fullyBooked']
    return (
      <>
      {dayIsBooked && 
        <Badge badgeContent={booking['gpus'].length} color={getGpuColor(booking['gpus'].length)}
            style={{right: -3,top: 0,padding: '0 4px'}}>
          <div style={{cursor: 'not-allowed'}}>
            <span style={{color: '#b0bec5', pointerEvents: 'none', cursor: 'not-allowed'}}>
              {format(day, "d")}
            </span>
          </div>
        </Badge>
      }
      {!dayIsBooked && booking['gpus'].length > 0 &&
        <Tooltip title={'GPUs booked: ' + booking['gpus'].join(', ')}>
          <Badge badgeContent={booking['gpus'].length} color={getGpuColor(booking['gpus'].length)}
              style={{right: -3,top: 0,padding: '0 4px'}}>
            <div>
              <span style={{fontWeight: '300'}}>{format(day, "d")}</span>
            </div>
          </Badge>
        </Tooltip>
      }
      {!dayIsBooked && booking['gpus'].length == 0 &&
        <div>
          <span style={{fontWeight: '300'}}>{format(day, "d")}</span>
        </div>
      }
      </>
    )
  }

  return (
    <Layout title={`${siteConfig.title}`} description="Data Science Research Infrastructure at Maastricht University">

      <style>{`
  .gpu-subtitle { font-size: 0.9rem; color: #000000; margin-bottom: 20px; }
  .gpu-meta { display: flex; gap: 24px; justify-content: center; margin-bottom: 20px; }
  .gpu-meta-chip { font-size: 0.8rem; color: #000000; display: flex; align-items: center; gap: 7px; }
  .gpu-meta-dot { width: 8px; height: 8px; border-radius: 50%; background: #000000; }
  .gpu-notice { display: flex; gap: 10px; padding: 15px; margin: 10px auto; max-width: 800px; font-size: 0.9rem; font-weight: 500; text-align: left; border-radius: 4px; line-height: 1.5; }
  .gpu-notice.orange { background: #fff7ed; border-left: 5px solid #f97316; color: #7c2d12; }
  .gpu-notice.blue { background: #eff6ff; border-left: 5px solid #3b82f6; color: #1e3a5f; }
  .footer-link-item { font-size: 1.1rem; margin: 15px 0; font-weight: bold; }
  .footer-link-item a { color: #000000 !important; text-decoration: none; }
  .footer-link-item a:hover { text-decoration: underline; }
  .rdrCalendarWrapper { overflow: visible !important; }
  .contact-us-link { color: #dc2626 !important; font-weight: 600; }
  .contact-us-link:hover { color: #1d4ed8 !important; }
  .rdrMonth { overflow: visible !important; }
  .rdrDays { overflow: visible !important; }
  .rdrDay { overflow: visible !important; }
  .rdrDayNumber { overflow: visible !important; }
  .rdrDayNumber span { position: relative; }
  `}</style>

        <FormControl fullWidth style={{textAlign: 'center', marginTop: '30px'}}>
          <h1>
            Book a GPU
          </h1>

          <p className="gpu-subtitle">
            Reserve GPU resources on the DSRI for your project. You'll receive a confirmation email once your booking is processed.
          </p>

          <div className="gpu-meta">
            <div className="gpu-meta-chip">
              <IconMonitor />
              <strong>7 GPUs</strong> available
            </div>
            <div className="gpu-meta-chip">
              <div className="gpu-meta-dot" />
              Greyed dates = fully booked
            </div>
          </div>

          {/* Orange: 4-day limit */}
          <div className="gpu-notice orange">
            <IconInfo color="#f97316" />
            <div>
              You can book a GPU for a <strong>maximum of 4 days per calendar month</strong>. Bookings are monitored to ensure fair usage. Consecutive or excessive bookings may be adjusted. If you need more time, <a href={ticketUrl} target="_blank">submit a ticket</a> and we'll look into it.
            </div>
          </div>

          {/* Blue: 9AM cutoff */}
          <div className="gpu-notice blue">
            <IconInfoAlt color="#3b82f6" />
            <div>
              <strong>Same-day Booking:</strong> To ensure automatic activation, please book <strong>BEFORE 09:00 AM</strong>. If you book after 09:00 AM for today, it will not enable automatically. If you do book late, please <a href="mailto:rcs-ub@maastrichtuniversity.nl" className="contact-us-link">contact us</a> to have it manually enabled.
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <p style={{ margin: '0 auto 20px', fontSize: '0.9rem', color: '#374151', textAlign: 'center' }}>
              To book a GPU, fill in your details below, select your dates on the calendar, and click <em>Request a GPU</em>. You will receive a confirmation email once your booking is confirmed.
            </p>

            <Grid container spacing={2}>

              <Grid item xs={5} style={{textAlign: 'right'}}>
                <p className={styles.required}>
                  Your UM email:
                </p>
              </Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <TextField
                  id='email'
                  multiline
                  label='Email'
                  placeholder='Email'
                  variant="outlined"
                  onBlur={handleTextFieldChange}
                  size='small'
                  required
                  error={checkError('email')}
                  helperText={checkErrorMessage('email') ? checkErrorMessage('email') : "Must end with @maastrichtuniversity.nl or @student.maastrichtuniversity.nl"}
                />
              </Grid>

              <Grid item xs={5} style={{textAlign: 'right'}}>
                <p className={styles.required}>
                  The DSRI project ID where to enable GPU:
                </p>
              </Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <TextField
                  id='project_id'
                  multiline
                  label='DSRI project ID'
                  placeholder='e.g. machine-learning-analysis'
                  variant="outlined"
                  onChange={handleTextFieldChange}
                  size='small'
                  required
                  error={checkError('project_id')}
                  helperText={checkErrorMessage('project_id') ? checkErrorMessage('project_id') : "The project ID should only contains alphanumeric characters and -"}
                />
              </Grid>

              <Grid item xs={5} style={{textAlign: 'right'}}>
                <p className={styles.required}>
                  The ID of the deployed app where will enable GPU:
                </p>
              </Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <TextField
                  id='app_id'
                  multiline
                  label='DSRI app ID'
                  placeholder='e.g. jupyterlab-gpu'
                  variant="outlined"
                  onChange={handleTextFieldChange}
                  size='small'
                  required
                  error={checkError('app_id')}
                  helperText={checkErrorMessage('app_id') ? checkErrorMessage('app_id') : "Make sure this value is right as it will be used to automatically enable the GPU in this app. The app ID should only contains alphanumeric characters and -"}
                />
              </Grid>

              {state.windowSize > 760 &&
                <Grid item xs={1} style={{textAlign: 'center', margin: '20px 0px'}}></Grid>
              }
              <Grid item xs={state.windowSize <= 760 ? 12 : 10}
                  style={{textAlign: 'center', margin: '20px 0px 0px'}}>
                <DateRange
                  editableDateInputs={true}
                  ranges={[state.selection1]}
                  onChange={(item: any) => updateState({ ...state, ...item })}
                  dayContentRenderer={customDayContent}
                  minDate={new Date()}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  weekStartsOn={1}
                  direction={state.windowSize <= 760 ? 'vertical' : 'horizontal'}
                  preventSnapRefocus={true}
                />
              </Grid>

            </Grid>

            <Box style={{ textAlign: 'center', marginTop: '0px'}}>
              {state.loading &&
                <CircularProgress style={{marginTop: '20px'}} />
              }
              <Paper elevation={4} style={{backgroundColor: "#e57373", padding: '15px'}} sx={{ display: state.openError }}>
                ⚠️&nbsp;&nbsp;{state.errorMessage}
              </Paper>
              <Paper elevation={4} style={{backgroundColor: "#81c784", padding: '15px'}} sx={{ display: state.openSuccess }}>
                ✔️&nbsp;&nbsp;GPU requested successfully, you will receive an email with more information to use the GPU on the DSRI once your booking starts. Be aware that if you book after 09:00 AM for today, the GPU will not enable automatically.
              </Paper>
            </Box>

            <button type="submit" style={{margin: '10px 0px 0px'}} className={clsx(
                'button button--outline button--primary button--lg',
              )}>Request a GPU for the selected period</button>
          </form>

          <div style={{ paddingBottom: '50px', maxWidth: '800px', margin: '0 auto' }}>
            <div className="footer-link-item">
              ⏳ <a href={ticketUrl} target="_blank">Need more than 4 days? Submit a ticket</a>
            </div>
            <div className="footer-link-item">
              🔎 <a href="https://calendar.dsri.maastrichtuniversity.nl" target="_blank">View the Detailed GPU Schedule</a>
            </div>
            <div className="footer-link-item">
              ❌ <a href={ticketUrl} target="_blank">Cancel your Reservation</a>
            </div>
          </div>

        </FormControl>
    </Layout>
  );
}

export default GpuBooking;
