import React from 'react';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { FormHelperText, Snackbar, Alert, Checkbox, FormControlLabel, Grid, MenuItem, InputLabel, TextField, FormControl, FormGroup } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import axios from 'axios';

// Calendar: https://www.npmjs.com/package/react-availability-calendar

declare var process : { env: { API_URL: string } }
const apiUrl: string = (process.env.API_URL as string) || 'http://localhost:8000';
// const apiUrl = process.env['API_URL'] || 'http://localhost:8000'

function Registration() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const history = useHistory();

  const errorMessages: any = {}
  const formObj: any = {
    'gdpr': false,
    'use_dsri_date': new Date()
    // 'use_dsri_date': new Date().toISOString().split('T')[0]
  }
  const [state, setState] = React.useState({
    errorMessages: errorMessages,
    formObj: formObj,
    errorMessage: {},
    openSuccess: false,
    openError: false,
  });
  const stateRef = React.useRef(state);
  // Avoid conflict when async calls
  const updateState = React.useCallback((update) => {
    stateRef.current = {...stateRef.current, ...update};
    setState(stateRef.current);
  }, [setState]);

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
      if (!event.target.value.match(
          /^[a-zA-Z0-9\.-_]+@(?:student.)?maastrichtuniversity.nl$/
          // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        errorMessages['email'] = 'Provide your email, must end with @maastrichtuniversity.nl or @student.maastrichtuniversity.nl'
        updateState({ errorMessages: errorMessages})
      } else {
        errorMessages['email'] = null
        updateState({ errorMessages: errorMessages, })
        // updateState({ errorMessage: ''})
        // renderObject[event.target.id] = event.target.value
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
        // updateState({ errorMessage: ''})
        // renderObject[event.target.id] = event.target.value
      }
    }

    if (!state.errorMessages[event.target.id]) {
      let formObj = state.formObj
      formObj[event.target.id] = event.target.value
      updateState({formObj: formObj})
      console.log('STATE!', state)
    }
  }

  const handleDropdown = (event: SelectChangeEvent) => {
    let formObj = state.formObj
    formObj['affiliation'] = event.target.value as string
    updateState({formObj: formObj})
  }
  const handleDropdownTypes = (event: SelectChangeEvent) => {
    let formObj = state.formObj
    formObj['project_type'] = event.target.value as string
    updateState({formObj: formObj})
  }
  const handleChangeGdpr = (event: React.ChangeEvent<HTMLInputElement>) => {
    let formObj = state.formObj
    formObj['gdpr'] = !formObj['gdpr']
    // event.target.value as boolean
    updateState({formObj: formObj})
  }
  const handleDateChange = (newValue: Date | null) => {
    let formObj = state.formObj
    formObj['use_dsri_date'] = newValue
    // formObj['use_dsri_date'] = newValue.toISOString().split('T')[0]
    updateState({formObj: formObj})
  }


  // const handleSubmit  = (event: React.FormEvent) => {
  const handleSubmit  = (event) => {
    // Trigger JSON-LD file download
    event.preventDefault();
    let error = false;
    // var element = document.createElement('a');
    // curl -X POST -d '{"email":"vincent@wwfr.fr", "username":"vincent"}' -H "Content-Type: application/json" http://localhost:4000/register

    if (!('gdpr' in state.formObj) || !state.formObj['gdpr']) {
      error = true;
      updateState({
        openError: true, 
        errorMessage: 'You need to accept the GDPR terms.'
      })
    }

    if (!error) {
      axios.post(apiUrl + '/user/register', 
        state.formObj, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res: any) => {
          console.log('New user registered', state.formObj)
          console.log(res)
          if (res.data.errorMessage) {
            updateState({openError: true, errorMessage: res.data.errorMessage})
          } else {
            updateState({openSuccess: true})
            setTimeout(function(){
              history.push("/dsri-documentation/docs/");
            }, 6000);
          }
        })
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            // {"detail":[{"loc":["body","homepage"],"msg":"invalid or missing URL scheme","type":"value_error.url.scheme"}]}
            if (error.response.data["detail"]) {
              updateState({ errorMessage: 'Error: ' + JSON.stringify(error.response.data["detail"])})
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

  const departmentsList = [
    {id: 'BIGCAT', label: 'Department of Bioinformatics'},
    {id: 'DKE', label: 'Department of Knowledge Engineering'},
    {id: 'FHML', label: 'Faculty of Health, Medicine and Life Sciences'},
    {id: 'FSE', label: 'Faculty of Science and Engineering'},
    {id: 'GWFP', label: 'Gravitational Waves and Fundamental Physics'},
    {id: 'HSR', label: 'Health Services Research'},
    {id: 'ICTS', label: 'ICT Services'},
    {id: 'IDS', label: 'Institute of Data Science'},
    {id: 'MAASTRO', label: 'Maastro Clinic'},
    {id: 'MACSBIO', label: 'Maastricht Centre for Systems Biology'},
    {id: 'MSCM', label: 'Department of Marketing and Supply Chain Management'},
    {id: 'MSP', label: 'Maastricht Science Programme'},
    {id: 'NUTRIM', label: 'School of Nutrition and Translational Research in Metabolism'},
    {id: 'PHARTOX', label: 'Department of Pharmacology & Toxicology'},
    // {id: 'PN', label: '???'},
    {id: 'SBE', label: 'School of Business and Economics'},
    {id: 'TECHLAB', label: 'Law and Tech Lab'},
    {id: 'TGX', label: 'Department of Toxicogenomics'},
    {id: 'UM', label: 'Maastricht University'},
    {id: 'Other', label: 'Other'},
  ]
  const projectTypeList = [
    "Machine Learning on CPU (python, jupyter, matlab)", 
    "Machine Learning on GPU (python, jupyter, matlab)", 
    "Bioinformatics pipeline (python, conda, sequencing pipeline, workflows)", 
    "Data hosting (SQL, knowledge graph, key-value stores, data lakes)", 
    "Data processing (python, java, workflows, services orchestration)", 
    "Continuous Delivery / Integration (website deployment, jenkins, argo cd)"
  ]

  return (
    <Layout title={`${siteConfig.title}`} description="Data Science Research Infrastructure at Maastricht University">
      <main>
        <FormGroup style={{textAlign: 'center', width: '100%'}}>
          <h1 style={{ textAlign: 'center', margin: '30px 0px' }}>
            Register to access the DSRI
          </h1>

          <p style={{marginBottom: '30px'}}>
            We need a few informations about you and your project before granting you access to the Data Science Research Infrastructure at Maastricht University.
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
                  Your first and last name:
                </p>
              </Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <TextField
                  id='username'
                  multiline
                  label='Name'
                  placeholder='Name'
                  // value={''}
                  variant="outlined"
                  // onChange={handleTextFieldChange}
                  onBlur={handleTextFieldChange}
                  size='small'
                  required
                  // error={checkError('email')}
                  // helperText='Your first and last name'
                />
              </Grid>

              <Grid item xs={5} style={{textAlign: 'right'}}>
                <p className={styles.required}>
                  Your employee, or student ID, at Maastricht University:
                </p>
              </Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <TextField
                  id='employee_id'
                  multiline
                  label='Employee ID'
                  placeholder='Employee ID'
                  // value={''}
                  // className={classes.fullWidth}
                  variant="outlined"
                  // onChange={handleTextFieldChange}
                  onBlur={handleTextFieldChange}
                  size='small'
                  required
                  // error={checkError('email')}
                  // helperText='Your employee or student ID at Maastricht University'
                />
              </Grid>

              <Grid item xs={5} style={{textAlign: 'right'}}>
                <p className={styles.required}>
                  Your affiliation:
                </p>
              </Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                {/* <InputLabel id="select-affiliation-label">Your affiliation</InputLabel> */}
                <Select
                  // labelId="select-affiliation-label"
                  id="affiliation"
                  // value={state.formObj['affiliation']}
                  // label="Your affiliation"
                  // placeholder='Your affiliation'
                  defaultValue='null'
                  onChange={handleDropdown}
                >
                  <MenuItem value="null" disabled>
                    Choose your affiliation *
                  </MenuItem>
                  { departmentsList.map((dept: any, key: number) => (
                    <MenuItem key={key} value={dept.id}>{dept.label} ({dept.id})</MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText style={{textAlign: 'center'}}>To which department are you affiliated to?</FormHelperText> */}
              </Grid>

              <Grid item xs={5} style={{textAlign: 'right'}}>
                <p className={styles.required}>
                  The type of project you will use the DSRI for:
                </p>
              </Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <Select
                  // labelId="select-affiliation-label"
                  id="project_type"
                  // value={state.formObj['affiliation']}
                  // label="Your affiliation"
                  // placeholder='Your affiliation'
                  defaultValue='null'
                  onChange={handleDropdownTypes}
                >
                  <MenuItem value="null" disabled>
                    Choose the type of project *
                  </MenuItem>
                  { projectTypeList.map((type: any, key: number) => (
                    <MenuItem key={key} value={type}>{type}</MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText style={{textAlign: 'center'}}>What type of project are you planning to use the DSRI for?</FormHelperText> */}
              </Grid>

              <Grid item xs={5} style={{textAlign: 'right'}}>
                <p className={styles.required}>
                  A brief description of your project:
                </p>
              </Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <TextField
                  id='project_description'
                  multiline
                  label='Project description'
                  placeholder='Project description'
                  rows={3}
                  // value={''}
                  // className={classes.fullWidth}
                  variant="outlined"
                  onBlur={handleTextFieldChange}
                  onChange={handleTextFieldChange}
                  size='small'
                  required
                  // error={checkError('email')}
                  // helperText='A short description of the project(s) you want to use the DSRI for.'
                />
              </Grid>

              <Grid item xs={5} style={{textAlign: 'right'}}>
                <p>
                  A short identifier slug for your project:
                </p>
              </Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <TextField
                  id='project_id'
                  multiline
                  label='Project ID'
                  placeholder='e.g. machine-learning-analysis'
                  // value={''}
                  variant="outlined"
                  onChange={handleTextFieldChange}
                  size='small'
                  error={checkError('project_id')}
                  helperText={checkErrorMessage('project_id')}
                />
              </Grid>

              <Grid item xs={5} style={{textAlign: 'right'}}>
                <p>
                  Provide a link to your code repository if possible (e.g. GitHub, GitLab):
                </p>
              </Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <TextField
                  id='git_repo'
                  multiline
                  label='Git repository URL'
                  placeholder='Git repository URL'
                  // value={''}
                  variant="outlined"
                  onChange={handleTextFieldChange}
                  size='small'
                />
              </Grid>

              <Grid item xs={5} style={{textAlign: 'right'}}>
                <p>
                  Expected number of collaborators, if you organise a workshop with multiple users:
                </p>
              </Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <TextField
                  id='number_of_collaborators'
                  type='number'
                  label='Number of collaborators'
                  placeholder='Number of collaborators'
                  // value={''}
                  variant="outlined"
                  onChange={handleTextFieldChange}
                  size='small'
                />
              </Grid>

              <Grid item xs={5} style={{textAlign: 'right'}}>
                <p>
                  Until when do you expect to use the DSRI?
                </p>
              </Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    // label="Date desktop"
                    // id='use_dsri_date'
                    inputFormat="yyyy-MM-dd"
                    value={state.formObj['use_dsri_date']}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                {/* <TextField
                  id='use_dsri_date'
                  type='date'
                  // inputFormat="MM/dd/yyyy"
                  // label='Date'
                  // placeholder='Date'
                  // value={''}
                  // defaultValue={new Date().toString()}
                  variant="outlined"
                  onChange={handleTextFieldChange}
                  size='small'
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> */}
              </Grid>


              <Grid item xs={5} style={{textAlign: 'right'}}>
                <p>
                  How did you hear about us?
                </p>
              </Grid>
              <Grid item xs={7} style={{textAlign: 'left'}}>
                <TextField
                  id='hear_about_us'
                  multiline
                  // label='Your answer'
                  // placeholder='Your answer'
                  // value={''}
                  variant="outlined"
                  onChange={handleTextFieldChange}
                  size='small'
                />
              </Grid>

              <Grid item xs={0} sm={2}></Grid>
              <Grid item xs={12} sm={8}>
                <p>
                  The DSRI infrastructure is accessible for UM researchers and students. 
                  Although DSRI has all relevant security and privacy measures in place to ensure a stable system, 
                  we want to emphasize it is the responsibility of the user which data he or she is using to perform their work on DSRI. 
                  <br/>GDPR compliance is the responsibility of the researcher. 
                  In case there are any questions, you can visit this website (<a href="https://library.maastrichtuniversity.nl/research-support/rdm/guide/#personal-data-privacy-security" target="_blank" rel="noopener noreferrer">https://library.maastrichtuniversity.nl/research-support/rdm/guide/#personal-data-privacy-security</a>) 
                  or contact your faculty information manager.
                </p>
                <FormControlLabel control={
                    <Checkbox checked={state.formObj['gdpr']} onChange={handleChangeGdpr} id='gdpr' />
                  } label="I understand my responsibilities towards GDPR compliance." />
              </Grid>
            </Grid>

            {/* 
              TODO: Number of users expected? If hosting a workshop
            */}
            <button type="submit" style={{margin: '30px 0px'}} className={clsx(
                'button button--outline button--primary button--lg',
              )}>Submit</button> 
          </form>

          <Snackbar
            open={state.openSuccess}
            autoHideDuration={12000}
            onClose={() => {
              updateState({ openSuccess: false});
            }}
            style={{textAlign: 'center'}}
          >
            <Alert onClose={() => { updateState({ openSuccess: false})}} severity="success" sx={{ width: '100%' }}>
              <>
                User registered successfully, soon you will receive an email with more informations to access and use the DSRI.
              </>
            </Alert>
          </Snackbar>

          <Snackbar
            open={state.openError}
            autoHideDuration={12000}
            onClose={() => {
              updateState({ openError: false});
            }}
          >
            <Alert onClose={() => { updateState({ openError: false})}} severity="error" sx={{ width: '100%' }}>
              <>
                {state.errorMessage}
              </>
            </Alert>
          </Snackbar>
        </FormGroup>

      </main>
    </Layout>
  );
}

export default Registration;

