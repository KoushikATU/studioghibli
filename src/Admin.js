import axios from 'axios'
import { useEffect, useState } from 'react';

function Admin() {
    const [data, setData]= useState([])
    useEffect(()=>{
    axios.get('https://jei9r6lp78.execute-api.us-east-1.amazonaws.com/prod/products')
        .then(res =>{
            console.log(res)
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
            
            
            
            const Delete = () =>{
                console.log(item.username);
                
                const deleteUsername = {
                    "username": item.username,
                    
                    }
                console.log(deleteUsername);

                axios.post('https://jei9r6lp78.execute-api.us-east-1.amazonaws.com/prod/products',deleteUsername)
                .then(res=>{
                  console.log(res.data) 
                })
                .catch(
                    err => {
                        console.log(err)
                    })

                // )
                // axios.get('https://jei9r6lp78.execute-api.us-east-1.amazonaws.com/prod/products')
                // .then(res =>{
                //  console.log(res)
                // //setData(res?.data?.data)
                //  })
                //  .catch(err => {
                // console.log(err)
                //  })
                
        
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