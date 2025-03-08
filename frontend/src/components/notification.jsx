import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../contex/logincontext";
import { useNavigate } from "react-router-dom";

const NotificationList = () => {
  const { notification, setNotification, notifcounting, setNotifcounting } = useContext(loginContext);
  const { tochatlist, setTochatlist } = useContext(loginContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:3003/notifying/allnotification', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt'),
          },
        });
        const result = await response.json();

        if (result.error) {
          setError(result.error);
        } else {
          setNotification(result);
          setNotifcounting(0); 

         
          result.forEach(async (item) => {
            await fetch('http://localhost:3003/notifying/updatenotification', {
              method: "PUT",
              headers: {
                "Content-Type": "Application/json",
              },
              body: JSON.stringify({ _id: item._id }),
            });
          });
        }
      } catch (error) {
        setError("Error fetching notifications.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

   
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [setNotification, setNotifcounting]);

  const navigating = () => {
    setTochatlist(true);
    navigate('/chat');
  };

  const markAsRead = (notificationId) => {
    fetch('http://localhost:3003/notifying/updatenotification', {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ _id: notificationId, read: true }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      
        setNotification((prevNotifications) =>
          prevNotifications.map((notif) =>
            notif._id === notificationId ? { ...notif, read: true } : notif
          )
        );
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to mark as read");
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredNotifications = notification.filter((notif) =>
    notif.content.toLowerCase().includes(searchTerm)
  );

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className="text-center">Loading notifications...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h2>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search notifications..."
          className="w-full p-2 border border-gray-300 rounded-lg"
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>

      {/* Notifications list */}
      <ul className="space-y-4">
        {currentNotifications.length > 0 ? (
          currentNotifications.map((notif) => (
            <li
              key={notif._id}
              onClick={() => navigating()}
              className={`p-4 rounded-lg shadow-md ${notif.read ? 'bg-gray-200' : 'bg-blue-100'} text-blue-800 cursor-pointer hover:bg-blue-200 transition duration-200`}
              onDoubleClick={() => markAsRead(notif._id)} 
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{notif.content}</span>
                <span className="text-sm text-gray-500">{notif.sender.fullname}</span>
              </div>
              <div className="text-sm text-gray-400">{notif.time}</div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No notifications available.</li>
        )}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {filteredNotifications.length > notificationsPerPage && (
          <nav>
            <ul className="flex space-x-2">
              {Array.from({ length: Math.ceil(filteredNotifications.length / notificationsPerPage) }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePagination(index + 1)}
                    className={`px-3 py-1 rounded-lg ${index + 1 === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-500 transition duration-200`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default NotificationList;


