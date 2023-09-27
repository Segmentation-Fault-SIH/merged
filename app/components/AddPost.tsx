'use client'
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios,{AxiosError} from "axios"
import toast from "react-hot-toast"
export default function CreatePost (){
    const [title, setTitle] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const queryClient = useQueryClient();
    let toastPostID:string;
    //create a post with title
    const {mutate} = useMutation( 
        async (title:string)=>await axios.post('/api/posts/addPost',{title}),
        {onError:(error)=>{
            console.log(error);
            if(error instanceof AxiosError){
                toast.dismiss(toastPostID); 
                toast.error(error?.response?.data.message, { id: toastPostID })
            }
            setIsDisabled(false);
           
        },
        onSuccess:(data)=>{  
            toast.dismiss(toastPostID); 
            toast.success("Post has been made 🔥", { id: toastPostID })
            queryClient.invalidateQueries(["posts"])
            setTitle('');
            setIsDisabled(false);
         }
    },
      
    )
        const submitPost = async (e:React.FormEvent)=>{
        e.preventDefault();
        toastPostID = toast.loading("Creating a post...",{ id: toastPostID});
        
        setIsDisabled(true);
        mutate(title);
        }

    return(
        <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md" >
            <div className="flex flex-col my-4">
                <textarea onChange={(e)=>setTitle(e.target.value)} name="title" value={title}
                placeholder="what's on your mind?"
                className="p-4 text-lg rounded-md my-2 bg-gray-200"
                ></textarea>
            </div>
            <div className="flex items-center justify-between gap-2" >
                <p  className={`font-bold text-sm ${title.length>3000 ?"text-red-700":"text-gray-700"}  `}>
                    {title.length}/3000
                </p>
                <button type="submit"
                disabled={isDisabled}
                className="bg-teal-600 text-white text-sm px-6 py-2 rounded-md">
                    Create a Post</button>
            </div>
        </form>
    )
}