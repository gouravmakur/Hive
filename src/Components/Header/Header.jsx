import React from 'react'
import { useSelector } from 'react-redux'
import {Logo, LogoutBtn , Container}from '../index'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function Header() {
    
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    // when we create nav bars we create an array of NavItems and we loop over it
    // so that every time we don't have to add an button individually but insted we add it in the array and it gets added

    const NavItems = [

        {
            name : "Home",
            url : '/',
            active : true
        },{
            name : "Login",
            url : '/login',
            active : !authStatus
        },
        {
            name : "Sign Up",
            url : '/signup',
            active : !authStatus
        },
        {
            name : "Add Post",
            url : '/addpost',
            active : authStatus
        },
        {
            name : "All Post",
            url : '/allposts',
            active : authStatus
        }
    ]
  return (

    <header className='py-4 shadow bg-white px-4 border-b-2 border-gray-300 text-gray-600'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
                 <Logo width='70px'   />
              </Link>
          </div>
          <ul className='flex ml-auto'>
            {NavItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.url)}
                className='inline-block px-6 py-2 duration-200 hover:bg-orange-600 hover:text-white rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header
