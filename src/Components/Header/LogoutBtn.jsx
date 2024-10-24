import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../Store/AuthSlice'
import authService from '../../Appwrite/auth'


function LogoutBtn() {

    const dispatch = useDispatch();
    const handleSubmit = () =>{
        authService.logout()
            .then(() => {
                dispatch(logout());

                window.location.reload();
            })
        
    }

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-orange-700 rounded-full bg-orange-600 text-white shadow-lg mx-2'
    onClick={handleSubmit}>
        Log out
    </button>
  )
}

export default LogoutBtn
