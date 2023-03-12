import axios from 'axios'
import { useEffect, useState } from 'react';

function Admin() {
    const [data, setData]= useState([])
    useEffect(()=>{
    axios.get('https://jei9r6lp78.execute-api.us-east-1.amazonaws.com/prod/products')
        .then(res =>{
            console.log(res.data)
            setData(res?.data?.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

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
        data.length > 0 &&
        data.map((item, index)=>{
          return (
            <tr>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>none</td>
                <td>none</td>
                
                <td>
                    <button>Edit</button>

                    <button>Delete</button>
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