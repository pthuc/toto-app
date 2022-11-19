import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TaskType } from "../api/task.api"
import { RootState } from "./store"

const initialState = {
    assignedTasks: [] as TaskType[],
    assigningTasks: [] as TaskType[]
}

const { reducer, actions } = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        getTasksReducer: (state, action: PayloadAction<typeof initialState>) => {
            state.assignedTasks = action.payload?.assignedTasks
            state.assigningTasks = action.payload?.assigningTasks
        },
        setTaskReducer: (state, action: PayloadAction<TaskType>) => {
            state.assigningTasks.push(action.payload)
        }
    }
})

export default reducer
export const { getTasksReducer, setTaskReducer } = actions
export const taskSelector = (state: RootState) => state.todo