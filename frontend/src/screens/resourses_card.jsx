import React, { useEffect, useState } from "react";
import { FaUser, FaHeart } from "react-icons/fa";

export default function UserCard({allposts,handlelikes , handleunlike}) {

  
  return (
    <div className="w-[60%] p-4 flex flex-col items-center space-y-4 shadow-lg border rounded-lg">
      <span className="text-lg font-semibold">{allposts.user.fullname}</span>  
      <p className="text-sm text-gray-600 text-center">
        {allposts.vlogcontent}
      </p>
      {
        allposts.likes.includes(localStorage.getItem('user')) ?(<FaHeart onClick={()=>handleunlike(allposts._id)} className="w-6 h-6 text-red-500 mt-2" />):(<FaHeart onClick={()=>handlelikes(allposts._id)} className="w-6 h-6 text-black mt-2" />)
      }

    </div>
  );
}