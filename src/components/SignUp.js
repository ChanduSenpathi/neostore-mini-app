import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userSignUp } from '../service/Auth';
import {useNavigate} from 'react-router-dom'
import { useReducer } from 'react';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [state,setState]=useState({firstName:'',lastName:'',password:'',email:'',contactNumber:''})
  // const [stateErr,setStateErr]=useState({firstNameErr:"",lastNameErr:"",passwordErr:"",emailErr:"",contactNumberErr:""})
  const [stateErr, setStateErr] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {firstNameErr:"",lastNameErr:"",passwordErr:"",emailErr:"",contactNumberErr:""}
);
  const navigate=useNavigate();
  
  const handler=(event)=>{
    let {name,value}=event.target;
    setState({...state,[name]:value})
  }

  //firstname validation
  const validate1=()=>{
    let value=state.firstName
    const reg=new RegExp(/^[a-zA-Z\s]*$/)
    if(value==""){
      setStateErr({firstNameErr:"Required"})
      return false
    }else if(!reg.test(value)){
      setStateErr({firstNameErr:"Enter only Alphabets"})
      return false
    }else{
      setStateErr({firstNameErr:""})
      return true
    }
  }

  //lastname validation
  const validate2=()=>{
    let value=state.lastName
    const reg=new RegExp(/^[a-zA-Z\s]*$/)
    if(value==""){
      setStateErr({lastNameErr:"Required"})
      return false
    }else if(!reg.test(value)){
      setStateErr({lastNameErr:"Enter only Alphabets"})
      return false
    }else{
      setStateErr({lastNameErr:""})
      return true
    }
  }

  //email validation
  const validate3=()=>{
    let value=state.email
    const reg=new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    if(value==""){
      setStateErr({emailErr:"Required"})
      return false
    }else if(!reg.test(value)){
      setStateErr({emailErr:"Enter Correct Email"})
      return false
    }else{
      setStateErr({emailErr:""})
      return true
    }
  }

  //password validation
  const validate4=()=>{
    let value=state.password
    const reg=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")
    if(value==""){
      setStateErr({passwordErr:"Required"})
      return false
    }else if(reg.test(value)==false){
      setStateErr({passwordErr:"the password must have atleast one, Capital letter, Small letter, Number, Special Symbols"})
      return false
    }else if(value.length<5 || value.length>12){
      setStateErr({passwordErr:"the passowrd should greater than 5 and less than 12"})
      return false
    }else{
      setStateErr({passwordErr:""})
      return true
    }
  }

  //contact number validation
  const validate5=()=>{
    let value=state.contactNumber
    let reg=new RegExp(/^\d{10}$/)
    if(value==""){
      setStateErr({contactNumberErr:"Required"})
      return false
    }else if(!reg.test(value)){
      setStateErr({contactNumberErr:"Enter 10 digit Contact number"})
      return false
    }else{
      setStateErr({contactNumberErr:""})
      return true
    }
  }

  const validation=()=>{
    let sp1=validate1()
    let sp2=validate2()
    let sp3=validate3()
    let sp4=validate4()
    let sp5=validate5()
    return sp1&&sp2&&sp3&&sp4&&sp5
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    let result=validation()
    if(result){
      userSignUp(state)
      .then(res=>{
        if(res.data.err==0){
        navigate("/");
        }
        if(res.data.err==1){
          alert(res.data.msg)
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onBlur={validate1}
                  onChange={handler}
                />
                <Typography variant="p" sx={{color:"red"}} component="p">
                {stateErr.firstNameErr}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onBlur={validate2}
                  onChange={handler}
                />
                <Typography variant="p" sx={{color:"red"}} component="p">
                {stateErr.lastNameErr}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onBlur={validate3}
                  onChange={handler}
                />
                <Typography variant="p" sx={{color:"red"}} component="p">
                {stateErr.emailErr}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onBlur={validate4}
                  onChange={handler}
                />
                <Typography variant="p" sx={{color:"red"}} component="p">
                {stateErr.passwordErr}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contactNumber"
                  label="Contact Number"
                  id="contact"
                  onBlur={validate5}
                  onChange={handler}
                />
                <Typography variant="p" sx={{color:"red"}} component="p">
                {stateErr.contactNumberErr}
                </Typography>
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}