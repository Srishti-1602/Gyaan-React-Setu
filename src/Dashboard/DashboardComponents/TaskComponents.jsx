import React from 'react'
import '../dashboard.css'
import { useState } from 'react'

function TaskComponents () {
  const [tasks, setTasks] = useState([
    'Go to Gym',
    'Read Articles on IncludeHelp',
    'Learn JavaScript'
  ])
  const [newTask, setNewTask] = useState('')

  function handleInputChange (event) {
    setNewTask(event.target.value)
  }

  function handleAddTask () {
    if (newTask !== '') {
      setTasks([...tasks, newTask])
      setNewTask('')
    }
  }

  function handleRemoveTask () {
    const newTasks = tasks.filter(
      (task, index) => !document.getElementById(`check${index}`).checked
    )
    setTasks(newTasks)
  }

  return (
    // <div className='row row-cols-1 row-cols-md-4 mb-3 text-center upcoming-row'>
    // <div className='col-up'>
    <div className='card mb-4 rounded-3 shadow-sm-task'>
      <div className='card-body-task'>
        <h1 className='card-title-task pricing-card-title upcomming-title'>
          Upcoming Tasks
        </h1>
        <div className='task-but'>
          <button type='button' className='taskOperate' onClick={handleAddTask}>
            Add Task
          </button>
          <button
            type='button'
            className='taskOperate'
            onClick={handleRemoveTask}
          >
            Remove Task
          </button>
        </div>
        <input
          type='text'
          name=''
          id='input'
          className='task-input'
          placeholder='Create a task'
          value={newTask}
          onChange={handleInputChange}
        />

        {tasks.map((task, index) => (
          <li className='mycheck' key={index}>
            <input type='checkbox' id={`check${index}`} />
            <label htmlFor={`check${index}`}>{task}</label>
          </li>
        ))}
      </div>
    </div>
    //  </div>
    //  </div>
    //  <div className="col-up">
    //           <div className="card-overview mb-4 rounded-3 shadow-sm">
    //               <div className="card-body-overview">
    //                   <h1 className="card-title-task pricing-card-title overview-title">Overview</h1>
    //                   <ul className="list-unstyled-overview mt-3 mb-4">
    //                       {tasks.map((task, index) => (
    //                           <li className="over" key={index}>{task}</li>
    //                       ))}
    //                   </ul>
    //               </div>
    //           </div>
    //       </div>
  )
}

export default TaskComponents
