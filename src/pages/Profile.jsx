import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { serverURL } from '../enum'

const Profile = () => {

    const { user, loading, isAuthenticated, setUser, setIsAuthenticated, setLoading } = useContext(Context)

    useEffect(() => {
        setLoading(true)
        axios.get(`${serverURL}/users/myprofile`, {
            withCredentials: true
        }).then((res) => {
            setUser(res.data.userData)
            setIsAuthenticated(true)
            setLoading(false)
        }).catch((error) => {
            setUser({})
            setIsAuthenticated(false)
            setLoading(false)
        })

    }, [])


    if (!isAuthenticated) return <Navigate to={"/login"} />
    const spanClassName = 'flex gap-4 items-baseline'
    return (
        <div className='h-[90vh] flex justify-center items-center px-4 md:px-0'>
            <section className='w-[400px] bg-gray-900 flex flex-col justify-start gap-4 p-10 rounded-md font-semibold'>
                <span className={`${spanClassName}`}>Name: <span className='text-2xl'>{user?.name}</span></span>
                <span className={`${spanClassName}`}>Email: <span className='text-lg'>{user?.email}</span></span>
            </section>
        </div>
    )
}

export default Profile