'use client'
import Image from 'next/image'
import {useState} from 'react'
import Toggle from './Toggle'
import axios from 'axios'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

type EditProps={
    id:string,
    avatar:string,
    name:string,
    title:string,
    comments?:{
        id:string,
        postId:string,
        userId:string,
    }[]

}
export default function EditPost(
    {avatar, name , title, comments, id}:EditProps
){const [toggle, setToggle] = useState(false)
    let deleteToastID:string;
    console.log(id)
    const queryClient = useQueryClient()
    //delete post 
    const { mutate } = useMutation(
        async (id: string) =>
            await axios.delete(`/api/posts/deletePost?id=${id}`, {data:id }),
        
        
          
        {
            onSuccess:(data)=>{console.log(data)
            toast.success("Post deleted successfully 😃",  {id:deleteToastID as string })
            toast.dismiss(deleteToastID); 
            queryClient.invalidateQueries(['authPosts'])
            

            },
            onError:(err)=>{console.log(err)
            toast.error("something went wrong", {id:deleteToastID})
            toast.dismiss(deleteToastID); 
            }
        }
    )
    const deletePost = ()=>{
        deleteToastID = toast.loading("Deleting post...", {id:deleteToastID});
        console.log(id)
        mutate(id)
    }
    return (
        <>
        <div className="bg-white my-8 p-8 rounded-lg">
            <div>
            <Image width={32} height={32} src={avatar} alt="avatar"/>
            <h3 className="font-bold text-gray-700">{name}</h3> 
            </div>
            <div className="my-8">
                <p className="break-all">{title}</p>

            </div>
            <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-gray-700">
                    {comments?.length} Comments

                </p>
                <button className="text-sm font-bold text-red-500" onClick={(e)=>{
                    e.preventDefault();
                    setToggle(!toggle);
                }}>
                    Delete
                </button>

            </div>
        </div>
        {toggle && <Toggle deletePost={deletePost} setToggle={setToggle}/>}
        
        </>
    )
}