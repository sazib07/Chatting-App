import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser, userInfo } from '../Slice/userSlice'
import Userlist from '../Home/Userlist'
import Blocklist from './Blocklist'
import FriendRequestlist from './../Home/FriendRequestlist';

const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userInfo.value)

  const handleSend = () => {
    dispatch(userInfo({ name: "" }))
  }

  const handleRemove = () => {
    dispatch(removeUser(null))
  }

  return (
    <main className="p-4">
      <div className="flex gap-5 mt-4 justify-center">
        <Userlist />
        <FriendRequestlist />
        <Blocklist />
      </div>

      {/* <h1>{user?.displayName}</h1> */}

      
    </main>
  )
}

export default Home