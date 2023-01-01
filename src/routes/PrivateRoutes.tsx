import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'
import { IState } from '../interfaces/state'
import Home from '../pages/home/Home'


const PrivateRoutes = () => {
  const login = useSelector<IState>(state => state.auth.login)
  return (
    !login ?
    <Navigate to="/login"/> :
    <Home/>
  )
}

export default PrivateRoutes