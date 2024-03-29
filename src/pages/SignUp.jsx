//import React from 'react'
//icons --react-icons
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { getAuth, createUserWithEmailAndPassword, updateProfile   } from 'firebase/auth';
import { db } from '../firebase';
import { serverTimestamp, setDoc, doc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';


export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { name, email, password } = formData;
    const navigate = useNavigate();
    function onChange(e){
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    async function onSubmit(e){
        e.preventDefault();

        try {
          const auth = getAuth()
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(auth.currentUser, {
            displayName: name
          });
          const user = userCredential.user;
          //console.log(user);
          const formDataCopy = {...formData};
          delete formDataCopy.password;
          formDataCopy.timestamp  = serverTimestamp();

          await setDoc(doc(db, 'users', user.uid), {
            ...formDataCopy
          });
          // toast.success("Registration successful");

          navigate('/');

        } catch (error) {
          //console.log(error);
          toast.error("Something went wrong with the registration -- please try again")

        }
    }
  return (
   <section>
  
        <h1 className="text-center text-3xl mt-6 font-bold text-indigo-500">Sign Up</h1>
        <div className="flex justify-center flex-wrap items-center py-12 max-w-6xl mx-auto " >
            <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 ">
                <img src="../../public/jackie-1.png" alt="Jacqueline" 
                className="w-full rounded-2xl"/>
            </div>
            <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                <form onSubmit={onSubmit}>
                <input type="text" id="name" value={name} onChange={onChange}
                     placeholder="Full Name" className="mb-6 w-full px-4 py-2 text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />
                     
                    <input type="email" id="email" value={email} onChange={onChange}
                     placeholder="Email address" className="mb-6 w-full px-4 py-2 text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />
                     <div className='relative mb-6'>
                     <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={onChange}
                     placeholder="Password" className="w-full px-4 py-2 text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />
                     {showPassword ? (
                        <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer" onClick={()=> setShowPassword ((prevState)=> !prevState)}/>
                     ) : ( <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer" onClick={()=> setShowPassword ((prevState)=> !prevState)}/>)}
                     </div>
                     <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg ">
                     <p className="mb-6">
                         Have a account?
                            <Link to="/sign-in" className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out ml-1">Sign in</Link>
                        
                     </p>
                     <p>
                        <Link to="/forgot-password"  className="text-blue-500 hover:text-blue-800 transition duration-200 ease-in-out">Forgot Password?</Link>
                     </p>
                     </div>
                     <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 " 
                type="submit">Sign up</button>
                <div className="flex my-4 items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300  ">
                    <p className="text-center font-semibold m-4">OR</p>
                </div>
                <OAuth />
                </form>
                
            </div>
        </div>
   </section>
  )
}
