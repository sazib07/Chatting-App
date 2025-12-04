import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { getDatabase, ref, onValue, set, push} from "firebase/database";
import { useSelector } from "react-redux";

const statusColors = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  busy: "bg-red-500",
};

const UserList = () => {
  const db = getDatabase();
const [userList,setUserList]=useState([]);
const[friendrequestId,setfriendrequestId]=useState([]);
const[friendId,setFriendId]=useState([]);
const [loading,setloading]=useState(true);
let user = useSelector((state)=>state.userInfo.value);

  useEffect(()=>{
const userRef = ref(db, "users/");
onValue(userRef, (snapshot) => {
  let array=[]
 snapshot.forEach((item)=>{
  if (item.key !== user.uid){
    array.push({...item.val(),uid:item.key});
  }
 });
 setUserList(array)
 setloading(false)
});
  },[]);

   useEffect(()=>{
    const friendrequestRef = ref(db, 'friendrequest/' );
    onValue(friendrequestRef, (snapshot) => {
      let array=[]
     snapshot.forEach((item)=>{
         array.push(item.val().senderid + item.val().reciverid)
 setfriendrequestId(array)
      });
    });
      },[]);

      
   useEffect(()=>{
    const friendlistRef = ref(db, "friendList/");
    onValue(friendlistRef, (snapshot) => {
      let array=[];
     snapshot.forEach((item)=>{
         array.push(item.val().senderid + item.val().reciverid)
 setFriendId(array)
      });

    });
      },[]);

//        useEffect(()=>{
//     const blocklistRef = ref(db, "friendList/");
//     onValue(blocklistRef, (snapshot) => {
//       let array=[];
//      snapshot.forEach((item)=>{
//          array.push(item.val().senderid + item.val().reciverid)
//  setblockId(array)
//       });

//     });
//       },[]);


const handlefRequest=(item)=>{
set(push(ref(db, "friendrequest/" )), {
  sendername:user.displayName,
  senderid:user.uid,
  senderemail:user.email,
  recivername:item.name,
  reciveremail:item.email,
  reciverid:item.uid,
  })
}
console.log(friendrequestId)
  return (
    <div className="w-sm overflow-y-auto mt-10 h-[380px] bg-[#BFDBFE] shadow-lg rounded-xl overflow-hidden">
      <h2 className="text-xl font-bold p-4 border-b">User List</h2>
      <ul>

        {loading ?
        <div role="status" className="max-w-sm animate-pulse">
  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
  <span className="sr-only">Loading...</span>
</div>
        :
        userList.map((item) => (
          <li
            key={item.uid}
            className="flex items-center p-4 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="relative">
              {item.image?(

                <img
                  className="w-12 h-12 rounded-full"
                  src={item.image}
                  alt={item.name}
                />
              ):(
               <img
                className="w-12 h-12 rounded-full"
                src="https://picsum.photos/200/300"
                alt={item.name}
              />
              )}
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColors[item.status]}`}
              ></span>
            </div>
            <div className="ml-4">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.email}</p>
            </div>
            {/* <FaUserPlus /> */}
              {friendId.includes(user.uid + item.uid) ||
            friendId.includes(item.uid+user.uid) ?
  <h1 className=" cursor-pointer ml-12 text-black font-bold py-[px] bg-gray-300 px-[8px] rounded items-center justify-between">Friend</h1>
  :

            friendrequestId.includes(user.uid + item.uid) ||
            friendrequestId.includes(item.uid+user.uid) ? (
           <h1 className="bg-gray-400 cursor-pointer ml-12 text-black font-bold py-2 px-4 rounded items-center justify-between" >R.</h1>
               ):(
            <button 
            onClick={()=> handlefRequest (item)}
             className="bg-blue-500 cursor-pointer ml-12 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded items-center justify-between">
  Add
</button>
        )}
        
          </li>
        ))
      }
      </ul>

    </div>
  );
};


export default UserList;


{/* {blockeduser

.includes(user.uid + item.id) ||
blockeduser
.includes(item.id+user.uid) ?
<h1 className=" cursor-pointer ml-12 text-black font-bold py-[px] bg-gray-300 px-[8px] rounded items-center justify-between">Friend</h1>
:

blockedid.includes(user.uid + item.uid) ||
blockedid.includes(item.uid+user.uid) ? (
<h1 className="bg-gray-400 cursor-pointer ml-12 text-black font-bold py-2 px-4 rounded items-center justify-between" >R.</h1>
):(
<button 
onClick={()=> handlefRequest (item)}
className="bg-blue-500 cursor-pointer ml-12 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded items-center justify-between">
Add
</button>
)}
*/}

