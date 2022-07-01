import { Button, CardActions, CardMedia } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    let navigate=useNavigate()
  return (
    <Container>
        <CardMedia
          component="img"
          image="https://cdn.corporatefinanceinstitute.com/assets/product-mix3.jpeg"
          alt="green iguana"
        />
        <CardActions sx={{display:"flex",justifyContent:"center"}}>
        <Button variant='contained' sx={{color:"white",backgroundColor:"Green"}}  onClick={()=>navigate('/products')}>Shop Now</Button>
        </CardActions>
    </Container>
  )
}
