import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import axios from 'axios';
import { Badge, Tooltip, CircularProgress, TextField, Box } from "@mui/material";

import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';

declare var process : { env: { API_URL: string } }
const apiUrl: string = (process.env.API_URL as string) || 'http://localhost:8000';

const pageStyles = `
  .gpu-page {
    max-width: 780px;
    margin: 0 auto;
    padding: 48px 24px 64px;
  }
  .gpu-page h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 6px;
    letter-spacing: -0.5px;
  }
  .gpu-subtitle {
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 20px;
    line-height: 1.6;
  }
  .gpu-meta {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    align-items: center;
  }
  .gpu-meta-chip {
    font-size: 0.8rem;
    color: #6b7280;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .gpu-meta-chip strong {
    color: #111827;
    font-weight: 500;
  }
  .gpu-meta-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d1d5db;
    flex-shrink: 0;
  }
  .gpu-notice {
    display: flex;
    gap: 10px;
    padding: 11px 14px;
    margin-bottom: 12px;
    font-size: 0.82rem;
    line-height: 1.55;
  }
  .gpu-notice.orange {
    background: #fff7ed;
    border: 0.5px solid #fed7aa;
    border-left: 3px solid #f97316;
    color: #7c2d12;
  }
  .gpu-notice.orange strong { color: #9a3412; font-weight: 500; }
  .gpu-notice.orange a { color: #9a3412; }
  .gpu-notice.blue {
    background: #eff6ff;
    border: 0.5px solid #bfdbfe;
    border-left: 3px solid #3b82f6;
    color: #1e3a5f;
  }
  .gpu-notice.blue strong { color: #1e40af; font-weight: 500; }
  .gpu-notice.blue a { color: #1e40af; }
  .gpu-section-label {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9ca3af;
    margin: 28px 0 12px;
  }
  .gpu-fields {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 28px;
  }
  .gpu-divider {
    border: none;
    border-top: 1px solid #f3f4f6;
    margin: 24px 0;
  }
  .gpu-calendar-wrap .rdrCalendarWrapper {
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    font-size: 0.85rem;
  }
  .gpu-feedback {
    border-radius: 8px;
    padding: 11px 14px;
    font-size: 0.82rem;
    margin-bottom: 16px;
    line-height: 1.5;
  }
  .gpu-feedback.error {
    background: #fef2f2;
    border: 0.5px solid #fecaca;
    color: #991b1b;
  }
  .gpu-feedback.success {
    background: #f0fdf4;
    border: 0.5px solid #bbf7d0;
    color: #166534;
  }
  .gpu-submit-btn {
    background: #1d4ed8;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 24px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s;
  }
  .gpu-submit-btn:hover { background: #1e40af; }
  .gpu-footer-links {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  .gpu-footer-link {
    font-size: 0.8rem;
    color: #6b7280;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.15s;
  }
  .gpu-footer-link:hover { color: #1d4ed8; }
  .gpu-footer-link svg { opacity: 0.45; flex-shrink: 0; }
`;

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

const IconCalendar = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M1.5 6h13M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconX = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ticketUrl = 'https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=1ffa93e9ecd94d938ad46e3cb24c2392';

function GpuBooking() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const errorMessages: any = {}
  const [state, setState] = React.useState({
    errorMessages: errorMessages,
    formObj: { email: '', project_id: '' },
    errorMessage: '',
    openSuccess: false,
    openError: false,
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
    stateRef.current = { ...stateRef.current, ...update };
    setState(stateRef.current);
  }, [setState]);

  React.useEffect(() => {
    getBookedDays();
    updateState({
      selection1: { startDate: new Date(), endDate: addDays(new Date(), 7), key: 'selection1' },
      windowSize: window.innerWidth
    });
  }, []);

  const checkError = (field: string) => {
    return !!(field in state.errorMessages && state.errorMessages[field]?.length > 0);
  };
  const checkErrorMessage = (field: string) => {
    return (field in state.errorMessages && state.errorMessages[field]?.length > 0)
      ? state.errorMessages[field] : null;
  };

  const handleTextFieldChange = (event: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    let errorMessages = state.errorMessages;

    if (id === 'email') {
      errorMessages['email'] = value.match(/^[a-zA-Z0-9\._-]+@(?:student.)?maastrichtuniversity.nl$/)
        ? null : 'Must end with @maastrichtuniversity.nl or @student.maastrichtuniversity.nl';
    }
    if (id === 'project_id') {
      errorMessages['project_id'] = value.match(/^[a-zA-Z0-9-]*$/)
        ? null : 'Only alphanumeric characters and -';
    }
    if (id === 'app_id') {
      errorMessages['app_id'] = value.match(/^[a-zA-Z0-9-]*$/)
        ? null : 'Only alphanumeric characters and -';
    }

    updateState({ errorMessages });
    if (!state.errorMessages[id]) {
      let formObj = state.formObj;
      formObj[id] = value;
      updateState({ formObj });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateState({ loading: true, openError: false, openSuccess: false, errorMessage: '' });

    const data = {
      user_email: state.formObj['email'],
      project_id: state.formObj['project_id'],
      app_id: state.formObj['app_id'],
      starting_date: state.selection1.startDate,
      ending_date: state.selection1.endDate,
    };

    axios.post(apiUrl + '/gpu/request', data, { headers: { 'Content-Type': 'application/json' } })
      .then((res: any) => {
        if (res.data.errorMessage) {
          updateState({ openError: true, openSuccess: false, errorMessage: res.data.errorMessage, loading: false });
        } else {
          updateState({ openSuccess: true, openError: false, loading: false });
        }
        getBookedDays();
      })
      .catch((error) => {
        updateState({ openSuccess: false, openError: true, loading: false });
        if (error.response?.data?.['detail']) {
          const errorMsg = JSON.stringify(error.response.data['detail'])
            .replace(/"/g, '').replace(/{/g, '').replace(/}/g, '')
            .replace(/\[/g, '').replace(/\]/g, '').replace(/:/g, '').replace(/,/g, '')
            .replace(/loc/g, '').replace(/body/g, '').replace(/msg/g, ': ').replace(/type/g, '')
            .replace(/value_error.missing/g, ' - ');
          updateState({ errorMessage: 'Error: ' + errorMsg });
        } else if (error.response?.data) {
          updateState({ errorMessage: JSON.stringify(error.response.data) });
        } else {
          updateState({ errorMessage: error.message });
        }
      });
  };

  const getBookedDays = () => {
    axios.get(apiUrl + '/gpu/booked-days', { headers: { 'Content-Type': 'application/json' } })
      .then((res: any) => updateState({ bookedDays: res.data }))
      .catch((error) => console.log(error));
  };

  const isBooked = (day: any) => {
    let twoDigitMonth = (day.getMonth() + 1).toString();
    if (twoDigitMonth.length === 1) twoDigitMonth = '0' + twoDigitMonth;
    let twoDigitDate = day.getDate() + '';
    if (twoDigitDate.length === 1) twoDigitDate = '0' + twoDigitDate;
    const dayDate = day.getFullYear() + '-' + twoDigitMonth + '-' + twoDigitDate;
    const bookings: any = { fullyBooked: false, gpus: [] };
    if (Object.keys(state.bookedDays).indexOf(dayDate) > -1) {
      Object.keys(state.bookedDays[dayDate]).forEach((booking: any) => {
        if (booking !== 'fullyBooked') bookings.gpus.push(booking);
      });
      if (state.bookedDays[dayDate]['fullyBooked'] === true) bookings.fullyBooked = true;
    }
    return bookings;
  };

  const getGpuColor: any = (gpuCount: any) => gpuCount > 4 ? 'error' : 'success';

  function customDayContent(day: any) {
    const booking = isBooked(day);
    return (
      <>
        {booking.fullyBooked &&
          <Badge badgeContent={booking.gpus.length} color={getGpuColor(booking.gpus.length)}
              style={{ right: -3, top: 0, padding: '0 4px' }}>
            <div style={{ cursor: 'not-allowed' }}>
              <span style={{ color: '#b0bec5' }}>{format(day, 'd')}</span>
            </div>
          </Badge>
        }
        {!booking.fullyBooked && booking.gpus.length > 0 &&
          <Tooltip title={'GPUs booked: ' + booking.gpus.join(', ')}>
            <Badge badgeContent={booking.gpus.length} color={getGpuColor(booking.gpus.length)}
                style={{ right: -3, top: 0, padding: '0 4px' }}>
              <div><span style={{ fontWeight: 300 }}>{format(day, 'd')}</span></div>
            </Badge>
          </Tooltip>
        }
        {!booking.fullyBooked && booking.gpus.length === 0 &&
          <div><span style={{ fontWeight: 300 }}>{format(day, 'd')}</span></div>
        }
      </>
    );
  }

  return (
    <Layout title="Book a GPU" description="GPU booking for DSRI at Maastricht University">
      <style>{pageStyles}</style>
      <div className="gpu-page">

        <h1>Book a GPU</h1>
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
            <strong>Booking on today's date?</strong> The GPU is only enabled automatically if you book <strong>before 09:00 AM</strong>. Bookings after 09:00 AM require manual activation, <a href={ticketUrl} target="_blank">submit a ticket</a> and we'll enable it for you.
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <p className="gpu-section-label">Your details</p>
          <div className="gpu-fields">
            <TextField
              id="email"
              label="UM Email"
              placeholder="yourname@maastrichtuniversity.nl"
              variant="outlined"
              onBlur={handleTextFieldChange}
              size="small"
              required
              fullWidth
              error={checkError('email')}
              helperText={checkErrorMessage('email') || '@maastrichtuniversity.nl or @student.maastrichtuniversity.nl'}
            />
            <TextField
              id="project_id"
              label="DSRI Project ID"
              placeholder="e.g. machine-learning-analysis"
              variant="outlined"
              onChange={handleTextFieldChange}
              size="small"
              required
              fullWidth
              error={checkError('project_id')}
              helperText={checkErrorMessage('project_id') || 'Alphanumeric characters and - only'}
            />
            <TextField
              id="app_id"
              label="DSRI App ID"
              placeholder="e.g. jupyterlab-gpu"
              variant="outlined"
              onChange={handleTextFieldChange}
              size="small"
              required
              fullWidth
              error={checkError('app_id')}
              helperText={checkErrorMessage('app_id') || 'The app where the GPU will be enabled. Alphanumeric and - only'}
            />
          </div>

          <hr className="gpu-divider" />

          <p className="gpu-section-label">Select dates</p>
          <div className="gpu-calendar-wrap" style={{ marginBottom: '24px' }}>
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
            />
          </div>

          {state.openError && (
            <div className="gpu-feedback error">
              {state.errorMessage || 'Something went wrong. Please try again.'}
            </div>
          )}
          {state.openSuccess && (
            <div className="gpu-feedback success">
              GPU booked successfully. You'll receive a confirmation email before your booking starts.
            </div>
          )}

          <Box style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {state.loading
              ? <CircularProgress size={26} />
              : <button type="submit" className="gpu-submit-btn">Request GPU</button>
            }
          </Box>
        </form>

        <hr className="gpu-divider" />

        <div className="gpu-footer-links">
          <a className="gpu-footer-link" href="https://calendar.dsri.maastrichtuniversity.nl" target="_blank">
            <IconCalendar /> Full GPU schedule
          </a>
          <a className="gpu-footer-link" href={ticketUrl} target="_blank">
            <IconX /> Cancel a reservation
          </a>
          <a className="gpu-footer-link" href={ticketUrl} target="_blank">
            <IconClock /> Need more than 4 days/month?
          </a>
        </div>

      </div>
    </Layout>
  );
}

export default GpuBooking;
