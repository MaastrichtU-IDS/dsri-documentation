import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { CircularProgress, Alert, Grid, TextField, FormControl, Box, Card, Paper } from "@mui/material";
import axios from 'axios';


import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

declare var process : { env: { API_URL: string } }
const apiUrl: string = (process.env.API_URL as string) || 'http://localhost:8000';
// const apiUrl = process.env.API_URL || 'https://api.dsri.semanticscience.org'

// Date range (is there disable?): https://www.npmjs.com/package/react-date-range

function GpuScheduling() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const errorMessages: any = {}
  const formObj: any = {'email': '', 'project_id': ''}
  const [state, setState] = React.useState({
    errorMessages: errorMessages,
    formObj: {'email': null, 'project_id': null},
    errorMessage: '',
    openSuccess: 'none',
    openError: 'none',
    loading: false,
    reservations: {},
    bookedDays: {},
    selection1: {
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 7),
      key: 'selection1'
    },
    // selection2: {
    //   startDate: addDays(new Date(), -6),
    //   endDate: new Date(),
    //   key: 'selection2'
    // },
  });
  const stateRef = React.useRef(state);
  // Avoid conflict when async calls
  const updateState = React.useCallback((update) => {
    stateRef.current = {...stateRef.current, ...update};
    setState(stateRef.current);
  }, [setState]);

  // To remove warning?: componentDidMount(() => {
  React.useEffect(() => {
    getBookedDays()
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

  // const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const handleTextFieldChange = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.id === 'email') {
      // Email validation
      let errorMessages = state.errorMessages
      if (!event.target.value.match(/^[a-zA-Z0-9\.-_]+@(?:student.)?maastrichtuniversity.nl$/)) {
        errorMessages['email'] = 'Provide your email, must end with @maastrichtuniversity.nl or @student.maastrichtuniversity.nl'
        updateState({ errorMessages: errorMessages})
      } else {
        errorMessages['email'] = null
        updateState({ errorMessages: errorMessages, })
      }
    }

    if (event.target.id === 'project_id') {
      // Project ID validation
      let errorMessages = state.errorMessages
      if (!event.target.value.match(/^[a-zA-Z0-9-]*$/)) {
        errorMessages['project_id'] = 'The project ID should only contains alphanumeric characters and -'
        updateState({ errorMessages: errorMessages})
      } else {
        errorMessages['project_id'] = null
        updateState({ errorMessages: errorMessages, })
      }
    }

    if (!state.errorMessages[event.target.id]) {
      let formObj = state.formObj
      formObj[event.target.id] = event.target.value
      updateState({formObj: formObj})
    }
  }


  const handleSubmit  = (event: React.FormEvent) => {
    event.preventDefault();
    let error = false;
    updateState({
      loading: true,
      openError: 'none',
      openSuccess: 'none',
      errorMessage: ''
    })
    // curl -X POST -d '{"email":"vincent@wwfr.fr", "username":"vincent"}' -H "Content-Type: application/json" http://localhost:8000/user/register

    const data = {
      user_email: state.formObj['email'],
      project_id: state.formObj['project_id'],
      starting_date: state.selection1.startDate,
      ending_date: state.selection1.endDate,
    }

    // Send a GPU request to the API
    if (!error) {
      axios.post(apiUrl + '/gpu/request', 
        data, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
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
          // Refresh booked days
          getBookedDays()
        })
        .catch(function (error) {
          updateState({
            openSuccess: 'none', 
            openError: 'inline',
            loading: false,
          });
          if (error.response) {
            // Error: [{"loc":["body","user_email"],"msg":"field required","type":"value_error.missing"},{"loc":["body","project_id"],"msg":"field required","type":"value_error.missing"}]
            // Request made and server responded
            // {"detail":[{"loc":["body","homepage"],"msg":"invalid or missing URL scheme","type":"value_error.url.scheme"}]}
            if (error.response.data["detail"]) {
              const errorMsg = JSON.stringify(error.response.data["detail"]).replace(/"/g, '').replace(/{/g, '').replace(/}/g, '')
                .replace(/\[/g, '').replace(/\]/g, '').replace(/:/g, '').replace(/,/g, '')
                .replace(/loc/g, '').replace(/body/g, '').replace(/msg/g, ': ').replace(/type/g, '').replace(/value_error.missing/g, ' - ')
              // const errorMsg = JSON.stringify(error.response.data["detail"]).replaceAll('"','').replaceAll('{','').replaceAll('}','')
              //   .replaceAll('[','').replaceAll(']','').replaceAll('loc','').replaceAll('body','').replaceAll('msg',': ').replaceAll('type','')
              //   .replaceAll('value_error.missing',' and ')
              updateState({ errorMessage: 'Error: ' + errorMsg})
            } else {
              updateState({ errorMessage: JSON.stringify(error.response.data) })
            }
          } else if (error.request) {
            // The request was made but no response was received
            console.log('request err');
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            updateState({ errorMessage: error.message })
          }
        })
    }
  }

  const getBookedDays = () => {
    axios.get(apiUrl + '/gpu/booked-days', 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res: any) => {
        updateState({bookedDays: res.data})
        // console.log(res.data)
      })
      .catch(function (error) {
        console.log(error);
        // if (error.response) {
        //   // Request made and server responded
        //   // Official Error response structure: {"detail":[{"loc":["body","homepage"],"msg":"invalid or missing URL scheme","type":"value_error.url.scheme"}]}
        //   if (error.response.data["detail"]) {
        //     updateState({ errorMessage: 'Error: ' + JSON.stringify(error.response.data["detail"])})
        //   } else {
        //     updateState({ errorMessage: JSON.stringify(error.response.data) })
        //   }
        // } else if (error.request) {
        //   // The request was made but no response was received
        //   console.log('request err');
        //   console.log(error.request);
        // } else {
        //   // Something happened in setting up the request that triggered an Error
        //   console.log('Error', error.message);
        //   updateState({ errorMessage: error.message })
        // }
      })
  }

  const isBooked = (day: any) => {
    // if (day < new Date()) {
    //   return true
    // }
    let twoDigitMonth = (day.getMonth() + 1).toString();
    // Need to add +1 to month to fix issue with getting the next month (not sure why)
    if (twoDigitMonth.length == 1)
      twoDigitMonth = "0" + twoDigitMonth;
    let twoDigitDate = day.getDate() + "";
    if (twoDigitDate.length == 1)
        twoDigitDate = "0" + twoDigitDate;
    const dayDate = day.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;
    if (Object.keys(state.bookedDays).indexOf(dayDate) > -1) {
      if (state.bookedDays[dayDate]['fullyBooked'] == true) {
        // console.log('fullyBooked DAY DATE!', dayDate)
        return true
      }
    }
    return false
  }
  
  function customDayContent(day: any) {
    let extraDot = null;
    const dayIsBooked = isBooked(day)
    if (dayIsBooked) {
      extraDot = (
        <div style={{height: "5px", width: "5px", borderRadius: "100%", background: "orange",
            position: "absolute", top: 2, right: 2}}></div> 
      )
    // Green dot for available date, or Red dot for booked date? 
    // } else {
    // extraDot = (
      //   <div style={{height: "5px", width: "5px", borderRadius: "100%", background: "red",
      //       position: "absolute", top: 2, right: 2}} />
      // ) }
    }
    return (
      <>
      {dayIsBooked && 
        <div style={{cursor: 'not-allowed'}}>
          {extraDot}
          <span style={{color: '#b0bec5', pointerEvents: 'none', cursor: 'not-allowed'}}>
            {format(day, "d")}
          </span>
        </div>
      }
      {!dayIsBooked &&  
        <div>
          <span>{format(day, "d")}</span>
        </div>
      }
      </>
    )
  }

  return (
    <Layout title={`${siteConfig.title}`} description="Data Science Research Infrastructure at Maastricht University">
      {/* <main> */}
        <FormControl fullWidth style={{textAlign: 'center', marginTop: '30px'}}>
          <h1>
            Book a GPU
          </h1>

          <p style={{marginTop: '10px'}}>
            You can book a GPU for a maximum of 2 weeks.
          </p>
          <p style={{marginBottom: '40px'}}>
            Once you requested a GPU slot, you will receive an email with more informations, and the GPU will be enabled in your DSRI project for the period requested.
          </p>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} >

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
                  // value={''}
                  variant="outlined"
                  // onChange={handleTextFieldChange}
                  onBlur={handleTextFieldChange}
                  size='small'
                  required
                  error={checkError('email')}
                  helperText={checkErrorMessage('email') ? checkErrorMessage('email') : "Must end with @maastrichtuniversity.nl or @student.maastrichtuniversity.nl"}
                  // helperText="Must end with @maastrichtuniversity.nl or @student.maastrichtuniversity.nl"
                  // InputLabelProps={{ required: false }}
                  // All field are required but we hide the *
                />
                {/* (must ends with <b>@maastrichtuniversity.nl</b> or <b>@student.maastrichtuniversity.nl</b>): */}
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
                  // value={''}
                  variant="outlined"
                  // onChange={handleTextFieldChange}
                  onChange={handleTextFieldChange}
                  size='small'
                  required
                  error={checkError('project_id')}
                  helperText={checkErrorMessage('project_id') ? checkErrorMessage('project_id') : "The project ID should only contains alphanumeric characters and -"}
                />
              </Grid>

              <Grid item xs={12} style={{textAlign: 'center', margin: '20px 0px'}}>
                <DateRange
                  // ranges={[selectionRange]}
                  // onChange={handleSelect}
                  editableDateInputs={true}
                  ranges={[state.selection1]}
                  // onChange={(item: any) => setState({ ...state, ...item })}
                  onChange={(item: any) => updateState({ ...state, ...item })}
                  dayContentRenderer={customDayContent}
                  minDate={addDays(new Date(), 1)}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  weekStartsOn={1}
                  // staticRanges={[]}
                  // inputRanges={[]}
                  direction="horizontal"
                  preventSnapRefocus={true}
                  // calendarFocus="backwards"
                  // showMonthAndYearPickers={false}
                  // disabledDates={this.props.disabledDates.map((d) => new Date(d))}
                />
              </Grid>
            </Grid>

            <Box style={{ textAlign: 'center', marginTop: '10px'}}>
              {state.loading && 
                <CircularProgress style={{marginTop: '20px'}} />
              }
              <Paper elevation={4} style={{backgroundColor: "#e57373", padding: '15px'}} sx={{ display: state.openError }}>
                ⚠️&nbsp;&nbsp;{state.errorMessage}
              </Paper>
              <Paper elevation={4} style={{backgroundColor: "#81c784", padding: '15px'}} sx={{ display: state.openSuccess }}>
                  ✔️&nbsp;&nbsp;GPU requested successfully, soon you will receive an email with more informations to access and use the GPU on the DSRI.
              </Paper>
            </Box>

            <button type="submit" style={{margin: '30px 0px'}} className={clsx(
                'button button--outline button--primary button--lg',
              )}>Request a GPU for the selected period</button> 
          </form>

        </FormControl>

      {/* </main> */}
    </Layout>
  );
}

export default GpuScheduling;

