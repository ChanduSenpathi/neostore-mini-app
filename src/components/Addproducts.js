import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../service/Auth'

export default function Addproducts() {
    // const[stateErr,setStateErr]=useState({nameErr:"",categoryErr:"",priceErr:"",descriptionErr:"",imageURLErr:"",availableItemsErr:""})
    const [stateErr, setStateErr] = useReducer(
      (state, newState) => ({ ...state, ...newState }),
      {nameErr:"",categoryErr:"",priceErr:"",descriptionErr:"",imageURLErr:"",availableItemsErr:""}
  );
    const[state,setState]=useState({name:'',category:'',price:'',description:'',imageURL:'',availableItems:""})
    const navigate=useNavigate()
    function addItem(event){
        const{name,value}=event.target
        setState({...state,[name]:value})
    }

    //product name validation
    const validate1=()=>{
      let value=state.name
      const reg=new RegExp(/^[a-zA-Z0-9\s]*$/)
      if(value==""){
        setStateErr({nameErr:"Required"})
        return false
      }else if(!reg.test(value)){
        setStateErr({nameErr:"Enter the name properly"})
        return false
      }else{
        setStateErr({nameErr:""})
        return true
      }
    }

    //category validation
    const validate2=()=>{
      let value=state.category
      const reg=new RegExp(/^[a-zA-Z\s]*$/)
      if(value==""){
        setStateErr({categoryErr:"Required"})
        return false
      }else if(!reg.test(value)){
        setStateErr({categoryErr:"Enter the details Correctly"})
        return false
      }else{
        setStateErr({categoryErr:""})
        return true
      }
    }

    //price validation
    const validate3=()=>{
      let value=state.price
      const reg=new RegExp(/^[0-9]*$/)
      if(value==""){
        setStateErr({priceErr:"Required"})
        return false
      }else if(!reg.test(value)){
        setStateErr({priceErr:"Enter only digits"})
        return false
      }else {
        setStateErr({priceErr:""})
        return true
      }
    }

    //description validation
    const validate4=()=>{
      let value=state.description
      // let reg=new RegExp(/^[a-zA-Z0-9\s]*$/)
      if(value==""){
        setStateErr({descriptionErr:"Required"})
        return false
      }else{
        setStateErr({descriptionErr:""})
        return true
      }
    }

    //imageURL validation
    const validate5=()=>{
      let value=state.imageURL
      const reg=new RegExp(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/)
      if(value==""){
        setStateErr({imageURLErr:"Required"})
        return false
      }else if(!reg.test(value)){
        setStateErr({imageURLErr:"Enter proper image URL"})
        return false
      }else{
        setStateErr({imageURLErr:""})
        return true
      }
    }

    //availableItems validation
    const validate6=()=>{
      let value=state.availableItems
      let reg=new RegExp(/^[0-9]*$/)
      if(value==""){
        setStateErr({availableItemsErr:"Required"})
        return false
      }else if(!reg.test(value)){
        setStateErr({availableItemsErr:"Enter digits only"})
        return false
      }else {
        setStateErr({availableItemsErr:""})
        return true
      }
    }

    const validate=()=>{
      let sp1=validate1()
      let sp2=validate2()
      let sp3=validate3()
      let sp4=validate4()
      let sp5=validate5()
      let sp6=validate6()
      return sp1&&sp2&&sp3&&sp4&&sp5&&sp6
    }
    const addProducts=(event)=>{
        event.preventDefault()
        const result=validate()
        console.log(stateErr)
        if(result){
            addProduct(state).then(navigate('/products'))
            .catch(err=>console.log(err))
        }
    }
  return (
    <Box sx={{
            marginTop: 8,
            display: 'flex',
            justifyContent:"center"
          }}
        >
    <Box component="form" onSubmit={addProducts} noValidate sx={{ mt: 1,width:"500px", maxWidth:"500px" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nameId"
              label="Name"
              name="name"
              autoComplete="name"
              type="text"
              autoFocus
              onChange={addItem}
            />
            <Typography variant="p" sx={{color:"red"}} component="p">
                {stateErr.nameErr}
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              name="category"
              label="category"
              type="text"
              id="categoryId"
              autoComplete="category"
              onChange={addItem}
            />
            <Typography variant="p" sx={{color:"red"}} component="p">
                {stateErr.categoryErr}
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="price"
              type="number"
              id="priceId"
              autoComplete="price"
              onChange={addItem}
            />
            <Typography variant="p" sx={{color:"red"}} component="p">
                {stateErr.priceErr}
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="description"
              type="text"
              id="descriptionId"
              autoComplete="description"
              onChange={addItem}
            />
            <Typography variant="p" sx={{color:"red"}} component="p">
                {stateErr.descriptionErr}
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              name="imageURL"
              label="imageURL"
              type="text"
              id="imageId"
              autoComplete="imageURL"
              onChange={addItem}
            />
            <Typography variant="p" sx={{color:"red"}} component="p">
                {stateErr.imageURLErr}
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              name="availableItems"
              label="Available Items"
              type="number"
              id="AvialbilityId"
              autoComplete="Avialbility"
              onChange={addItem}
            />
            <Typography variant="p" sx={{color:"red"}} component="p">
                {stateErr.availableItemsErr}
            </Typography>
            
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product
            </Button>
          </Box>
    </Box>
  )
}
