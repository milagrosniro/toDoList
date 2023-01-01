import { lazy, LazyExoticComponent } from "react"

type JSXComponent = () => JSX.Element

export interface IRoutes{
    to: string ,
    path: string,
    Component: LazyExoticComponent<JSXComponent> | JSXComponent,
    name: string,
    private: boolean
}

const LazyLogin = lazy(()=> import(/* webpackChunckName: 'LazyLogin' */ '../pages/login/Login'))
const LazyHome = lazy(()=> import(/* webpackChunckName: 'LazyHome' */ '../pages/home/Home'))

export const routes : IRoutes[] = [
    {
        to: '/login' ,
        path: '/login',
        Component: LazyLogin,
        name: 'login',
        private: false
    },
    {
        to: '/home',
        path:'/home',
        Component: LazyHome,
        name:'home',
        private: true,//accede solo cuando esta logueado
    },
]
