import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardContent, IconButton, Input, Tooltip } from '@mui/material';
import { Add, Close, Save } from '@mui/icons-material';
import { useState } from 'react';
import styles from './modalAddTodo.module.css'
import { useAppDispatch } from '../../hooks';
import {addTodo} from '../../redux/slices/todosSlice'
import { ITodo } from '../../interfaces/state';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #f5f5f5',
  boxShadow: 24,
  p: 4,
  borderRadius:'8px'
};

export const ModalAddToDo = () => {




  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [todoValue, setTodoValue] = useState<ITodo>(
    {userId: 1,
    id: 0,
    title: '',
    completed: false}
    )
  const dispatch = useAppDispatch()

  const addNewTodo = () => {
    const id = Math.random()
    dispatch(addTodo({...todoValue, id}))
    handleClose()
    setTodoValue( {userId: 1,
        id: 0,
        title: '',
        completed: false})
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTodoValue({...todoValue, title: e.target.value})
  }

  return (
    <div>
      <Tooltip title="Agregar tarea">
              <Button
                onClick={handleOpen}
                variant="outlined"
                color="error"
                endIcon={<Add color={"error"} />}
              >
                Add To Do
              </Button>
            </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className={styles.containerBtn}>
            <Tooltip title="Cerrar">
          <IconButton onClick={()=> setOpen(false)}>
            <Close
              sx={{
                "&:hover": { color: "green" },
              }}
            />
          </IconButton>
        </Tooltip>
            </div>
        <Typography id="modal-modal-title" variant="subtitle2" component="h6" sx={{color:'rgba(0, 0, 0, 0.54)', marginLeft:'16px'}}>
            Escribe tu tarea...
          </Typography>
        <Card
      sx={{
        margin: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent >
        <Input
          value={todoValue.title}
          onChange={(e)=>handleChange(e)}
          sx={{
            border: "none",
            width:'100%'
          }}
        />
      </CardContent>
      <div>
        <Tooltip title="Guardar tarea">
          <IconButton onClick={addNewTodo}>
            <Save
              sx={{
                "&:hover": { color: "green" },
              }}
            />
          </IconButton>
        </Tooltip>

      </div>
    </Card>
        </Box>
      </Modal>
    </div>
  );
}