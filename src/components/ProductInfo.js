import React, { useEffect, useState } from 'react'
import { getProductsbyId } from '../service/Auth'
import {useParams} from 'react-router-dom'
import { Container } from '@mui/system'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { increaseCart } from '../redux/Counter'

export default function ProductInfo() {
    const [proInfo,setProinfo]=useState({})
    const {id}=useParams()
    const dispatch=useDispatch()
    useEffect(()=>{
        getProductsbyId(id).then(res=>{
            setProinfo(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    const addToCart=(id)=>{
            getProductsbyId(id).then(res=>{
                if(res){
                    if(localStorage.getItem("product")!=undefined){
                        let arr=JSON.parse(localStorage.getItem("product"))
                          if(arr.some(items=>id==items._id)){
                            alert("product already added")
                        }
                            else{
                                let arra=res.data
                                arra['quantity']=1
                                arr.push(arra)
                                localStorage.setItem('product',JSON.stringify(arr))
                                alert("product added")
                                dispatch(increaseCart())
                            }
                    }else{
                        let arr=[]
                        let arra=res.data
                        arra['quantity']=1
                        arr.push(arra)
                        localStorage.setItem('product',JSON.stringify(arr))
                        alert("product added")
                        dispatch(increaseCart())
                    }
                }
            }).catch(err=>{
                console.log(err)
            })
    }
  return (
    <Container>
        <Card sx={{ maxWidth: 345,margin:"40px auto" }}>
            <CardMedia
              component="img"
              height="300"
              image={proInfo.imageURL}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {proInfo.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {proInfo.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{fontWeight:"bold"}}>
                Price: {proInfo.price}/-
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{fontWeight:"bold"}}>
                Availble Items: {proInfo.availableItems}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>addToCart(proInfo._id)}>Add to cart</Button>
            </CardActions>
        </Card>
        
    </Container>
  )
}
