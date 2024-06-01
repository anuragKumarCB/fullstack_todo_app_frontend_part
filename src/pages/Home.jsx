import React, { useContext, useEffect, useState } from 'react'
import TodoItem from '../components/TodoItem'
import { Context } from '../main'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { serverURL } from '../enum'
import toast from 'react-hot-toast'

const Home = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tasks, setTasks] = useState([])


    const { isAuthenticated, loading } = useContext(Context)

    useEffect(() => {
        fetchTasks()
    }, [])

    const addTask = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post(`${serverURL}/tasks/newtask`, {
                title, description
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            toast.success(data.message)
            setTitle("")
            setDescription("")
            // Fetch the updated tasks list after adding a new task
            fetchTasks()

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get(`${serverURL}/tasks/alltask`, {
                withCredentials: true
            })
            setTasks(data.allTask)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    const taskStatusHandler = async (id) => {
        try {
            const { data } = await axios.put(`${serverURL}/tasks/taskstatus/${id}`, {}, {
                withCredentials: true
            })
            toast.success(data.message)
            fetchTasks()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const deleteTaskHandler = async (id) => {
        try {
            const { data } = await axios.delete(`${serverURL}/tasks/delete/${id}`, {
                withCredentials: true
            })
            toast.success(data.message)
            fetchTasks()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    if (!isAuthenticated) return <Navigate to={"/login"} />

    const btnClassName = 'w-full py-2 bg-white font-semibold text-xl text-black mt-10 rounded-md'
    const inputClassName = 'py-2 px-4 text-gray-600 w-full focus:outline-none rounded-md'

    return (
        <div className='w-[900px] mx-auto h-[90vh] mt-2'>
            <section className='w-full bg-gray-900 flex flex-col items-center p-10 rounded-md'>
                <form
                    onSubmit={addTask}
                    className='flex flex-col gap-6 items-center w-full mt-6'>
                    <input
                        className={`${inputClassName}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        name="title"
                        id="title"
                        placeholder='Title'
                        required
                    />
                    <textarea
                        className={`${inputClassName} h-[200px]`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        id="description"
                        placeholder='Description'
                    >
                    </textarea>
                    <button type='submit' className={`${btnClassName}`}>Add Task</button>
                </form>
            </section>
            {
                tasks && tasks.map((task) => (
                    <TodoItem
                        key={task._id}
                        id={task._id}
                        title={task.title}
                        description={task.description}
                        isCompleted={task.isCompleted}
                        taskStatusHandler={taskStatusHandler}
                        deleteTaskHandler={deleteTaskHandler}
                    />
                ))
            }
        </div>
    )
}

export default Home