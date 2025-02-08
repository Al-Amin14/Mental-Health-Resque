import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { loginContext } from "../contex/logincontext";

const chathome = ({setChatlist}) => {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [allusers, setAllusers] = useState([]);
  const [selectedusers, setSelectedusers] = useState([]);
  const [grouphName, setGrouphName] = useState("");
  const {tochatlist,setTochatlist}=useContext(loginContext)

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate('/login')
    } else {
      fetch('http://localhost:3003/usersDetails', {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => res.json()).then(result => {
        if (!result.error) {
          setAllusers(result.filter(items => items._id != localStorage.getItem('user')))
        }
      })

    }
  }, [search]);

  const handleSelectUser = (user) => {
    if (!selectedusers.some((u) => u._id === user._id)) {
      setSelectedusers([...selectedusers, user]);
    }
  };


  const handleChatting = (id) => {

  };

  const RemoveUsers = (user) => {
    setSelectedusers(selectedusers.filter(items => { return (items._id != user._id && items._id != localStorage.getItem('user')) }))


  }

  const create_grouph = async () => {
    if(selectedusers.length>=2){

      const let_id=selectedusers.map(items=>{
        return items._id
      })

      const value_id=JSON.stringify(let_id)
      if(grouphName.length>=1){
        fetch('http://localhost:3003/createGrouphs',{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
          },
          body:JSON.stringify({
            users:value_id,
            name:grouphName
          })
        }).then(res=>res.json()).then(result=>{
          if(result.error){
            toast.error("Some problem occured")
          }else{
            setTochatlist(true)
          }
        })
      }else{
        alert("Please enter your grouph name")
      }

    }else{
      var iduser=selectedusers.map(items=>items._id)
      iduser=iduser.toString()
      if(window.confirm("Do you want to create one o one chat")){
        fetch('http://localhost:3003/accessChat',{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
          },
          body:JSON.stringify({
            userid:iduser
          })
        }).then(res=>res.json()).then(result=>{
          if(result.error){
            alert("There is problem")
          }else{
            setTochatlist(true)
          }
        })
      }
    }
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
        {selectedusers.map((user) => (
          <div key={user._id} className="flex justify-center items-center gap-2 p-2 bg-blue-500 text-white rounded-md">
            <p>
              {user.fullname}
            </p>
            <button onClick={() => RemoveUsers(user)} ><ImCross /></button>
          </div>
        ))}
        {selectedusers.length > 0 ? <div><button onClick={() => create_grouph()} className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600">Upadate</button>

        </div> : ''}
      </div>
      {selectedusers.length > 0 ? (<div>
        <input
          type="text"
          placeholder="Search user..."
          value={grouphName}
          onChange={(e) => setGrouphName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>) : <div></div>}
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
                  <span>{user.fullname.toUpperCase()}</span>
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
