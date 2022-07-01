import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, CardMedia } from '@mui/material';
import { Container } from '@mui/system';
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { increaseCart } from '../redux/Counter'
import { useSelector } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import OrdersPopUp from './OrdersPopUp';

export default function Cart() {
    const[cartInfo,setCartinfo]=useState([])
    const[istrue,setIstrue]=useState(true)

    const price=useSelector(state=>state.cart.total)
    let dispatch=useDispatch()
    useEffect(()=>{
        if(localStorage.getItem('product')!=undefined){
            let arr=JSON.parse(localStorage.getItem("product"))
            setCartinfo(arr)
            if(arr.length==0){
                setIstrue(true)
            }else{
                setIstrue(false)
            }
        }
    },[price])
    const deleteItem=(id)=>{
        if(localStorage.getItem("product")!=undefined){
            let newFilter=cartInfo.filter(items=>id!==items._id)
            localStorage.setItem('product',JSON.stringify(newFilter))
            setCartinfo(newFilter)
            dispatch(increaseCart())
        }
    }
    const decreaeQuan=(id)=>{
        if(localStorage.getItem("product")!=undefined){
            let arr=JSON.parse(localStorage.getItem("product"))
            let newMap=arr.map(item=>{
                if(id==item._id){
                    if(item.quantity==1){
                        item['quantity']=1
                        return item
                    }else{
                        item['quantity']=item.quantity-1
                        return item
                    }
                }else{
                    return item
                }
            })
            localStorage.setItem("product",JSON.stringify(newMap))
            setCartinfo(newMap)
            dispatch(increaseCart())
        }
    }
    const increaseQuan=(id)=>{
        if(localStorage.getItem("product")!=undefined){
            let arr=JSON.parse(localStorage.getItem("product"))
            let newMap=arr.map(item=>{
                if(id==item._id){
                    item['quantity']=item.quantity+1
                    return item
                }
                return item
            })
            localStorage.setItem("product",JSON.stringify(newMap))
            setCartinfo(newMap)
            dispatch(increaseCart())
        }
    }
  return (
    <Container sx={{mt:5}}>
        <h2>Cart</h2>
        {istrue?(<h2 style={{textAlign:"center"}}>Cart is Empty</h2>):(
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
            <TableBody>
                {cartInfo.map((row) => (
                <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row" width="100" height="50">
                    <CardMedia
                        component="img"
                        image={row.imageURL}
                        alt="green iguana"
                    />
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align='right' >
                        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Button onClick={()=>decreaeQuan(row._id)}>
                                <RemoveCircleOutlineIcon/>
                            </Button>
                            <p>{row.quantity}</p>
                            <Button onClick={()=>increaseQuan(row._id)}>
                                <AddCircleOutlineIcon/>
                            </Button>
                        </Box>
                    </TableCell>
                    <TableCell align="right">
                        <Button variant='contained' sx={{color:"white",backgroundColor:"red"}} onClick={()=>deleteItem(row._id)}>Delete</Button>
                    </TableCell>
                    <TableCell align="right">Price:{row.price*row.quantity}/-</TableCell>
                </TableRow>
                ))}
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align='right' sx={{fontWeight:"bold",fontSize:"20px"}}>Total Amount: {price}/-
                    <OrdersPopUp cartItems={cartInfo}/>
                    </TableCell>
                </TableRow>
            </TableBody>
            </Table>
            </TableContainer>
        )}
  </Container>
  )
}
