import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { routes } from './routes';
import { CircularProgress } from '@mui/material';

const Navigation = () => {
  return (
    <BrowserRouter>
    <Suspense fallback={<CircularProgress/>}>
        <Routes>
            <Route path='/' element={<PrivateRoutes/>}>
              {routes.map(route => route.private && <Route path={route.path} key={route.path} element={<route.Component/>}/>
              )}

              <Route path={'/*'} element={<Navigate to={'/error404'} replace/>}/>

            </Route>
            <Route path="/" element={<PublicRoutes />}>
                <Route path="/login" element={<Login />} />
              </Route>
        </Routes>

    </Suspense>
    </BrowserRouter>
  )
}

export default Navigation