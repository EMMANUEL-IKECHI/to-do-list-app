import React from 'react'
import useInput from '../hooks/useInput'

const TodoInput = ({ addTasks }) => {

    //iniitializing the useInput hook
    const taskInput = useInput('');
    
    //submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!taskInput.value.trim()) return;
        addTasks(taskInput.value);
        taskInput.reset();        
    }

  return (
    <form method='POST' className="w-full max-w-xl bg-white min-h-40 rounded flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-6 py-4 shadow" onSubmit={handleSubmit} >
        <input 
            type="text" 
            name="task" 
            id="task" 
            placeholder='Task to complete' 
            onChange={taskInput.handleChange} 
            value={taskInput.value} 
            className="w-full bg-gray-100 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-blue-400 transition"
         />
        <input 
            type="submit" 
            value="Add task" 
            className='bg-blue-400 text-white h-fit px-4 py-2 hover:cursor-pointer hover:bg-blue-500 transition-all active:scale-90 '
        />
    </form>
  )
}

export default TodoInput