import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import "./Updateuser.css";

const Updateuser = () => {

    const initialUserState = {
        name: "",
        email: "",
        adress: ""
    };

    const [user, setUser] = useState(initialUserState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/user/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to load user data.");
            });
    }, [id]);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            await axios
                .put(`http://localhost:3000/api/update/user/${id}`, user)
                .then((response) => {
                    toast.success(response.data.message, { position: "top-right" });
                    navigate("/");
                });
        } catch (error) {
            console.error(error);
            toast.error("Failed to update user.");
        }
    };

    return (
        <div className='text-gray-900 bg-gray-600 m-40'>
            <div className='flex justify-center'>
                <Link to={"/"}>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:bg-green-800">Get back</button>
                </Link>
            </div>
            <form onSubmit={submitForm} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                    <input value={user.name} type="text" id="name" name='name' onChange={inputHandler} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Your name" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                    <input value={user.email} type="email" id="email" name='email' onChange={inputHandler} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="adress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address:</label>
                    <input value={user.adress} type="text" name='adress' id="adress" onChange={inputHandler} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Your address" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update User</button>
            </form>
        </div>
    );
};

export default Updateuser;
