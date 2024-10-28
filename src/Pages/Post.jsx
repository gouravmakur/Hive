import React from 'react'
import { useNavigate, useParams, Link, useAsyncError } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import  parse  from 'html-react-parser'
import { Button, Container } from '../Components/index'
import appwriteService from '../Appwrite/config'
import { getUserDetails } from '../Appwrite/user'
import authlogo from '../assets/user.jpg'
import deleteicon from '../assets/delete.png'
import editicon from '../assets/edit.png'

function Post() {

    const [post, setPost] = useState(null);
    const [username, setUsername] = useState(null);
    const [date, setDate] = useState('');
    const {slug} = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)
    const [loading, setLoading] = useState(true);
    
    

    const isAuthor = post && userData ?  post.userid === userData.$id : false;

    useEffect(()=>{
        if (post && post.userid) {
            getUserDetails(post.userid).then((data) => {
                setUsername(data.name);
            }).catch((error) => {
                console.error("Error fetching user details:", error);
            });
        }
    },[post])

    useEffect(() => {

        const parsedDate = new Date(userData.$createdAt);
        const formattedDate = parsedDate.toLocaleString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        setDate(formattedDate);
      }, [userData]);

    useEffect(()=>{

        if(slug){
            appwriteService.getPost(slug).then((post) => {
                
                if(post){
                    setPost(post);
                    console.log("Post me post ka data:   ", post);
                    setLoading(false);
                }
                else{
                    navigate('/')
                }

            })
        }else{
            navigate('/')
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

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
    </div>) : (post ? (
        <div className="py-8 mx-64">
            <Container>
            <div className="w-full  mb-4   p-2">
                <div className="w-full  mb-4  p-2">
                    <div className='flex justify-center mx-8'> 
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl"
                        />
                    </div>
                </div>
                <div className="w-full mb-1">
                    <h1 className="text-2xl font-extrabold text-left mx-10  mt-8 mb-10">{post.title}</h1>
                </div>
                <div className='w-full border-b-2 flex items-center justify-between mx-10 space-x-8'>
                    <div className="flex items-center">
                        <div className="flex-none w-10 h-10 rounded-full my-4">
                            <img src={authlogo} className="w-full h-full rounded-full"  />
                        </div>
                        <div className="ml-3">
                            <span className="block text-gray-900 text-base tracking-tight font-semibold">{username}</span>
                        </div>
                    </div>
                    {isAuthor && (
                        <div>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="mr-3 bg-gray-500 p-2 text-black hover:bg-gray-400 ">
                                   <img src={editicon} alt="edit" className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500 hover:bg-red-400" onClick={deletePost}>
                                <img src={deleteicon} alt="delete"  className="h-5 w-5" />
                            </Button>
                        </div>
                    )}
                </div>
                <div className=" text-left mx-10 text-lg font-sans font-normal mt-5">
                    {parse(post.content)}
                </div>
            </div>
            </Container>
        </div>
    ) : null);
}

export default Post
