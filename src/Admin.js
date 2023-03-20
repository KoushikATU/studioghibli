import axios from 'axios'
import { useEffect, useState } from 'react';

function Admin() {
    const [data, setData]= useState([])

    // useEffect is a React Hook that runs once on component load.
    useEffect(()=>{
        // This makes an API call to retrieve the products data.
        axios.get('https://jei9r6lp78.execute-api.us-east-1.amazonaws.com/prod/products')
            .then(res =>{
                console.log(res)
                setData(res?.data?.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    // This displays the data in a table.
    return (
        <div>
            Table of Data:
            <table>
                <tr>
                    <th>name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Extra Requests</th>
                    <th>Actions</th>
                </tr>
                {
                    // This maps over the data retrieved from the API and displays it in the table.
                    data.length > 0 &&
                    data.map((item, index)=>{
                        // This is a helper function to delete a specific product.
                        const Delete = () =>{
                            console.log(item.username);
                            const deleteUsername = {
                                "username": item.username,
                            }
                            console.log(deleteUsername);
                            // This makes an API call to delete the specified product.
                            axios.post('https://jei9r6lp78.execute-api.us-east-1.amazonaws.com/prod/products',deleteUsername)
                            .then(res=>{
                              console.log(res.data) 
                            })
                            .catch(
                                err => {
                                    console.log(err)
                                })
                        }
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>Moving Castle Creations</td>
                                <td></td>
                                <td>
                                    <button onClick={Delete}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )    
}

export default Admin;
