import React, { useState, useEffect } from 'react';
import "./User.css";
import axios from "axios";
import toast from 'react-hot-toast';
import { Await, Link, } from 'react-router-dom';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const Deleatuser = async (userId) => {
    await axios.delete(`http://localhost:3000/api/delete/user/${userId}`)
      .then((response) => {
        
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <>
      <div className="p-4 flex justify-center">
        <h1 className="text-3xl">The Users Of My Company</h1>
      </div>

      <div className="p-4 flex justify-center">
        <Link
          type="button" to={"/add"}
          className="text-sm bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded focus:outline-none focus:shadow-outline"
        >
          Add User
        </Link>
      </div>

      {users.length === 0 ? (
        <div className='flex justify-center'>
          <div className='p-32 w-1/2 text-gray-900 bg-gray-200 text-center'>
          <h2 className='text-3xl text-red-400'>No Data To Display !!!</h2>
          <p className='text-xl m-4'>please add new user</p>
        </div>
        </div>
      ):(
        <div className="p-4 flex justify-center">
        <div className="p-32 w-1/2 text-gray-900 bg-gray-200 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <thead>
              <tr className="border-b bg-cyan-300">
                <th className="text-left p-3 px-5 border-r">S.No</th>
                <th className="text-left p-3 px-5 border-r">Name</th>
                <th className="text-left p-3 px-5 border-r">Email</th>
                <th className="text-left p-3 px-5 border-r">Address</th>
                <th className="text-left p-3 px-5 border-r">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-orange-50 bg-gray-100">
                  <td className="p-3 px-5 border-r">{index + 1}</td>
                  <td className="p-3 px-5 border-r">{user.name}</td>
                  <td className="p-3 px-5 border-r">{user.email}</td>
                  <td className="p-3 px-5 border-r">{user.adress}</td>
                  <td className="p-3 px-5 border-r">
                    <Link
                      to={`/update/` + user._id}
                      type="button"
                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => { Deleatuser(user._id) }}
                      type="button"
                      className=" mt-2 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      
    </>
  );
};

export default User;
