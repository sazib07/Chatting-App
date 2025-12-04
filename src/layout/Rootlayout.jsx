import React, { useEffect } from 'react'
import { Outlet,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { app } from '../firebase.config'
import { getAuth } from 'firebase/auth'
import { userInfo } from '../Slice/userslice'
import Nav from '../Home/Nav'


const Rootlayout = () => {
const navigate= useNavigate();
const auth=getAuth(app);
let user = useSelector((state) => state.userInfo?.value);

useEffect(()=>{
   if(!user){
  navigate('/signin');
   } else if(!user.emailVerified){
     navigate('/signin');
   }
   else{
    console.log(auth.currentUser)
   }
   
  },[auth.currentUser]);


  return (
    <>
<body class="bg-slate-500 text-white">
  <div id="root"></div>
</body>
   <Outlet/>
  <Nav userInfo={user}/>
   

    </>
  )
}

export default Rootlayout