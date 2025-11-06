import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    status: "online",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    status: "offline",
  },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "busy",
  },
   {
    id: 4,
    name: "Charlie Davis",
    email: "charlie@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "busy",
  },
  {
    id: 4,
    name: "Charlie Davis",
    email: "charlie@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "busy",
  },
];

const statusColors = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  busy: "bg-red-500",
};

const Blocklist = () => {
  let user = useSelector((state)=>state.userInfo.value);
  const [blockList,setBlockList]=useState([])


let db=getDatabase()
   useEffect(()=>{
  const blocklistRef = ref(db, 'blockList/' );
  onValue(blocklistRef, (snapshot) => {
    let array=[]
   snapshot.forEach((item)=>{
    if (user.uid == item.val().blockbyid){
        array.push({...item.val(),uid:item.key})

    } 

    });
    console.log(array)
setBlockList(array);
  });
},[]);
  let handleUnBlock=(item)=>{
    remove(ref(db,"blockList/" + item.uid));
    };
  return (
  <div className="w-sm overflow-y-auto mt-10 h-[380px] bg-white shadow-lg rounded-xl overflow-hidden">
      <h2 className="text-xl font-bold p-4 border-b">BlockList</h2>
      <ul>
        {blockList.map((user) => (
          <li
          key={user.id}
          className="flex items-center p-4 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {console.log(user)}
            <div className="relative">
              <img
                className="w-12 h-12 rounded-full"
                src={user.avatar}
                alt={user.name}
              />
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColors[user.status]}`}
              ></span>
            </div>
            <div className="ml-4">
              <p className="font-medium">{user.blockeduser}</p>
              {/* <p className="text-sm text-gray-500">{user.senderemail}</p> */}
            </div>
            {/* <FaUserPlus /> */}
            <button onClick={()=>handleUnBlock(user)}
             className="bg-blue-500  ml-12 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Unblock
</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blocklist