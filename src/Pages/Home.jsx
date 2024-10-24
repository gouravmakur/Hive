import React from 'react'
import { useState, useEffect } from 'react'
import appwriteService from '../Appwrite/config';
import { PostCard, Container, HeroLogo } from '../Components/index'
import { Link } from 'react-router-dom';


function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        appwriteService.getAllPost().then((posts) =>{
            if(posts){
                setPosts(posts.documents);
            }
            setLoading(false);
        })
    } , []);

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div class="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">

                        <div class="flex space-x-2 animate-pulse">
                            <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                        </div>

                        </div>
                </Container>
            </div>
        );
    }

    if(posts.length === 0){

        return(
            <section className="py-28 relative bg-white">
            <div className="relative z-10 max-w-screen-xl mx-auto px-4  md:px-8">
                <div className="max-w-xl md:mx-auto">
                    {/* <div className='justify-center'>
                        <HeroLogo />
                    </div> */}
                     <p className="text-gray-600 py-4 text-6xl text-opacity-80  font-bold text-left hover:text-gray-400">
                        Share Ideas, Inspire Minds
                    </p>

                    <p className="text-gray-400 text-pretty text-left py-4 text-sm">
                       Everyone has a story to tell, an idea to share, or a lesson to teach. Join a community where your voice matters, and inspire others with your unique perspective.
                    </p>
                   
                </div>
                
                <Link to='/login'>
                    <div className="mt-4 flex ml-72">
                        <a href="" className="inline-block py-2 px-4 text-white font-medium bg-orange-600 duration-150 hover:opacity-85 active:bg-orange-700 rounded-full">
                            Get started
                        </a>
                    </div>
                </Link>
            </div>
            
            <div className="absolute top-0 w-full h-full"></div>
        </section>  
        )
    }
    
    return (
        <div className='w-full py-5'>
        <Container>
            <div className='mt-12 max-w-screen-lg mx-auto px-4 md:px-8'>
                {posts
                .slice() // creates a shallow copy of the array to avoid mutating the original posts array
                .reverse()
                .map((post) => (
                    <div key={post.$id} className=''>
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
    )
}

export default Home
