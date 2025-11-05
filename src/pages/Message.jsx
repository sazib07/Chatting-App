import { getDatabase, onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selecteduser } from "../Slice/Messageslice";

const Message = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
let db=getDatabase()
let [friendList,setFriendList]=useState([])
let user = useSelector((state) => state.userInfo?.value);
const dispatch = useDispatch()

  // const friends = [
  //   { id: 1, name: "Zack", status: "online" },
  //   { id: 2, name: "Nishat", status: "offline" },
  //   { id: 3, name: "Sifat", status: "online" },
  // ];
  const handleSelectFriend = (item) => {
    setSelectedFriend(item);
    setMessages([
      { from: "me", text: "" },
      { from: item.name, text: "" },
 ])
      if(user.uid == item.senderid){
        dispatch(selecteduser({name: item.recivername,email:item.reciveremail}))
      }else{
         dispatch(selecteduser({name: item.sendername,email:item.senderemail}))
      }
   
  };
const handleSendMessage = async (e) => {
  if (input.trim() === "") return;

  const now = new Date();
  const formattedTime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  const newMessage = {
    from: "me",
    text: input,
    time: formattedTime,
  }; 
  setMessages([...messages, newMessage]);
  setInput("");

 
  try {
    const messagesRef = ref(db, "messages");
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, newMessage);
  } catch (error) {
    console.error("Error saving message:", error);
  }
};
  useEffect(()=>{
  const friendrequestRef = ref(db, 'friendList/' );
  onValue(friendrequestRef, (snapshot) => {
    let array=[]
   snapshot.forEach((item)=>{

   if(user.uid == item.val().senderid || user.uid == item.val().reciverid){
     array.push({...item.val(),uid:item.key})

   }

     }
    );
setFriendList(array);
  });
    },[]);
  return (
    

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedFriend ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between bg-blue-500 text-white p-4">
              <div className="flex items-center">
                <img
                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${selectedFriend.sendername}`}
                  alt={selectedFriend.recivername}
                  className="w-10 h-10 rounded-full"
                />
                <h3 className="ml-3 font-semibold text-lg">
                  {selectedFriend.sendername}
                </h3>
              </div>
              <span
                className={`text-sm ${
                  selectedFriend.status === "online"
                    ? "text-green-200"
                    : "text-gray-300"
                }`}
              >
                {selectedFriend.status}
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.from === "me" ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-xs ${
                      msg.from === "me"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-4 mb-10 bg-white border-t flex">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleSendMessage}
                className="ml-3 bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
            Select a friend to start chatting 💬
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;

// set(push(ref(db, "msglist/" )), {
//   sendername:user.displayName,
//   senderid:user.uid,
//   senderemail:user.email,
//   recivername:item.name,
//   reciveremail:item.email,
//   reciverid:item.uid,
//   })
