import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const PostTextUI = () => {
    const navigate=useNavigate()
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can handle the text submission here
        if (text.length >= 5) {
            fetch('http://localhost:3003/vlogs/blogspost', {
                method: "POST",
                headers: {
                    'Content-Type':"application/json",
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                },
                body: JSON.stringify(
                    { content: text }
                )

            }).then(res => res.json()).then(result => {
                if (!result.error) {
                    toast.success("Posted Successfully")
                    setText('')
                } else {
                    if(result.error=="logout"){
                        localStorage.clear()
                        navigate('/')
                        toast.error("There is a problem . Try to LogIn")
                    }
                }
            })
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">Post Your Thoughts</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="w-full h-32 p-4 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
                        value={text}
                        onChange={handleChange}
                        placeholder="Write your post here..."
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostTextUI;
