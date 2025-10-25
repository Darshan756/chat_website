import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import RootLayout from './components/RootLayout'
import LeftSection from './components/LeftSection'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'

const App = () => {
  const router = createBrowserRouter(
    [
      {
        path:'/',
        element:<RootLayout />,
        children:
        [
          {
           index:true,
           element:<Home />
          },
          {
            path:'user',
            children:
            [
              {
                path:'signin',
                element:<PublicRoute ><SignIn /></PublicRoute>
              },
              {
                path:'signup',
                element:<PublicRoute><SignUp /></PublicRoute>
              },
              {
                path:'dashboard',
                element:<PrivateRoute><Dashboard /></PrivateRoute>
              }
            ]
          },
        
        ]
      },
      {
            path:'/left',
            element:<LeftSection />
       } 
     
    ]
  )

  return (
    <RouterProvider router={router}/>
   
  )
}

export default App