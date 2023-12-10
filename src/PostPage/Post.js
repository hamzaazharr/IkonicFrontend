import React, { Fragment, useEffect, useState} from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import NavBar from "../NavBar";
import Modal from 'react-modal';
const Post = (props) => {
    const [data, setData] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [openDialog, handleDisplay] = React.useState(false);
    const [id, setId] = useState(null);
    const [updatePostTitle, setUpdatePostTitle] = useState('');
    const [updatePostContent, setUpdatePostContent] = useState('');
    const handleClose = () => {
      handleDisplay(false);
   };
   function openDialogBox(id,title,content) {
    setId(id);
    setUpdatePostTitle(title);
    setUpdatePostContent(content);
     handleDisplay(true);
  };
     // eslint-disable-next-line 
  const [role, setRole] = useState(
    localStorage.getItem('role')
  );
  useEffect(() => {
    axios
    .get("http://localhost:9000/allPost")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const post = {
      title: postTitle,
      content: postContent,
      author:localStorage.getItem("uID")
    };
    axios.post('http://localhost:9000/posts',post).then(function (response) {
      if (response.status === 200) {
        setData((prevData) => [
          ...prevData,
          {_id: response.data._id,title: response.data.title, content: response.data.content,author: response.data.author},
        ]);
        setPostTitle('');
        setPostContent('');
      }

    }).catch(error => console.log(error));
   
  };
  function updateData(){
      
    const _id = id;
    setData((current) =>
    current.filter((item) => item._id !== _id));
    axios.patch(`http://localhost:9000/postUpdate/${_id}`, {
      title: updatePostTitle,
      content: updatePostContent,
      }).then(function (response) {
        console.log(response);
        setData((prevData) => [
          ...prevData,
          {_id: response.data._id,title: response.data.title, content: response.data.content,author: response.data.author,},
        ]);
        handleDisplay(false);
      })
  }
  function deletePost(id){
    axios.delete(`http://localhost:9000/post/${id}`).then((response) => {
      console.log(response);
      setData((current) =>
    current.filter((item) => item._id !== id)
  );
      
    });

  }
    return (
      <Fragment>
        <NavBar></NavBar>
        <Modal onRequestClose={handleClose} isOpen={openDialog}>
  <div style={{ height: "400px", width: "400px" }} className="container">
    <div style={{ width: "350px", marginLeft: "10px", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <div className="row">
        <input
          className="form-control"
          placeholder="Title"
          value={updatePostTitle}
          type="text"
          name="title"
          onChange={(e) => setUpdatePostTitle(e.target.value)}
        />
      </div>
      <div className="row" style={{ marginTop: "10px" }}>
        <input
          className="form-control"
          placeholder="Description"
          value={updatePostContent}
          onChange={(e) => setUpdatePostContent(e.target.value)}
          type="text"
        />
      </div>
      <div className="row" style={{ marginTop: "10px" }}>

      </div>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => updateData()}
      >
        Update
      </button>
    </div>
  </div>
</Modal>
                <div className="container">
                  <div className="row">
                    <h2 className="text-center">Posts</h2>
                  </div>
            <div className="row" style={{width:"350px"}}>
            <form onSubmit={handleSubmit} className="col">
          <input
            type="text"
            className="form-control flex-1 mb-3"
            placeholder="Enter Title"
            value={postTitle}
            onChange={e => setPostTitle(e.target.value)}
            required
          />
        <input
            type="text"
            className="form-control mb-3 flex-1"
            placeholder="Enter Content"
            value={postContent}
            onChange={e => setPostContent(e.target.value)}
            required
         />
        <button type="submit" className="flex-1 mb-2 btn btn-primary">
            Submit
          </button>
    
       
      </form>
            </div>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {data.map((item) => (
          <tr key={item._id}>
           <td> {item.title}</td> 
           <td>{item.content}</td>
           {role === 'admin' && (
            <td>
                             <button  onClick={() => openDialogBox(item._id,item.title,item.content)} >
                      Edit
                    </button>
                    <button onClick={() => deletePost(item._id)} >
                      Delete
                    </button>
                  </td>)}
          </tr>
        ))}      
      </tbody>
    </Table>
              </div>
              </Fragment>

              );
}
export default Post;
