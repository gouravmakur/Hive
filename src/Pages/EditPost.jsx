import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { PostForm, Container } from '../Components/index'
import service from '../Appwrite/config'

function EditPost() {

    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();
    const {slug} = useParams();
    useEffect(()=>{

        if(slug){
            service.getPost(slug).then((post)=>{
                
                if(post){
                    setPosts(post)
                }
            })
        }
        else{

            navigate('/')
        }
    } , [slug , navigate]);

  return posts? (
    <div className='py-8'>
        <Container>
            <PostForm post = {posts}/>
        </Container>
    </div>
  ):null
}

export default EditPost
