import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Grid,
  Table,
  Button,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function Book(){
    
    let formValues = {
        bookname: '',
        author: '',
        page: '',
        publish: '',
        error: {
            bookname: '',
            author: '',
            page: '',
            publish: '',
        },
    };

    const [formData, setFormData] = useState(formValues);

    const [userData, setUserData] = useState([]);

    useEffect(() => {   

        async function getData() {

            const response = await axios.get("https://632050349f82827dcf29ba4b.mockapi.io/book"); 

            setUserData(response.data);

        }

        getData();

    }, []);      

    //To handle onChange event

    const handleChange = (e) => {

        let error = { ...formData.error };

        if (e.target.value === '') {

            error[e.target.name] = `${e.target.name} is Required`;

        } else {

            error[e.target.name] = '';

        }

        setFormData({ ...formData, [e.target.name]: e.target.value, error });

    };

    //To handle Edit button

    const onPopulateData = (id) => {  

        const selectedData = userData.filter((row) => row.id === id)[0];

        setFormData({

            ...formData,
            ...selectedData,

        });

    };

    //To handle Delete button

    const handleDelete = async (id) => {

        const response = await axios.delete(`https://632050349f82827dcf29ba4b.mockapi.io/book/${id}`);

        const user = userData.filter((row) => row.id !== response.data.id);

        console.log(response);

        setUserData(user);

    }

    // To handle submit button

    const handleSubmit = async (e) => {

        e.preventDefault();

        const errKeys = Object.keys(formData).filter((key) => {

            if (formData[key] === "" && key !== "error" && key !== "id") {

                return key;

            }

        });

        if (errKeys.length >= 1) {

            alert("Please Fill All Values");

        } else {

            if (formData.id) {

                const response = await axios.put(`https://632050349f82827dcf29ba4b.mockapi.io/book/${formData.id}`,

                    {
                        bookname: formData.bookname,
                        author: formData.author,
                        page: formData.page,
                        publish: formData.publish,
                    }

                );

                let users = [...userData];

                let index = users.findIndex((row) => row.id === response.data.id);

                users[index] = response.data;

                setUserData(users);

            } else {

                const response = await axios.post('https://632050349f82827dcf29ba4b.mockapi.io/book',

                    {
                        bookname: formData.bookname,
                        author: formData.author,
                        page: formData.page,
                        publish: formData.publish,
                    }

                );

                setUserData([...userData, response.data]);

            }

            setFormData(formValues);

        }

    };

    return(
        <div style={{ padding: "10px", color: 'black' }}>

            <h2>Book Register Form</h2>

            <Box sx={{ flexGrow: 1 }}>

                <Grid container spacing={2}>

                    <Grid item xs={4}>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '30ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={(e) => handleSubmit(e)}
                        >

                            <TextField
                                id="bookname"
                                label="Book Name"
                                variant="outlined"
                                value={formData.bookname}
                                name="bookname"
                                onChange={(e) => handleChange(e)} />

                            <br />

                            <span style={{ color: 'red' }}>{formData.error.bookname}</span><br />

                            <TextField
                                id="author"
                                label="Author"
                                variant="outlined"
                                value={formData.author}
                                name="author"
                                onChange={(e) => handleChange(e)} />

                            <br />

                            <span style={{ color: 'red' }}>{formData.error.author}</span><br />

                            <TextField
                                id="page"
                                type="number"
                                label="No of Pages"
                                variant="outlined"
                                value={formData.page}
                                name="page"
                                onChange={(e) => handleChange(e)} />

                            <br />

                            <span style={{ color: 'red' }}>{formData.error.page}</span>

                            <br />

                            <TextField
                                id="publish"
                                label="Published By"
                                variant="outlined"
                                value={formData.publish}
                                name="publish"
                                onChange={(e) => handleChange(e)} />

                            <br />

                            <span style={{ color: 'red' }}>{formData.error.publish}</span><br />

                            <Button variant="contained" type="submit">Add</Button>

                        </Box>

                    </Grid>

                    <Grid item xs={8}>

                        <h2 style={{ width: '40%', marginTop: '20px' }}>Books List</h2>

                        <TableContainer component={Paper}>

                            <Table sx={{ width: 860 }} aria-label="simple table">

                                <TableHead>

                                    <TableRow>

                                        <TableCell><b>Id</b></TableCell>

                                        <TableCell align="center"><b>Book Name</b></TableCell>

                                        <TableCell align="center"><b>Author</b></TableCell>

                                        <TableCell align="center"><b>No of Pages</b></TableCell>

                                        <TableCell align="center"><b>Published By</b></TableCell>

                                        <TableCell align="center"><b>Action</b></TableCell>

                                    </TableRow>

                                </TableHead>

                                <TableBody>
                                    {userData.map((row) => (
                                        <TableRow
                                            key={row.id}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.id}
                                            </TableCell>

                                            <TableCell align="center">{row.bookname}</TableCell>

                                            <TableCell align="center">{row.author}</TableCell>

                                            <TableCell align="center">{row.page}</TableCell>

                                            <TableCell align="center">{row.publish}</TableCell>

                                            <TableCell align="center">

                                                <Button variant="text" onClick={() => onPopulateData(row.id)}>

                                                    Edit

                                                </Button>

                                                <br />

                                                <Button variant="text" onClick={() => handleDelete(row.id)}>
                                                    
                                                    Delete
                                                
                                                </Button>

                                            </TableCell>

                                        </TableRow>

                                    ))}

                                </TableBody>

                            </Table>

                        </TableContainer>

                    </Grid>

                </Grid>

            </Box>

        </div>
    );
}

export default Book;