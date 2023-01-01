import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { IState } from '../interfaces/state'

const PublicRoutes = () => {
  const login = useSelector<IState>(state => state.auth.login)
  return (
    login ? <Navigate to='/'/> : <Outlet/>
  )
}

export default PublicRoutes