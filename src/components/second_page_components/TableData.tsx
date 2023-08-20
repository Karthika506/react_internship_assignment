import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
const TableData: React.FC = () => {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data: Post[]) => setPosts(data))
            .catch((error) => console.error('Error fetching data: ', error));
    }, []);

    return (
        <div className="table" style={{ overflowX: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h3>API Data</h3> <br></br>
            <div style={{ maxHeight: '500px', maxWidth: '900px', overflowY: 'scroll' }}>
                <TableContainer component={Paper} style={{backgroundColor: '#cccccce3'}}>
                    <Table style={{margin: 'auto'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Body</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts.map((post) =>(
                                <TableRow key={post.id}>
                                    <TableCell>{post.id}</TableCell>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>{post.body}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default TableData;