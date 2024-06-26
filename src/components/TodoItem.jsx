import toast from 'react-hot-toast'

const TodoItem = ({ id, title, description, isCompleted, taskStatusHandler, deleteTaskHandler }) => {



    const btnClassName = 'px-4 py-2 bg-white font-semibold text-xl text-black rounded-md'

    return (
        <div className='conatiner max-w-[900px] mx-auto mt-6'>
            <section className='w-full bg-gray-900 flex flex-col md:flex-row md:justify-between gap-4 md:gap-14 md:items-center py-4 px-10 rounded-md'>
                <div className='flex flex-col gap-2'>
                    <span className='text-white'>{title}something</span>
                    <span className='text-gray-400'>{description}something</span>
                </div>
                <div className='flex md:gap-4 justify-between'>
                    <input
                        className='w-[25px]'
                        onChange={() => taskStatusHandler(id)}
                        checked={isCompleted}
                        type="checkbox"
                        name=""
                        id="" />
                    <button
                        className={`${btnClassName}`}
                        onClick={() => deleteTaskHandler(id)}>
                        Delete
                    </button>
                </div>
            </section>
        </div>
    )
}

export default TodoItem
