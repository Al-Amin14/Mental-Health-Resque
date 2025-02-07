import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";

const chathome = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [allusers, setAllusers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
        navigate('/login')
    } else {
        fetch('http://localhost:3003/usersDetails',{
            headers:{
                "Content-Type":"application/json",
            },
        }).then(res=>res.json()).then(result=>{
            if(!result.error){
                setAllusers(result.filter(items=> items._id != localStorage.getItem('user')))
            }
        })

    }
  }, [search]);

  const handleSelectUser = (user) => {
    
    
  };

  const handleChatting = (id) => {
    
  };

  const RemoveUsers=(user)=>{
    
    
  }

  const create_grouph=async ()=>{
    
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex overflow-x-auto space-x-2 mt-4 p-2 border border-gray-200 rounded-md">
        {/* {selectedUsers.map((user) => (
          <div key={user._id} className="flex justify-center items-center gap-2 p-2 bg-blue-500 text-white rounded-md">
            <p>
            {user.name}
            </p>
            <button onClick={()=>RemoveUsers( user)} ><ImCross/></button>
          </div>
        ))} */}
        {/* {selectedUsers.length>0 ? <div><button onClick={()=>create_grouph()} className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600">Upadate</button>
    
        </div>:''} */}
      </div>
      {/* {  selectedUsers.length>0 ? (<div>
      <input
        type="text"
        placeholder="Search user..."
        value={grouphName}
        onChange={(e) => setGrouphName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      </div>):<div></div>} */}
      <ul className="mt-4 border border-gray-200 rounded-md divide-y divide-gray-200">
        {
        allusers
          .filter((user) => user.fullname.toLowerCase().includes(search.toLowerCase()))
          .map((user, index) => (
            <div key={index} className="flex justify-between items-center ">

            <li
              key={index}
              onClick={() => handleSelectUser(user)}
              className=" flex-col p-5 border-b font-bold border-2 border-green-100 hover:bg-gray-50 flex items-start gap-4"
              >
              <span>{user.fullname}</span>
              <span className="font-semibold">Identity: {user.role}</span>
            </li>
              <button
                onClick={() => handleSelectUser(user)}
                className="bg-green-500 m-2 text-white px-2 py-1 rounded-md hover:bg-green-600"
                >
                Chat
              </button>
                  </div>
          ))
          }
      </ul>
    </div>
  );
};

export default chathome;
