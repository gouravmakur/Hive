import React, { useEffect, useState } from 'react'
import appwriteService from '../Appwrite/config'
import { Link } from 'react-router-dom'
import {getUserDetails} from '../Appwrite/user'
import authlogo from '../assets/user.jpg'
 

function PostCard({$id, title, featuredImage, userid, $createdAt}) {
   
    const [username ,setUsername] = useState(null);
    const [error, setError] = useState(null);
    const [date, setDate] = useState('');
   
    useEffect(() => {
      // Check if userid exists before making the call
      if (userid && userid.length <= 36 && /^[a-zA-Z0-9_]+$/.test(userid)) {
          
          getUserDetails(userid).then((data) => {
              if (data && data.name) {
                  setUsername(data.name); 
              } else {
                  setError('Name not found for this user');
                  console.warn('User data does not contain name:', data);
              }
          }).catch((error) => {
              console.error("Error fetching user details:", error);
              setError("Error fetching user details");
          });
      } else {
          console.warn("Invalid userid for post:", $id);
          setError("Invalid User ID");
      }
  }, [userid]);

  // useEffect to track userdata change and log it
  

  //date
  useEffect(() => {

    const parsedDate = new Date($createdAt);
    const formattedDate = parsedDate.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setDate(formattedDate);
  }, [$createdAt]);

  return (

    <Link to = {`/post/${$id}`}>
        <div class="max-w-screen mx-auto my-4 bg-white rounded-lg shadow-md overflow-hidden flex  hover:bg-slate-100">
        {/*  Left side: Post Info */}
        <div className='px-4'>
          <div className="flex items-center mt-2 pt-3 ml-4 mr-2 w-full">
                <div className="flex-none w-10 h-10 rounded-full border-2 border-orange-400 shadow-md ">
                    <img src={authlogo} className="w-full h-full rounded-full"  />
                </div>
                <div className="ml-3">
                    <span className="block text-gray-900 text-base font-semibold tracking-tight text-opacity-80">{username}</span>
                </div>
            </div>
          <div class="w-2/3 p-4">
            <h2 class="text-2xl font-bold mb-2 text-left text-gray-700">{title}</h2>
              <span className="flex items-center text-gray-500 mt-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {date}
              </span>
            <p class="text-gray-700 text-left"> Curiosity sparked? This is just the beginning! Click to uncover the Full Story.</p>
          </div>
        </div>

        {/*  Right side: Image */}
        <div class="w-1/3">
           <div className='p-6 h-80px w-80px'> 
            <img src={appwriteService.getFilePreview(featuredImage)} alt="Post Image" className='h-80px w-80px' />
           </div>
        </div>
      </div>
    </Link>
    
  )
}

export default PostCard


{/* <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <h3 className='font-semibold text-sm'>{username}</h3>

           // getFilePreview directly returns us a url

            <img src={appwriteService.getFilePreview(featuredImage)} alt="Post Image" className='rounded-xl' />
        </div>
            <h2 className='text-xl font-bold'> {title} </h2>
</div> */}