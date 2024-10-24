import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


// this is a protected Container in which we will wrap our components

export default function Protected( {children , authentication = true}) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(()=>{
         // true              {true     !==   true } => false    
          // ture         &&      false     means he is authenticated and we will not redirect him to login
        
        if(authentication && authStatus !== authentication){
            navigate('/login');
        }else if(!authentication && authStatus !== authentication){
            navigate('/');
        }
        
        setLoader(false);

    } , [authStatus , navigate , authentication]);

  return loader ? <div>Loading...</div> : <>{children}</>
}


