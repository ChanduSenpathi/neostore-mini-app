import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from 'react-router-dom'
import { isLoggedIn,isAdmin,doLogout } from '../service/Auth'; 
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux/es/exports';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

export default function MyAppBar() {
  const [filter,setFilter]=useState()
  const count=useSelector(state=>state.cart.count)
  const navigate=useNavigate();
  useEffect(()=>{
    let searchParams=new URLSearchParams();
      if(filter){
        searchParams.set("name",filter);
      }
      navigate({
        pathname:"/products",
        search:searchParams.toString()
      })
  },[filter,count])
  return (
    <Box sx={{ flexGrow: 1,position:"sticky",top:"0" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ShoppingCartIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Neostore E-Shop
          </Typography>
          {isLoggedIn() && (<>
          <Box sx={{backgroundColor:"rgb(207, 204, 196,.5)",borderRadius:"20px",padding:"5px 20px",display:"flex",justifyContent:"center",alignItems:"center"}}>
               <SearchIcon/>
               <InputBase 
               placeholder='Search here'
               value={filter}
               sx={{color:"white",width:"200px"}}
               onChange={(event)=> setFilter(event.target.value)}/>
            </Box>
            </>)}
          {!isLoggedIn() && (
            <>
            <Button color="inherit" onClick={()=> navigate("/") }>Login</Button>
            <Button color="inherit" onClick={()=> navigate("/signup")}>SignUp</Button>
            </>
          )}
          {isLoggedIn() && (
            <>
            <Button color="inherit" onClick={()=> navigate("/") }>Home</Button>
            <Button color="inherit" onClick={()=> navigate("/products") }>Products</Button>
            </>
          )}
          {isLoggedIn() && isAdmin() &&  (
            <>
            <Button color="inherit" onClick={()=> navigate("/addproducts") }>Add Product</Button>
            </>
          )}
          {isLoggedIn() && (
            <>
            <Button color="inherit" onClick={()=>{
              navigate('/cart')
              }}>
            <Badge badgeContent={count} color="warning">
              <ShoppingCartIcon color="inherit" />
            </Badge>
            </Button>
            </>
          )}
           {isLoggedIn() && (
            <>
            <Button color="inherit" onClick={doLogout}>Logout</Button>
            </>
          )}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
