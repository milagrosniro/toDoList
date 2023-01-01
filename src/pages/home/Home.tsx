import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { IState } from "../../interfaces/state";
import { getAll } from "../../redux/thunks";
import styles from "./home.module.css";
import NavBar from "../../components/navBar/NavBar";
import BoxTodos from "../../components/boxTodos/BoxTodos";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const dispatch = useAppDispatch();
  const allTodos = useSelector<IState>((state) => state.todos.todos);

  useEffect(()=>{
    dispatch(getAll())
  },[dispatch])

  return (
    <div>
      <NavBar/>
    <div className={styles.container}>
      {
        (Array.isArray(allTodos) && allTodos.length > 0) ?
        <>
     <BoxTodos title={'To Do'} data={allTodos} complete={false}/>
     <BoxTodos title={'Done'} data={allTodos} complete={true}/>
        </> : <CircularProgress/>
      }
    </div>
    </div>
  );
};

export default Home;
