const express = require('express');
const mongoose = require('mongoose');
const url='mongodb+srv://xoyidep646:bBcSbsj3SbOMTiHI@cluster0.t1hnmv2.mongodb.net/?retryWrites=true&w=majority';
const app= express();
const bcrypt = require('bcrypt');
const cors = require("cors");

app.use(cors());

mongoose.connect(url,{useNewUrlParser:true});

const con=mongoose.connection;
con.on('open',()=>{
    console.log('connected...');
})
app.use(express.json())

const User =require('./userModel/user');
// const checkRole = require('./middleware/authMiddleware');


app.post('/newUser',async (req, res) => {
  const password=req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user =new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    role:req.body.email == "admin@admin.com" ? "admin" : "user"
});
try{
    const newUser= await user.save()
    console.log(newUser)
    res.json(newUser);
}catch(e){
    console.log(e);
res.send(e);
  }
});
app.get('/users',async (req, res)=>{
  try{
    const users=await User.find()
    res.send(users);
}catch(e){
    console.log(e);
res.send(e);
  }
});
app.post('/user/login',async (req, res)=>{
  try{
   const email= req.body.email;
   const password= req.body.password;
      const user = await User.findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
        res.json({ message: 'Login successful' ,data:{role :user.role,userID:user._id}});
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
}catch(e){
    console.log(e);
res.send(e);
  }
});
app.delete('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (deletedUser) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// const userRoutes=require('./userRoute');
// app.use('/users',userRoutes);
// const postRoutes=require('./postModal/postRoute');
// app.use('/posts',postRoutes,checkRole('user'));
const Post=require('./postModal/post');
app.post('/posts', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/allPost',async (req, res)=>{
  try{
    const posts=await Post.find()
    res.send(posts);
}catch(e){
    console.log(e);
res.send(e);
  }
});  
app.delete('/post/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const deletePost = await Post.findByIdAndDelete(postId);
    
    if (deletePost) {
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.patch('/postUpdate/:id',async (req, res)=>{
  try{
      const post=await Post.findById(req.params.id)
      post.title=req.body.title;
      post.content=req.body.content;
      const newPost =await post.save();
      res.json(newPost);
  }catch(e){
      console.log(e);
  }    
  })

app.listen(9000,()=>{
  console.log('Server is started')
})