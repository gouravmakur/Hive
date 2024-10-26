import React , {useCallback , useEffect, useState}from 'react'
import service from '../../Appwrite/config'
import {Button , Input, RTE , Select} from "../index"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set, useForm } from 'react-hook-form'



function PostForm({post}) {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading , setLoading] = useState(false);

    {/* 
        react hook form gives us many functionality like :
        * setValue to set value in the Form
        * getValues to get values from the form 
        * control this is the control we pass when we call the RTE to get its Contoll
        * watch monitor changes in the fileds
    */}

    const {register , handleSubmit , watch , setValue , getValues , control} = useForm({
        defaultValues : {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status : post?.status || 'active',
        }
    });

    const submit = async (data) =>{

        setLoading(true);
        if(post){

            const file  = data.image[0] ? await service.uploadFile(data.image[0]) : null
            console.log("update post: " , post);
            if(file){
                await service.deleteFile(post.featuredImage);
            }

            const dbPost = await service.updatePost(post.$id , {...data,
                featuredImage : file ? file.$id : undefined
            })

            if(dbPost){
                setLoading(false);
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else{

            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

            if(file){

                const fileId = file.$id
                data.featuredImage = fileId; // we are storing the id post the file
                
                const dbPost = await service.createPost({...data , 
                    userid : userData.$id})

                if(dbPost){
                    setLoading(false);
                    navigate(`/post/${dbPost.$id}`);
                }

            }
        }
    }

    const slugTransform = useCallback((value)=>{

        if(value){    

            const slug = value.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]/g, '') 
            .replace(/\s+/g, '-')

            return slug;
        }
        return ''
    }, [])

    {/* 
        The useEffect hook returns a cleanup function. This is necessary because it unsubscribes from the watch when the component unmounts or before running the effect again to prevent memory leaks.

        In this case, the watch function subscribes to changes in the form field values. However, when the component unmounts (i.e., it's removed from the DOM), the subscription still exists unless you explicitly unsubscribe.
        If the subscription isn't cleaned up, it may lead to memory leaks because the component is no longer in use, but the subscription is still active in the background, consuming resources.

        The cleanup ensures that the previous subscription is unsubscribed before setting up a new one.
    */}

    useEffect(() => {

        const subscription = watch ((value , {name}) => {

            if(name === 'title'){
                const slug = slugTransform(value.title).slice(0, 36);
                setValue('slug' , slug, {
                    shouldValidate : true
                })
            }
        });

        return () => {subscription.unsubscribe()}

    } , [watch, slugTransform , setValue]);
  return (

    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label = "Title : "
                placeholder = 'Title'
                className="mb-4 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                {...register ("title" , {required : true})}
            />
            <Input
                label = "Slug : "
                placeholder = 'Slug'
                className="mb-4 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                {...register ("slug" , {required : true})}
                onInput = {(e) => {

                    let slug = slugTransform(e.currentTarget.value);
                    slug = slug.slice(0, 36);  // Limit to 36 characters
                    setValue("slug", slug, { shouldValidate: true });
                }}
            />
            <RTE  name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input 
                label="Featured Image :"
                type = 'file'
                className="mb-4 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full file:mr-4  file:px-4 file:text-sm file:font-medium  file:text-blue-700
               hover:file:bg-blue-100"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                <img
                    src={service.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
                 </div>
            )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
            <Button type="submit"  className="w-full bg-green-500">
                {loading?  <div
                            className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                            <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Loading...</span>
                        </div> : post ? "Update" : "Publish"}
            </Button>
        </div>
    </form>
  )
}

export default PostForm
