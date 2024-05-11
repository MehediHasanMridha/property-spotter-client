import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import Message from './Message'
import { AuthContext } from '../Provider/AuthProvider'

const Chat = () => {

    const { user, logOut } = useContext(AuthContext);
    const [users, setUsers] = useState([])
    const [reciever, setReciever] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()


    const getUsers = async () => {
        const res = await axios.get('http://localhost:5000/allusers');
        setUsers(res.data);
    }

    useEffect(() => {
        socket.current = io('ws://localhost:8000');
    }, [])

    // socket e data pathabo
    useEffect(() => {
        if (user?._id) {
            socket.current.emit('addActiveUser', user?._id, user?.name);
        }
    }, []);

    // get active user
    useEffect(() => {
        socket.current.on('getActiveUser', (activeUsers) => {
            setOnlineUsers(activeUsers);
        });
    }, [])

    useEffect(() => {
        getUsers()
    }, [])

    const allUsers = users?.filter(u => u?._id !== user?._id)
    console.log(allUsers);


    return (
        <div className='bg-black max-h-[85vh]'>
            <div className='h-[85vh] overflow-y-scroll'>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-5 lg:gap-1">
                    <div className="rounded-lg  p-2">
                        <li className='p-2 mb-10 my-2 text-xl font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                            <img src={user?.photoURL} alt="" className='w-12 h-12 rounded-full' />
                            <div className='text-white'>
                                <h1 className='text-base font-bold capitalize '>{user?.name}</h1>
                                <p className='text-xs'>My Self</p>
                            </div>
                        </li>
                        <div className='overflow-y-scroll h-[70vh]'>
                            {
                                allUsers && allUsers.map((chat, idx) =>
                                    <li onClick={() => setReciever(chat)} key={idx} className='p-2 relative my-2 cursor-pointer hover:shadow-lg text-xl font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                                        <img src={chat?.photoURL ? chat?.photoURL : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt="" className='w-12 h-12 rounded-full' />
                                        <div>
                                            <h1 className='text-base font-bold capitalize text-white'>{chat.name}</h1>
                                            {onlineUsers.some(user => user.userId === chat._id) ? (
                                                <div className="flex items-center">
                                                    <span className="absolute bottom-4 left-12 w-2 h-2 rounded-full bg-green-700 mr-2"></span>
                                                    <p className="text-sm text-green-700">Online</p>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <span className="absolute bottom-4 left-12 w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                                                    <p className="text-sm text-red-500">Offline</p>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                )
                            }
                        </div>
                    </div>
                    <div className="rounded-lg lg:col-span-4">
                        <Message socket={socket} reciever={reciever} currentUser={user} onlineUsers={onlineUsers} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat