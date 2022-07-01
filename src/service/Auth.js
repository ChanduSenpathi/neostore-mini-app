import { MAIN_API } from "../env";
import axios from "axios";
import jwt_decode from 'jwt-decode'
function userSignUp(data){
    return axios.post(`${MAIN_API}users`,data);
}
function loginUser(data){
    return axios.post(`${MAIN_API}auth`,data);
}
function isLoggedIn(){
    const data=localStorage.getItem("_token");
    if(data){
        return true;
    }
    return false;
}
function getToken(){
    return localStorage.getItem("_token");
}
function getUser(){
    try{
     return jwt_decode(localStorage.getItem("_token"))
    }
    catch(ex){
        return null;
    }
}
function isAdmin(){
    return !getUser()?false:getUser().isAdmin;
}
function doLogout(){
    localStorage.removeItem("_token");
    //localStorage.removeItem("userdetails");
    window.location="/";
}
function addProduct(state){
    return axios.post(`${MAIN_API}products`,state)
}
function getProducts(){
    return axios.get(`${MAIN_API}products`)
}
function getProductsbyId(id){
    return axios.get(`${MAIN_API}products/${id}`)
}
function deleteProduct(id){
    return axios.delete(`${MAIN_API}products/${id}`)
}
function searchProducts(res){
    return axios.get(`${MAIN_API}products/${res}`)
}
export {userSignUp,loginUser,isLoggedIn,getToken,isAdmin,getUser,doLogout,addProduct,getProducts,getProductsbyId,deleteProduct,searchProducts};