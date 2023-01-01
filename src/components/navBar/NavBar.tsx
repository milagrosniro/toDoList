import { AccountCircle } from '@mui/icons-material'
import { AppBar, Button, Grid, Toolbar, Tooltip} from '@mui/material'
import { useAppDispatch } from '../../hooks'
import { logOut } from '../../redux/slices/authSlice'

const NavBar = () => {
    const dispatch = useAppDispatch()
    const handleOnClick = () =>{
        dispatch(logOut())
    }
  return (
    <div>
          <AppBar
          position="static"
        >
          <Toolbar>
            <Grid container sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title="Cerrar sesion">
              <Button
                onClick={handleOnClick}
                variant="outlined"
                endIcon={<AccountCircle />}
                sx={{color:'white'}}
              >
               Log Out
              </Button>
            </Tooltip>
            </Grid>
          </Toolbar>
        </AppBar>
    </div>
  )
}

export default NavBar