import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { removeUser, userInfo
} from '../Slice/userslice';
import Nav from '../Home/Nav';
import Userlist from '../Home/Userlist';
import FriendRequestlist from '../Home/Friendrequestlist';



const Home = () => {
let dispatch = useDispatch();
let user = useSelector((state)=>state.userInfo.value);

  let handleSend=()=>{
  dispatch(userInfo({name:""}));
  }
   let handleRemove=()=>{
  dispatch(removeUser(null));
  }


  return (
    

    <main>
      <div className="flex gap-5 mt-[15px] justify-center">

      <Userlist/>
      <FriendRequestlist/>
      </div>
      {/* <h1>{user.displayName}</h1> */}
        {/* <Nav userInfo={user}/> */}
    </main>

  )
}

export default Home