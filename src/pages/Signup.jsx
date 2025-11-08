
import { createUserWithEmailAndPassword,sendEmailVerification,updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase.config';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
 import { getDatabase, ref, set } from "firebase/database";


const Signup = () => {
    const navigate=useNavigate()
     const db = getDatabase();
let [loading,setLoading]=useState(false)
    let [info, setInfo] = useState({
        name: "",
        email: "",
        password: "",

    });
    let [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    })
    let handleName = (e) => {
        setInfo((prev) => (
            {
                ...prev, name: e.target.value
            }
        ))
    };
    let handleEmail = (e) => {
        setInfo((prev) => (
            {
                ...prev, email: e.target.value
            }
        ))
    }
    let handlePassword = (e) => {
        setInfo((prev) => (
            {
                ...prev, password: e.target.value
            }
        ))
    };
    let handleSignup = () => {
        setLoading(true)
        if (!info.name) {
            setErrors((prev) => ({
                ...prev,
                name: "Name is required",
            }));
        }else if (!info.email) {
            setErrors((prev) => ({
                ...prev,
                email: "email is required",
            }));
        } else if (!info.password) {
            setErrors((prev) => ({
                ...prev,
                password: "password is required",
            }));
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info.email)){
            setErrors((prev) => ({
                ...prev,
                email: "Invalid email"
            }));
        }else{
            createUserWithEmailAndPassword(auth,info.email,info.password)
            .then((userCredential) => {
      const user = userCredential.user;
  sendEmailVerification(auth.currentUser)
  .then(() => {
updateProfile(auth.currentUser, {
  displayName:info.name ,photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
set(ref(db,"users/" + user.uid), {
  name:info.name,
  email:info.email,
  });
    
    console.log(user)

  setLoading(false)
  setTimeout(()=>{
      navigate("/signin")
    },2000)
  toast.success("Email send successfully")
});

});
  
  })
  .catch((error) => {
     setLoading(false);
    const errorCode = error.code;
    const errorMessage = error.message;

      setErrors((prev) => ({
                ...prev,
                name: errorMessage,
            }));
  });
        }
     
    };
    return (
        <div className="bg-white flex items-center md:h-screen p-4">
            <div className="w-full max-w-5xl mx-auto mt-5">
                <div className="grid md:grid-cols-2 gap-16 bg-slate-100 shadow w-full sm:p-8 p-6 relative">
                    <div>
                        <h1 className="text-[24px] font-bold text-center text-blue-500  ">ChattingApp</h1>
                        <div className="image object-center text-center">
                      <img src="https://i.imgur.com/WbQnbas.png" />
                       </div>
                        <div className="md:space-y-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                        data-original="#000000"
                                    />
                                </svg>
                                <h4 className="text-slate-900 text-base font-medium">
                                    Create Your Account
                                </h4>
                            </div>
                            <div className="flex items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                        data-original="#000000"
                                    />
                                </svg>
                                <h4 className="text-slate-900 text-base font-medium">
                                    Simple &amp; Secure Registration
                                </h4>
                            </div>
                            <div className="flex items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 bg-blue-600 fill-white rounded-full p-1 shrink-0"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                        data-original="#000000"
                                    />
                                </svg>
                                <h4 className="text-slate-900 text-base font-medium">
                                    Terms and Conditions Agreement
                                </h4>
                            </div>
                        </div>
                    </div>
                    <form className="md:max-w-sm w-full mx-auto">
                        <div className="mb-12">
                            <h1 className="text-slate-900 text-2xl font-medium">Create an Account</h1>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block">
                                    Name
                                </label>
                                <div className="relative flex items-center">
                                    <input onChange={handleName}
                                        name="name"
                                        type="text"
                                        required=""
                                        className={`bg-transparent w-full border-b
                                            ${errors.name ? " border-b-red-500 placeholder:text-red-500" : "border-b border-slate-500"}
                                            text-slate-900 text-sm pl-4 pr-10 py-2.5  focus:border-black outline-none`}
                                        placeholder="Enter name"
                                    />
                                    {/* {errors.name && 
                                    <p className="text-red-500 ">{errors.name}</p>
                                    } */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-4 h-4 absolute right-4"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx={10} cy={7} r={6} data-original="#000000" />
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block">
                                    Email Id
                                </label>
                                <div className="relative flex items-center">
                                    <input onChange={handleEmail}
                                        name="email"
                                        type="email"
                                        required=""
                                        className={`bg-transparent w-full border-b
                                            ${errors.name ? " border-b-red-500 placeholder:text-red-500" : "border-b border-slate-500"}
                                            text-slate-900 text-sm pl-4 pr-10 py-2.5  focus:border-black outline-none`}
                                        placeholder="Enter email"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-4 h-4 absolute right-4"
                                        viewBox="0 0 682.667 682.667"
                                    >
                                        <defs>
                                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                <path d="M0 512h512V0H0Z" data-original="#000000" />
                                            </clipPath>
                                        </defs>
                                        <g
                                            clipPath="url(#a)"
                                            transform="matrix(1.33 0 0 -1.33 0 682.667)"
                                        >
                                            <path
                                                fill="none"
                                                strokeMiterlimit={10}
                                                strokeWidth={40}
                                                d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                                data-original="#000000"
                                            />
                                            <path
                                                d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                                data-original="#000000"
                                            />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block">
                                    Password
                                </label>
                                <div className="relative flex items-center">
                                    <input onChange={handlePassword}
                                        name="password"
                                        type="password"
                                        required=""
                                        className={`bg-transparent w-full border-b
                                            ${errors.name ? " border-b-red-500 placeholder:text-red-500" : "border-b border-slate-500"}
                                            text-slate-900 text-sm pl-4 pr-10 py-2.5  focus:border-black outline-none`}
                                        placeholder="Enter password"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-4 h-4 absolute right-4 cursor-pointer"
                                        viewBox="0 0 128 128"
                                    >
                                        <path
                                            d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 shrink-0 rounded-sm"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-3 block text-sm text-slate-600"
                                >
                                    I accept the{" "}
                                    <a
                                        href="javascript:void(0);"
                                        className="text-blue-600 font-medium hover:underline ml-1"
                                    >
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>
                        </div>
                        <div className="mt-8">
                            <button onClick={handleSignup}
                                type="button"
                                className=" py-2.5 px-10 text-sm font-medium tracking-wide rounded-sm bg-blue-600 hover:bg-blue-700 text-white focus:outline-none cursor-pointer"
                            >
                                Register
                            </button>
                        </div>
                        <p className="text-sm text-slate-600 mt-6">
                            Already have an account?{" "}
                            <Link
                            to="/signin"
                                href="javascript:void(0);"
                                className="text-blue-600 font-medium hover:underline ml-1"
                            >
                                Login here
                            </Link>
                        </p>
                    </form>
                    <div className="divider absolute left-0 right-0 mx-auto w-1 h-full border-l border-slate-400 max-md:hidden" />
                </div>
            </div>
        </div>


    )
}
export default Signup