import React, { useContext, useEffect ,useState } from "react";
import { useNavigate } from "react-router-dom";
import Resoursesnav from "../components/resousesnav";
import { FaUser, FaHeart } from "react-icons/fa";
import { loginContext } from "../contex/logincontext";
import PostTextUI from "../components/posttextblogs";
import MyreactpostUi from "../components/myreactposts";



const Education= () => {

  const {vlogshome,setVlogshome,vlogpost,setVlogpost,myposts,setMyposts}=useContext(loginContext)

  const navigate=useNavigate()

  const [allposts, setAllposts] = useState([]);
  const [allmyposts, setAllmyposts] = useState([]);


  useEffect(() => {
    const token=localStorage.getItem('jwt')
    if(!token){
      navigate('/login')
    }else{
      fetch('http://localhost:3003/vlogs/getblogspost',{
        "Content-Type":"Application/json"
      }).then(res=>res.json()).then(result=>{
        setAllposts(result)
        // console.log("___")
      })
    }
  }, []);

  const handleunlike=(id)=>{

    fetch('http://localhost:3003/vlogs/unlikePost',{
      
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify(
        {postid:id}
      )
      
    }).then(res=>res.json()).then(result=>{

      const newdata=allposts.map(items=>{
        if(items._id==result._id){
          return result
        }else{
          return items
        }
      })
      console.log(newdata)
      setAllposts(newdata)
      
    })
  }
  const handlelikes=(id)=>{

    fetch('http://localhost:3003/vlogs/likePost',{
      
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify(
        {postid:id}
      )
      
    }).then(res=>res.json()).then(result=>{

     
      fetch('http://localhost:3003/vlogs/getblogspost',{
        "Content-Type":"Application/json"
      }).then(res=>res.json()).then(result=>{
        setAllposts(result)
        // console.log("___")
      })
      
    })
  }
  
 

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <Resoursesnav/>

    {  vlogshome && vlogpost==false && myposts==false &&
(
      <div className="flex flex-col justify-center gap-2 m-5 items-center">
        {
          allposts.map(items=>{
                  return <div key={items._id} className="w-[60%] p-4 flex flex-col items-center space-y-4 shadow-lg border rounded-lg">
                        <span className="text-lg font-semibold">{items.user.fullname}</span>  
                        <p className="text-sm text-gray-600 text-center">
                          {items.vlogcontent}
                        </p>
                        {
                          items.likes.includes(localStorage.getItem('user')) ?
                          (<FaHeart onClick={()=>handleunlike(items._id)} className="w-6 h-6 text-red-500 mt-2" />)
                          :
                          (<FaHeart onClick={()=>handlelikes(items._id)} className="w-6 h-6 text-black mt-2" />)
                        }
                  
                      </div>
                  
                })
        }
      
      </div>)
              }

              {
                vlogshome==false && vlogpost && myposts==false &&  <PostTextUI/>
              }

              {
                vlogshome==false && vlogpost==false && myposts &&
                (
                  <div className="w-[100%] flex flex-col justify-center gap-2 m-5 items-center">
                  <MyreactpostUi/>
                    </div>
                )
              }
    </div>
  );
};

export default Education;