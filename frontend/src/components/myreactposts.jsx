import React, { useEffect, useState } from "react";
import { FaUser, FaHeart } from "react-icons/fa";
import PostTextUI from "../components/posttextblogs";


export default function Myreactpost() {


    const [allpostsing, setAllpostsing] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (!token) {
            navigate('/login')
        } else {
            fetch('http://localhost:3003/vlogs/myreactpost', {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                }
            }).then(res => res.json()).then(result => {
                setAllpostsing(result)
            })
        }
    }, []);

    return (
        <div>

            {
                allpostsing.map(items => {
                    return <div className="flex justify-center items-center">

                    <div key={items._id} className="max-[640px]:w-[100%] w-[40%] p-4 flex flex-col items-center justify-center space-y-4 shadow-lg border rounded-lg">
                        <span className="text-lg font-semibold">{items.user.fullname}</span>
                        <p className="text-sm text-gray-600 text-center">
                            {items.vlogcontent}
                        </p>
                        {
                            <FaHeart onClick={() => handleunlike(items._id)} className="w-6 h-6 text-red-500 mt-2" />
                        }

                        </div>
                    </div>

                }
                )
            }

        </div>
    )
}