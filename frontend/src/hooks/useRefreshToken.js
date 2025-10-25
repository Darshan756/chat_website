import { useEffect } from 'react'
import useAuth from './useAuth'
import { axiosInstance } from '../axios'
const useRefreshToken = () => {
    const {refreshToken,setRefreshToken,setAccessToken} = useAuth()
    const refresh =async () =>{
         try {
            const response = await axiosInstance.post('/auth/refresh',{refresh:refreshToken})
            if(response.status === 200){
                const newAccess = response.data?.access
                const newRefresh = response.data?.refresh

                console.log(response.data)
                setRefreshToken(newRefresh)
                setAccessToken(newAccess)
                localStorage.setItem('accessToken',newAccess)
                localStorage.setItem('refreshToken',newRefresh)

                return newAccess

            }
         } catch (error) {
             console.error('Failed to refresh token ❌', error)
             throw error
         }
         
      }
      return refresh
      
    
    
}

export default useRefreshToken