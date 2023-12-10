import React, { useEffect, useState,Fragment} from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import NavBar from "../NavBar";

const User = (props) => {
    const [data, setData] = useState([]);
   
  useEffect(() => {
    axios
    .get("http://localhost:9000/users")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function deleteUser(id){
    axios.delete(`http://localhost:9000/users/${id}`).then((response) => {
      // console.log(response);
      setData((current) =>
    current.filter((item) => item._id !== id)
  );
      
    });}
    return (
      <Fragment>
      <NavBar></NavBar>
          <div className="container">
          <div className="row">
                    <h2 className="text-center">Users</h2>
                  </div>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>User Name</th>
          <th>Email</th>
          <th>Role</th>
          <th></th>

        </tr>
      </thead>
      <tbody>
      {data.map((item) => (
          <tr key={item._id}>
           <td> {item.username}</td> 
           <td>{item.email}</td>
           <td>{item.role}</td>
           <td>
                    <button  onClick={() => deleteUser(item._id)}>
                      Delete
                    </button>
                  </td>
          </tr>
        ))}
      
      </tbody>
    </Table>
              </div>
             </Fragment>
              );
}
export default User;
