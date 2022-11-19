'use client'
import React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"
import { getTasks, addTask, TaskType } from "../../api/task.api"
import { statusSelector } from "../../state.management/auth.slice"
import { getTasksReducer, setTaskReducer, taskSelector } from "../../state.management/task.slice"

export default function TaskPage() {
    const { data } = useSWR('tasks', getTasks)
    const dispatch = useDispatch()
    const tasks = useSelector(taskSelector)
    const status = useSelector(statusSelector)
    
    useEffect(() => {
        if (data) {
            dispatch(getTasksReducer(data))
        }
    }, [dispatch, data])

    return status === 'invalid'
        ? (<div><p>Loading</p></div>)
        : (
        <div className="Container flex justify-between">
            <div className="flex-col bg-gray-100">
                <Task data={tasks?.assignedTasks} name='Assigned Tasks' />
                <Task data={tasks?.assigningTasks} name='Assigning Tasks' />
            </div>
            <TaskForm />
        </div>
    )
}


function Task({ data, name }: { data: TaskType[] | undefined, name: string}) {
    return (
        <div className="border-stone-600 border-1">
            <h1 className="font-bold text-2xl">{name}</h1>
        {
            data?.map(task => (
                <div key={task._id.toString()}>
                    <h5 className="text-lg">{task.title}</h5>
                    <div>
                        <p>{task.description}</p>
                    </div>
                </div>
            ))
        }
        </div>
    )
}

function TaskForm() {
    const [title, setTitle] = useState('')
    const [assignee, setAssignee] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()

    
    return (
        <div>
            <label>
                Title: <input className="border-2 rounded-full" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label><br />
            <label>
                Assignee: <input className="border-2 rounded-full" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
            </label><br />
            <label>
                Description: <input className="border-2 rounded-full" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label><br />
            <button className="bg-red-500 text-white rounded-full p-2" onClick={() => {
                addTask({title, description, assignee})
                    .then((data) => {
                        dispatch(setTaskReducer(data))
                    })
            }}>Add Task</button>
        </div>
    )

}