import React from 'react'
import { Trash2 } from 'lucide-react'

const TodoItem = ({ task, handleRemoveTask, toggleComplete }) => {
  return (
    <div className="bg-gray-50 px-4 py-2 flex justify-between items-center rounded shadow-sm">
      <div className={`flex items-center gap-2 ${task.completed ? 'line-through text-gray-400' : ''} `}>
        <input type="checkbox" name='input-box' checked={task.completed} onChange={() => toggleComplete(task.id)}/> 
        <span>{task.taskText}</span>
      </div>
      <Trash2
        className="text-red-500 hover:text-red-700 transition cursor-pointer"
        onClick={() => handleRemoveTask(task.id)}
      />
    </div>
  )
}

export default TodoItem
