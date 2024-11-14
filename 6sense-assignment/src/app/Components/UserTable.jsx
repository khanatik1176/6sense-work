'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const UserTable = () => {
  
  const [users, setUsers] = useState([

  {
      id: "2",
      firstName: "Rahman",
      lastName: "Hossain",
      email: "Rahman12@gmail.com",
      phoneNumber: "01767159062",
      status: "Active"
  },
  {
      id: "3",
      firstName: "Farhan",
      lastName: "Ahmed",
      email: "Far122@gmail.com",
      phoneNumber: "01711896464",
      status: "Active"
  },
  {
      id: "4",
      firstName: "Raihan",
      lastName: "Ahmed",
      email: "Rar122@gmail.com",
      phoneNumber: "01722896464",
      status: "Active"
  },
  {
      id: "5",
      firstName: "Raihan",
      lastName: "Khan",
      email : "rak32@gmail.com",
      phoneNumber: "01742896424",
      status: "Active"

  }


  ]);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDetails = (id) => {
    router.push(`/User/Details/${id}`);
  };

  const handleBlock = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';
    try {
      // await axios.put(`http://localhost:3000/users/${id}`, { status: newStatus });
      setUsers(users.map(user => user.id === id ? { ...user, status: newStatus } : user));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='min-h-screen p-8 pb-20 font-sans'>
      <div className='flex flex-col items-center justify-center'>
        {!users || users.length === 0 ? (
          <p className='text-3xl text-black'>No users found</p>
        ) : (
          <table className='table-auto border border-gray-400 bg-slate-400 text-black xl:w-full overflow-x-auto xl:overflow-x-hidden'>
            <thead>
              <tr>
                <th className='px-4 py-2 border'>First Name</th>
                <th className='px-4 py-2 border'>Last Name</th>
                <th className='px-4 py-2 border'>Email</th>
                <th className='px-4 py-2 border'>Phone Number</th>
                <th className='px-4 py-2 border'>Status</th>
                <th className='px-4 py-2 border' colSpan="3">Options</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className='border px-4 py-2'>{user.firstName}</td>
                  <td className='border px-4 py-2'>{user.lastName}</td>
                  <td className='border px-4 py-2'>{user.email}</td>
                  <td className='border px-4 py-2'>{user.phoneNumber}</td>
                  <td className='border px-4 py-2'>{user.status}</td>
                  <td className='border px-4 py-2' colSpan="3">
                    <div className='flex justify-around flex-col xl:flex-row gap-6'>
                      <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-1 rounded-2xl' onClick={() => handleDetails(user.id)}>Details</button>
                      <button
                        className={`px-6 py-1 rounded-2xl ${user.status === 'Active' ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                        onClick={() => handleBlock(user.id, user.status)}
                      >
                        {user.status === 'Active' ? 'Block' : 'Unblock'}
                      </button>
                      <button className='bg-red-500 hover:bg-red-600 text-white px-6 py-1 rounded-2xl' onClick={() => handleDelete(user.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserTable;