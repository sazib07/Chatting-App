// import React, { useState } from 'react'

//  const friends = [
//     { id: 1, name: "zack", status: "online" },
//     { id: 2, name: "Nishat", status: "offline" },
//     { id: 3, name: "Sifat", status: "online" },
//   ];
// const Sidebar = () => {
//      const [selectedFriend, setSelectedFriend] = useState(null);

     
//   const handleSelectFriend = (item) => {
//     setSelectedFriend(item);
//     setMessages([
//       { from: "me", text: "Hey! How are you?" },
//       { from: item.name, text: "I'm good! You?" },
//     ]);
//   };
//     const handleSendMessage = () => {
//     if (input.trim() === "") return;
//     setMessages([...messages, { from: "me", text: input }]);
//     setInput("");
//   };
//   return (
//  <div className="w-1/4 bg-white border-r border-gray-200 p-4 flex flex-col">
//         <h2 className="text-2xl font-bold mb-4 text-gray-700">Friends</h2>
//         <ul className="space-y-2 overflow-y-auto flex-1">
//           {friends.map((item) => (
//             <li
//               key={item.id}
//               onClick={() => handleSelectFriend(item)}
//               className={`flex items-center p-3 rounded-lg cursor-pointer transition 
//                 ${
//                   selectedFriend?.id === item.id
//                     ? "bg-blue-500 text-white"
//                     : "hover:bg-gray-200"
//                 }`}
//             >
//               <div className="relative w-10 h-10">
//                 <img
//                   src={`https://api.dicebear.com/9.x/initials/svg?seed=${item.name}`}
//                   alt={item.name}
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <span
//                   className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
//                    item.status === "online"
//                       ? "bg-green-500"
//                       : "bg-gray-400"
//                   }`}
//                 ></span>
//               </div>
//               <p className="ml-3 font-medium">{item.name}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//   )
// }

// export default Sidebar