import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios"
import { serverURL } from '../enum'
import { Context } from '../main'

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(`${serverURL}/users/register`, {
                name, email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            toast.success(data.message);
            setIsAuthenticated(true)
            setName("")
            setEmail("")
            setPassword("")
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setIsAuthenticated(false)
            setLoading(false)
        }
    }

    if (isAuthenticated) return <Navigate to={"/"} />

    const btnClassName = 'w-full py-2 bg-white font-semibold text-xl text-black mt-10 rounded-md'
    const inputClassName = 'py-2 px-4 text-gray-600 w-full focus:outline-none rounded-md'

    return (
        <div className='h-[90vh] flex justify-center items-center px-4 md:px-0'>
            <section className='w-[400px] bg-gray-900 flex flex-col items-center p-10 rounded-md'>
                <form
                    onSubmit={submitHandler}
                    className='flex flex-col gap-6 items-center w-full mt-6'>
                    <input
                        className={`${inputClassName}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="name"
                        id="name"
                        placeholder='Name'
                        required
                    />
                    <input
                        className={`${inputClassName}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Email'
                        required
                    />

                    <input
                        className={`${inputClassName}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Password'
                        required
                    />
                    <button disabled={loading} type='submit' className={`${btnClassName}`}>Register</button>
                </form>
                <div className='flex gap-2 items-center mt-4'>
                    <span className='my-4'>Have an account?</span>
                    <Link to={"/login"} className='font-medium underline'>Login</Link>
                </div>
            </section>
        </div>
    )
}

export default Register