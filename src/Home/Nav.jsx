import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { SiImessage } from "react-icons/si";
import { FaUserInjured } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { removeUser } from "../Slice/userslice";




const Nav = ({userInfo}) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState("home");
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal,setshowLogoutModal]=useState(false);


  const navItems = [
    { id: "", icon: <IoHome />, label: "Home" },
    { id: "message", icon: <SiImessage />, label: "Message" },
    { id: "profile", icon: <FaUserInjured />, label: "Profile" },
      { id: "logout", icon: <BiLogOut />, label: "Logout" },
  ];

 

  const handleClick = (item) => {
    
    setActive(item.id);
    if (item.id === "profile"){
       setShowModal(true);
  }else if (item.id === "logout"){
      setshowLogoutModal(true);
  }else{
    setShowModal(false);
    setshowLogoutModal(false)
    navigate(`/${item.id}`)
  }
  };

  
  const handleLogout= ()=>{
 
signOut(auth)
.then(() => {
  localStorage.removeItem("user")
  dispatch(removeUser(null));
 navigate("/signin")
}).catch((error) => {
console.log(error)
});
  }
  return (
    <>
      
      <div className="fixed bottom-1 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-3xl shadow-lg px-4 py-2 flex items-center justify-center z-50">
        <ul className="flex gap-10">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={()=> handleClick(item)}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                active === item.id ? "text-blue-500 scale-110" : "text-gray-400"
              } hover:text-blue-400`}
            >
              <div className="text-3xl">{item.icon}</div>
              <span className="text-sm mt-1">{item.label}</span>
              {active === item.id && (
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 animate-pulse"></span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {showModal &&  (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-80 relative">
            <h2 className="text-xl font-bold text-white mb-2">Profile Info</h2>
            
           <div className="flex flex-col gap-4 mt-7">
  <div className="flex gap-4">
    <img
      src={userInfo.photoURL}
      alt="user avatar"
      className="h-12 rounded-[20px]"
    />
    <div className="flex flex-col gap-1">
      <p className="text-gray-300">
        <span className="font-semibold">{userInfo?.displayName}</span>
      </p>
      <p className="text-gray-300">
        <span className="font-semibold">{userInfo?.email}</span>
      </p>
      
      <div className="flex gap-3 mt-3">
        <button
       onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
        >
          close
        </button>
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
      )}

      {showLogoutModal &&  (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-80 relative">
            <h2 className="text-xl font-bold text-white mb-2">Profile Info</h2>
            
           <div className="flex flex-col gap-4 mt-7">
  <div className="flex gap-4">
    <img
      src={userInfo.photoURL}
      alt="user avatar"
      className="h-12 rounded-[20px]"
    />
    <div className="flex flex-col gap-1">
      <p className="text-gray-300">
        <span className="font-semibold">{userInfo?.displayName}</span>
      </p>
      <p className="text-gray-300">
        <span className="font-semibold">{userInfo?.email}</span>
      </p>
      
      <div className="flex gap-3 mt-3">
          <button
       onClick={() => setshowLogoutModal(false)}
          className="px-4 py-2 bg-teal-300 text-white rounded hover:bg-gray-500 transition"
        >
          Close
        </button>
        <button
       onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
