import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { PostForm, Container } from '../Components/index'
import service from '../Appwrite/config'

function EditPost() {

    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();
    const {slug} = useParams();
    const [loading , setLoading] = useState(true);
    useEffect(()=>{

        if(slug){
            service.getPost(slug).then((post)=>{
                
                if(post){
                    setPosts(post);
                    setLoading(false);
                }
            })
        }
        else{

            navigate('/')
        }
    } , [slug , navigate]);

  return loading? (<div className="w-full py-8 mt-4 text-center">
    <Container>
        <div class="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">

            <div class="flex space-x-2 animate-pulse">
                <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>

            </div>
    </Container>
    </div>) : posts? (
        <div className='py-8'>
            <Container>
                <PostForm post = {posts}/>
            </Container>
        </div>
    ):null
}

export default EditPost
