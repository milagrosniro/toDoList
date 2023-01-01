import React, { useState } from 'react'
import { ModalAddToDo } from "../../components/modalAddToDo/ModalAddToDo";
import {
    Grid,
    AppBar,
    Typography,
    Toolbar,
    Box,
    TablePagination,
    CircularProgress
  } from "@mui/material";
import { CardTodo } from '../cardTodo/CardTodo';
import { useEffect } from 'react';

  export interface IPropsBoxTodos{
    title: string,
    data: any,
    complete: boolean
  }

const BoxTodos = ({title, data, complete}:IPropsBoxTodos) => {

    const [dataFilter, setDataFilter] = useState<any[]>([])
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    useEffect(()=>{
        if(Array.isArray(data) && data.length > 0){
            let filteredData :any[]
            filteredData = data.filter(todo => todo.completed === complete)
            setDataFilter(filteredData)
        }

    },[data])
  return (
    <Box
        sx={{
          width: "32%",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "1px 2px 55px 1px rgba(0,0,0,0.58)",
          margin:"1rem"
        }}
      >
        {dataFilter.length > 0 ?
        <>
        <AppBar
          position="static"
          sx={{
            borderTopRightRadius: "8px",
            borderTopLeftRadius: "8px",
            height: "10%",
            backgroundColor: !complete ? "#ff0000c7": "#008000ab",
          }}
        >
          <Toolbar>
            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              <Grid
                item
                width={"60%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography variant="h5">{title}</Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            maxHeight: 500,
            backgroundColor:'#ffffff8f',
            borderBottomLeftRadius:'8px',
            borderBottomRightRadius:'8px',
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: 5
              },
              "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#f5f5f5",
              borderRadius: 2
              }

          }}
        >
          <Grid
            item
            sx={{ padding: "1rem", margin: "1rem"}}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {

            }
           {!complete && <ModalAddToDo/>}
            {
              dataFilter.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage).map((todo) => {
                return  <CardTodo key={todo.id} todo={todo} complete={complete}/>
              })}
          </Grid>
        </Grid>
        <TablePagination
      component="div"
      count={20}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    /> </>: <CircularProgress/>
            }
      </Box>
  )
}

export default BoxTodos