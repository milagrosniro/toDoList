import { Delete, DoneAll, Edit, Save } from "@mui/icons-material";
import {
  Card,
  CardContent,
  IconButton,
  Tooltip
} from "@mui/material";
import Input from "@mui/material/Input";
import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { ITodo } from "../../interfaces/state";
import { deleteTodo , editTodo, todoDone} from "../../redux/slices";

import styles from "./cardTodo.module.css";

export interface IPropsCardTodo {
  todo: ITodo;
  complete: boolean
}

export const CardTodo = ({ todo, complete }: IPropsCardTodo) => {
  const [todoValue, setTodoValue] = useState<string>(todo.title)
  const [disabledInput, setDisabledInput] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTodoValue(e.target.value)
  }

  const handleEditTodo = () => {
    setDisabledInput(false)
  }

  const saveEdit = () =>{
    dispatch(editTodo({id:todo.id, todoValue}))
    setDisabledInput(true)
  }

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
  }

  const handleDone = () => {
    dispatch(todoDone(todo.id))
  }

  return (
    <Card
      key={todo.id}
      sx={{
        margin: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Input
          value={todoValue}
          disabled={disabledInput}
          onChange={(e)=>handleChange(e)}
          sx={{
            backgroundColor: "#fafafa42",
            border: "none",
          }}
        />
      </CardContent>
      <div className={styles.iconsContainer}>
        {!complete &&
        <Tooltip title="Terminar tarea">
          <IconButton onClick={handleDone}>
            <DoneAll
              sx={{
                "&:hover": { color: "green" },
              }}
            />
          </IconButton>
        </Tooltip>
        }
        <Tooltip title="Eliminar">
          <IconButton onClick={handleDelete}>
            <Delete
              sx={{
                "&:hover": { color: "red" },
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">

          <IconButton onClick={disabledInput ? handleEditTodo : saveEdit}>
            {
              disabledInput ?  <Edit
              sx={{
                "&:hover": { color: "blue" },
              }}
            />:
            <Save sx={{
              "&:hover": { color: "blue" },
            }}/>
            }

          </IconButton>
        </Tooltip>
      </div>
    </Card>
  );
};
