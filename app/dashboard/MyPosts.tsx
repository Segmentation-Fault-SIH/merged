'use client'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import {AuthPosts} from '../types/AuthPosts'
import EditPost from './EditPost'
const fetchAuthPosts = async () =>{
    const response = await axios.get('/api/posts/authPosts')
    return response.data
}
export default function MyPosts(){
    const {data, isLoading, isError} = useQuery<AuthPosts>(
        {
            queryKey:['authPosts'],
            queryFn:fetchAuthPosts,
        }
    );
    if(isLoading) return <h1>Loading...</h1>
    console.log(data);
    return (
        <div>
            {data?.posts.map((post)=>(
                <EditPost 
                    key={post.id}
                    id={post.id}
                    avatar={data.image}
                    name={data.name}
                    title={post.title}
                    comments={post.comments}/>
            ))}
        </div>
    )
}