import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

export default function OrdersPopUp(props) {
    const{cartItems}=props
    const navigate=useNavigate()
  return (
    <Container>
        <Popup 
          modal
          trigger={
            <Button type='button' variant='contained' sx={{color:"white",background:"green"}}>Order now</Button>
          }
        >
            {close=>(
                <Container sx={{height:"300px",display:"grid",placeItems:"center"}}>
                <div>
                    <Typography variant='h4' component="h4">You are Ordered {cartItems.length} Items</Typography>
                </div>
                    <Button type='button' variant='contained' sx={{color:"white",background:"#7c69e9",}} onClick={()=>{
                        close()
                        navigate('/products')
                        localStorage.removeItem("product")
                        window.location.reload()
                    }}>Shop again</Button>
                </Container>
            )}
        </Popup>
    </Container>
  )
}
