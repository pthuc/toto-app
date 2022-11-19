import fetcher from "./fetcher"
import { Types } from 'mongoose'

const AUTH_URI = 'http://localhost:3001/api'

export type CommentType = {
    reaction: {
        like: string[],
        love: string[],
        dislike: string[],
        care: string[],
        laugh: string[]
    },
    commentor: string,
    comment: string,
    _id: Types.ObjectId
}

export type TaskType = {
    _id: Types.ObjectId,
    title: string,
    description: string,
    completed: boolean,
    assigner: string,
    assignee: string,
    comments: CommentType,
}

export const getTasks = async (postfix_url: string) => {
    try {
        const url = `${AUTH_URI}/${postfix_url}`
        const data: {
            assignedTasks: TaskType[],
            assigningTasks: TaskType[]
        } = await fetcher(url, 'get')
        return data
    } catch (error) {
        console.error(error)
    }
}

export const addTask = async (data: {title: string, description: string, assignee: string}) => {
    try {
        const url = `${AUTH_URI}/tasks`
        const res = await fetcher(url, 'post', data)
        return res
    } catch (error) {
        console.error(error)
    }
}