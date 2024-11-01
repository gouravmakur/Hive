import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from "./Appwrite/auth"
import { login, logout } from './Store/AuthSlice';
import { Header, Footer } from './Components/index';
import { Outlet } from 'react-router-dom';

function App() {
  
  const [loading , setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() =>{

    authService.getCurrentUser()
      .then((userData) => {
        if(userData){
          dispatch(login({userData}));
        }
        else{
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      })
  } , []);

  //conditional Rendering 
  return !loading ? (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-white">
      <Header />
      <main className="flex-grow w-full px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : 

  //loader 
  <div class="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">

    <div class="flex space-x-2 animate-pulse">
        <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
    </div>

  </div>
}

export default App
