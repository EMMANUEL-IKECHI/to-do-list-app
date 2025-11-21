import React, { useEffect, useReducer} from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export const ACTION = {
  ADD_TASK: 'add-task',
  REMOVE_TASK: 'remove-task',
  TOGGLE_TASK: 'toggle-task',
  RESET: 'reset'
}

function newTask(task) {
  return {
    id: Date.now(),
    taskText: task,
    completed: false
  }
}

const reducer = (tasks, action) => {
  switch (action.type) {
    case ACTION.ADD_TASK:
      return [...tasks, newTask(action.payload)]

    case ACTION.REMOVE_TASK:
      return tasks.filter((task) => (
        task.id !== action.id
      ))

      case ACTION.TOGGLE_TASK:
        return tasks.map(task => {
          if (task.id === action.id) {
            return {...task, completed: !task.completed}
          } else return task
        })

      case ACTION.RESET:
        return []

      default:
        return tasks
  }
}

const App = () => {

  const [tasks, dispatch] = useReducer(
  reducer,
  [],
  () => {
    const savedTasks = localStorage.getItem("tasks");
    if (!savedTasks || savedTasks == "undefined") {
      return [];
    }
    try {
      return JSON.parse(savedTasks)
    } catch (e) {
      console.log(`Error: ${e}`)
      return []
    }
    // return savedTasks ? JSON.parse(savedTasks) : [];
  }
);


  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleReset = () => {
    dispatch({type: ACTION.RESET})
    localStorage.clear();
  };

  // Add a new task
  const addTasks = (task) => {
    if (!task.trim()) return;
    dispatch({type: ACTION.ADD_TASK, payload: task})
  };

  // Remove a task
  const removeTask = (id) => {
    dispatch({type: ACTION.REMOVE_TASK, id: id});
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    dispatch({type:ACTION.TOGGLE_TASK, id: id})
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center min-h-screen bg-gray-50 p-4">
      <section>
        <TodoInput addTasks={addTasks} />
      </section>
      <section className="w-full md:w-1/2 bg-white min-h-40 rounded flex flex-col justify-center items-center px-6 py-4 shadow">
        {tasks.length === 0 ? (
          <i>No tasks yet</i>
        ) : (
          <TodoList
            tasks={tasks}
            handleRemoveTask={removeTask}
            toggleComplete={toggleComplete}
          />
        )}

        {tasks.length === 0 ? (
          ""
        ) : (
          <button
            onClick={handleReset}
            className="bg-red-400 text-white h-fit m-4 px-4 py-2 hover:cursor-pointer hover:bg-blue-500 transition-all active:scale-90 "
          >
            Reset
          </button>
        )}
      </section>
    </div>
  );
};

export default App;
