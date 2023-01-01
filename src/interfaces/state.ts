import { IUser } from "./profile"

export interface IState{
    auth: IAuthState,
    todos: ITodos
  }

export interface IAuthState{
    user: IUser,
    login: boolean
  }
export interface ITodos{
todos: ITodo[] | undefined,
loading: boolean
}
 export interface ITodo{
    userId: number,
    id: number,
    title: string,
    completed: boolean
}
