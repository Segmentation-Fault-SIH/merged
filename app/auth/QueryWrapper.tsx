'use client'
import {Toaster} from 'react-hot-toast'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
  const queryClient = new QueryClient();
interface Props{
    children?:React.ReactNode
}
  const QueryWrapper=({children}:Props)=>(
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      {children}
    </QueryClientProvider>
  
  )
  export default QueryWrapper