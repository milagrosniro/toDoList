import {
  Button,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks";
import { setCredentials } from '../../redux/slices/authSlice';
import MaterialTextField from "../inputs/MaterialTextField";

import styles from "./formLogin.module.css";
import { useSelector} from 'react-redux';
import { IState } from "../../interfaces/state";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const login = useSelector<IState>(state => state.auth.login)

  const loginSchema = Yup.object().shape({
    email: Yup.string().required("Ingrese email"),
    password: Yup.string().required("La contraseña no puede quedar vacía"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(setCredentials({email:values.email, password:values.password}))
      window.sessionStorage.setItem("token", values.password);
      login ?? navigate('/home')
    },
  });

  return (
    <div className={styles.container}>
      <Box
        sx={{
          width: 300,
          height: 300,
          padding: "1rem",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppBar
          position="static"
          sx={{ borderTopRightRadius: "8px", borderTopLeftRadius: "8px" }}
        >
          <Toolbar>
            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              <Grid item>
                <Typography variant="h6">Log In</Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
          }}
        >
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Paper
                variant="outlined"
                elevation={0}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid item sx={{ padding: "1rem" }}>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <div className={styles.label}>Ingrese su email : </div>
                        <MaterialTextField
                          label="Email"
                          name="email"
                          type="text"
                          value={formik.values.email}
                          handleChange={formik.handleChange}
                          error={Boolean(formik.errors.email)}
                          helperText={
                            formik.touched.email
                              ? formik.errors.email
                              : undefined
                          }
                        />
                      </Grid>
                      <Grid item>
                        <div className={styles.label}>
                          Ingrese su contaseña :{" "}
                        </div>
                        <MaterialTextField
                          label="Contraseña"
                          name="password"
                          type="password"
                          value={formik.values.password}
                          handleChange={formik.handleChange}
                          error={Boolean(formik.errors.password)}
                          helperText={
                            formik.touched.password
                              ? formik.errors.password
                              : undefined
                          }
                        />
                      </Grid>
                      <div>
                        <Grid
                          item
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "1rem",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className="button-block"
                          >
                            INGRESAR
                          </Button>
                        </Grid>
                      </div>
                    </Grid>
                  </form>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default FormLogin;
