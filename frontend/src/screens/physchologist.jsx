import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../contex/logincontext";


const PhyschologistDirectory = () => {

  const {tochatlist,setTochatlist}=useContext(loginContext)

  const navigate=useNavigate()
  const [Physchologists, setPhyschologists] = useState([]);
  var filteredPhyschologists


  useEffect(() => {
    const token=localStorage.getItem('jwt')

    if(!token){
      navigate('/login')
    }else{
      fetch('http://localhost:3003/usersDetails',{
        headers:{
          'Content-Type':"application/json"
        }
      }).then(res=>res.json()).then(result=>{
        setPhyschologists(result.filter(items=>{
          return (items.role!="Client" && items._id!=localStorage.getItem('jwt'))
        }))
      })
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  
  if(Physchologists.length>0){

    filteredPhyschologists = Physchologists.filter((Physchologist) =>
      Physchologist.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

  const handleSelectUser=(iduser)=>{
    console.log(iduser)
    if(window.confirm("Do you want to chat with this Physchologist")){
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
          navigate('/chat')
        }
      })
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-8 ">Physchologist / Therapist Directory</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name"
            className="w-full p-3 border drop-shadow-[0_1px_10px_rgba(26,77,23,0.77)] border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2  focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bg-white shadow-xl rounded-lg">
          { filteredPhyschologists!=null && (filteredPhyschologists.length > 0 ? (
            <ul >
              {filteredPhyschologists.map((Physchologist) => (

                <li
                  key={Physchologist._id}
                  className="p-5 border-b font-bold border-2 border-green-100 hover:bg-gray-50 flex justify-between items-start gap-4"
                  >
                    <button className=" flex justify-center items-center gap-5">

                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-green-800 font-extrabold rounded-full flex items-center justify-center">
                    Dr.
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{Physchologist.fullname.toUpperCase()}</h2>
                    <p className="text-gray-600">Physchologist</p>
                  </div>
                    </button>
                    <button
                  onClick={() => handleSelectUser(Physchologist._id)}
                  className="bg-green-500 m-2 text-white px-2 py-1 rounded-md hover:bg-green-600 "
                >
                  Chat
                </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-6 text-gray-500 text-center">No Physchologists found.</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhyschologistDirectory;