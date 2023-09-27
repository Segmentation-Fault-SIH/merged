'use client'
import AddPost from './components/AddPost'
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import Post from './components/Post'
import {PostsType} from './types/Posts'
//Fetch all posts
const allPosts = async()=>{
  const response = await axios.get('/api/posts/getPost')
  
  return response.data;
 
}
export default function Home() {
  const {data, error, isLoading}= useQuery<PostsType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
      
  })
  if (error) {
    return error
  }
  if (isLoading) {return "loading"}
  console.log(data);
  return (
    <main>
      {/* <AddPost/> */}
     <AddPost/>
     {data?.map((post)=>(
      <Post key={post.id}
      Comment={post.comments}
      name={post.user.name}
      postTitle={post.title}
      avatar={post.user.image}
      id={post.id}
      />
     ))}
    </main>
  )
}
