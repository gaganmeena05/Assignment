import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IPost } from "../types"
import { Component2 } from "./Component2";
import {useNavigate} from 'react-router-dom'

function Component1() {
    let navigate=useNavigate()
    const [rows, setrows] = useState<IPost[]>([])
    
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 80,
        },
        {
            field: "userId",
            headerName: "User ID",
            width: 80,
        },
        {
            field: "title",
            headerName: "Title",
            flex: 1,
        },
        {
            field: "body",
            headerName: "Body",
            flex: 1,
        }
    ];

    useEffect(() => {
        //iife to retreive data
        if(localStorage.getItem("userData")){
            (async () => {
                const res = await fetch("https://jsonplaceholder.typicode.com/posts")
                const data = await res.json() as IPost[]
                setrows(data)
            })();
        }else{
            navigate('/login') //Navigating to the login page
        }
        
    }, [])

    return (
        <div>
        <Box sx={{ width: "80dvw" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                autoHeight
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
                />
        </Box>
        <Component2/>
        </div>
    )
}

export { Component1 }