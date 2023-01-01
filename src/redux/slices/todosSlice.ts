import { createSlice } from "@reduxjs/toolkit"
import { ITodo } from "../../interfaces/state"
import {getAll} from '../thunks/todos'

export interface IStateTodos {
    todos: ITodo[],
    loading: boolean
}

const initialState : IStateTodos = {
   todos: [],
   loading: true
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state:IStateTodos, action)=>{
            console.log('add')
             state.todos?.unshift(action.payload)
        },
        getAllTodos: (state: IStateTodos, action)=>{
            state.todos = action.payload
        },
        deleteTodo: (state, action)=>{
            const newState = state.todos.filter(todo => todo.id !== action.payload)
            state.todos = newState
        },
        editTodo: (state, action)=>{
           const newState = state.todos.map(todo => {
                if (todo.id === action.payload.id) {todo.title = action.payload.todoValue}
                return todo
            });
            state.todos = newState
        },
        todoDone: (state, action) =>{
            const newState = state.todos.map(todo => {
                if (todo.id === action.payload) {todo.completed = true}
                return todo
            });
            state.todos = newState
        }

    },
    extraReducers: (builder) =>{
        builder.addCase(getAll.pending, (state, {payload})=>{
            state.loading= true
        })
        .addCase(getAll.rejected, (state, { payload }) => {
            state.loading = false
        })
        .addCase(getAll.fulfilled, (state, {payload})=>{
             state.todos = payload
             state.loading = false

        })
    }
})

export const {getAllTodos, deleteTodo, editTodo, todoDone, addTodo} = todosSlice.actions
export const allTodos = (state : IStateTodos) => state.todos


