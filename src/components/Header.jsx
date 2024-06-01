import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context } from '../main'
import toast from 'react-hot-toast'
import axios from "axios"
import { serverURL } from '../enum'


const Header = () => {

    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)

    const logoutHandler = async (e) => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${serverURL}/users/logout`, {
                withCredentials: true
            })
            toast.success(data.message);
            setIsAuthenticated(false)
            setLoading(false)

        } catch (error) {
            toast.error(error.response.data.message)
            setIsAuthenticated(true)
            setLoading(false)

        }
    }
    const btnClassName = 'border px-4 py-2 hover:bg-gray-800'
    const linkClassName = 'px-2 py-1 lg:px-4 lg:py-2 hover:bg-gray-800'
    return (
        <header className='h-[80px] bg-gray-900'>
            <nav className='container px-2 md:px-0 mx-auto h-full flex items-center justify-between'>
                <Link to={"/"}><h2 className='text-2xl lg:text-4xl'>TODO APP</h2></Link>
                <ul className='flex gap-1 lg:gap-4 items-center'>
                    <Link to={"/"} className={`${linkClassName}`}>HOME</Link>
                    <Link to={"/profile"} className={`${linkClassName}`}>PROFILE</Link>

                    {
                        isAuthenticated ? <button
                            disabled={loading}
                            onClick={logoutHandler}
                            className={`${btnClassName}`}>
                            LOGOUT
                        </button> :
                            <Link to={"/login"} className={`${btnClassName}`}>LOGIN</Link>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header