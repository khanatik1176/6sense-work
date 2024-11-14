'use client';
import {useState,useEffect} from 'react'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CreateUser = () => {

  const router = useRouter();

   const [formData, setFormData] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      status: "",
    }
   );

   const [errors, setErrors] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    }
   );

   const handleChange = (e) =>
   {
       const {name, value} = e.target;
       setFormData({...formData, [name]: value});
     
   };

   const validateForm = () =>
   {
      const errors = {};

      const {firstName, lastName, email,phoneNumber} = formData;

      if(!firstName)
      {
        errors.firstName = 'First Name is required';
      }

      else if(!/^[A-Za-z\s]+$/.test(firstName))
      {
        errors.firstName = 'First Name should only contain letters';
      }

      if(!lastName)
        {
          errors.lastName = 'Last Name is required';
        }
  
        else if(!/^[A-Za-z\s]+$/.test(lastName))
        {
          errors.lastName = 'Last Name should only contain letters';
        }

        if (!email) {
          errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = 'Email address is invalid.';
        }

        if (!phoneNumber) {
          errors.phoneNumber = 'Phone Number is required.';
        } else if (!/^\+?[0-9]\d{1,14}$/.test(phoneNumber)) {
          errors.phoneNumber = 'Phone Number is invalid.';
        }

        return errors;

   }

   const handleSubmit = async (e) =>
   {
      e.preventDefault();
      
      const data = {...formData, status: "Active"};

      const occuredErrors = validateForm();

      if(Object.keys(occuredErrors).length > 0)
      {
        setErrors(occuredErrors);
        return;
      }

      try{
        
        //this part will work when we will have a backend.

        const response = await axios.post('http://localhost:3000/users', data,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if(response.status === 201)
        {

          router.push(`/`);

          setFormData(
            {
              firstName: '',
              lastName: '',
              email: '',
              phoneNumber: ''
            }
          )
    
          setErrors(
            {
              firstName: '',
              lastName: '',
              email: '',
              phoneNumber: ''
            }
          )
          
        }
      }

      catch(error)
      {
        console.log(error);
      }

    }



  return (
    <div className='full-form-area bg-blue-400 h-screen'>
        <div className="form-area bg-white flex flex-col rounded-l-3xl rounded-r-3xl w-[350px] h-[550px] sm:w-[400px] sm:h-[600px] justify-center items-center relative left-[30px] top-[150px] sm:left-[500px] sm:top-[200px] xl:left-[750px] xl:top-[200px]">
            <h1 className='text-3xl font-sans text-black '> Create User </h1>

            <div className="form-part">
              <form  onSubmit={handleSubmit} className='flex flex-col'>
                <>
                <label htmlFor="firstName" className='text-black font-xl pb-2 pt-6 font-semibold'>First Name</label>
                <input type="text"
                 name="firstName" 
                 id="firstName" 
                 onChange={handleChange}
                 value={formData.firstName}
                 className='bg-transparent bg-slate-200 border rounded-2xl h-8 pl-4 pr-10 w-90 text-black' />
                {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
                </>
                <>
                <label htmlFor="lastName" className='text-black font-xl pt-3 pb-2 font-semibold'>Last Name</label>
                <input 
                  type="text"
                  name="lastName"
                  id="lastName" 
                  onChange={handleChange}
                  value={formData.lastName}
                  className='bg-transparent bg-slate-200 border rounded-2xl h-8 pl-4 pr-10 w-90 text-black' />
                {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
                </>
                <>
                <label htmlFor="email" className='text-black font-xl pt-3 pb-2 font-semibold'>Email</label>
                <input 
                type="email" 
                name="email" 
                id="email" 
                onChange={handleChange} 
                value={formData.email}
                className='bg-transparent bg-slate-200 border rounded-2xl h-8 pl-4 pr-10 w-90 text-black'/>
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </>
                <>
                <label htmlFor="phoneNumber" className='text-black font-xl pt-3 pb-2 font-semibold'>Phone Number</label>
                <input 
                type="text" 
                name="phoneNumber" 
                id="phoneNumber" 
                onChange={handleChange}
                value={formData.phoneNumber}
                className='bg-transparent bg-slate-200 border rounded-2xl h-8 pl-4 pr-10 w-90 text-black' />
                {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
                </>
                <button className='bg-blue-600 border rounded-3xl h-10 mt-5 w-42 text-white hover:bg-blue-700 transition-all ease-in duration-200'>Create</button>
                <Link href={"/"} className='bg-green-600 border rounded-3xl h-10 mt-5 py-2 px-6 text-white hover:bg-green-700 transition-all ease-in duration-200 text-center'>Back to Dashboard</Link>
              </form>
            </div>
        </div>
    </div>
  )
}

export default CreateUser
