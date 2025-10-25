import React, { useEffect } from 'react'
import { axiosPrivateInstance } from '../axios'
import useAuth from './useAuth'
import useRefreshToken from './useRefreshToken'
const useAxiosPrivate = () => {
   const {accessToken} = useAuth()
   const refresh = useRefreshToken()

  useEffect(() => {
     const requestInterceptor = axiosPrivateInstance.interceptors.request.use(
    (config) =>{
       if(!config.headers['Authorization']){
        config.headers['Authorization'] = `Bearer ${accessToken}`
       }
       return config
    },(error) => Promise.reject(error)
   )

   const responseInterceptor = axiosPrivateInstance.interceptors.response.use(
    (response) => response,
    async(error) => {
        const prevRequest = error?.config
        if(error?.response?.status===401 && !prevRequest?.sent){
            prevRequest.sent = true
            const newAccessToken = await refresh()
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return axiosPrivateInstance(prevRequest)
        }
        return Promise.reject(error)
    }
   )
   return () => {
    axiosPrivateInstance.interceptors.request.eject(requestInterceptor)
    axiosPrivateInstance.interceptors.response.eject(responseInterceptor)
   }
  },[accessToken,refresh])

 return axiosPrivateInstance
}

export default useAxiosPrivate