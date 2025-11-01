import React from 'react'
import { createBrowserRouter,RouterProvider} from "react-router";
import Rootlayout from './layout/Rootlayout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Message from './pages/message';
const App = () => {
  let router= createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    children: [
      { index: true, Component: Home },
      { path: "message", Component: Message},
    ],
  },
   {
    path: "/signup",
    Component: Signup,
   
  },
    {
    path: "/signin",
    Component: Signin,
   
  },
]);
  return (
  <RouterProvider router={router}/>
  )
}

export default App