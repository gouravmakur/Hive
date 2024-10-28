import React, { useState, useEffect } from 'react';
import appwriteService from '../Appwrite/config';
import { PostCard, Container } from '../Components/index';
import { useSelector } from 'react-redux';
import authlogo from '../assets/user.jpg';
import { getUserDetails } from '../Appwrite/user';
import { useDispatch } from 'react-redux';
import { getUserPost } from '../Store/PostSlice';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const [username, setUsername] = useState(null);
    const [postCount, setPostCount] = useState(0);
    const dispatch = useDispatch();

    // Fetch all posts
    useEffect(() => {
        appwriteService.getAllPost([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents || []);
            }
            setLoading(false);
        });
    }, []);

    // Fetch user details
    useEffect(() => {
        if (userData && userData.$id) {
            getUserDetails(userData.$id)
                .then((data) => {
                    setUsername(data.name);
                })
                .catch((error) => {
                    console.error("Error fetching user details:", error);
                });
        }
    }, [userData]);

    // Count user's posts
    useEffect(() => {
        const userPosts = posts.filter((post) => post.userid === userData?.$id);
        dispatch(getUserPost(userPosts));
        setPostCount(userPosts.length);
    }, [posts, userData?.$id]);

    const userPosts = posts.filter((post) => post.userid === userData?.$id);

    return loading ? (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex items-center justify-center min-h-screen p-5 bg-white min-w-screen">
                    <div className="flex space-x-2 animate-pulse">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    </div>
                </div>
            </Container>
        </div>
    ) : (
        <div className="w-full py-5 h-full">
            <Container>
                <div className="border-b-2 flex justify-between items-center mx-10 space-x-8">
                    <div className="flex items-center">
                        <div className="flex-none w-10 h-10 rounded-full my-4">
                            <img src={authlogo} className="w-full h-full rounded-full" />
                        </div>
                        <div className="ml-3">
                            <span className="block text-gray-900 text-2xl tracking-tight font-bold">{username}</span>
                        </div>
                    </div>
                    <div className="pr-6 text-base font-medium">
                        Total Posts: {postCount}
                    </div>
                </div>
                <div className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
                    {postCount > 0 ? (
                        userPosts
                            .slice()
                            .reverse()
                            .map((post) => (
                                <div key={post.$id} className="">
                                    <PostCard {...post} />
                                </div>
                            ))
                    ) : (
                        <div className="w-full pt-5 flex items-center justify-center min-h-full border-spacing-2 border-2 mb-8">
                            <Container>
                                <div className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8 flex flex-col items-center">
                                    <div className="text-center mt-10 pb-20">
                                        <h2 className="text-gray-600 py-4 text-4xl text-opacity-80 font-bold text-center">
                                            Make Your First Post
                                        </h2>
                                        <p className="text-gray-600 py-4 text-6xl text-opacity-80 font-bold text-left hover:text-gray-400">
                                            Share Ideas, Inspire Minds
                                        </p>
                                        <p className="text-gray-600 py-4 text-lg text-opacity-80 text-left">
                                            "Every great idea starts with a single step. Share your thoughts, and let them inspire the world."
                                        </p>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
