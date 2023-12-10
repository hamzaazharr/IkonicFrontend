// const express=require('express');
// const router=express.Router();
// const User =require('./userModel/user');


// // router.post('/newUser',async (req, res) => {
// //   const password=req.body.password;
// //   const hashedPassword = await bcrypt.hash(password, 10); 
// //   const user =new User({
// //     username: req.body.username,
// //     email: req.body.email,
// //     password: hashedPassword,
// //     role:req.body.role
// // });
// // try{
// //     const newUser= await user.save()
// //     console.log(newUser)
// //     res.json(newUser);
// // }catch(e){
// //     console.log(e);
// // res.send(e);
// //   }
// // });
// router.get('/users',async (req, res)=>{
//   try{
//     const users=await User.find()
//     res.send(users);
// }catch(e){
//     console.log(e);
// res.send(e);
//   }
// });
// router.post('/user/login',async (req, res)=>{
//   try{
//    const email= req.body.email;
//    const password= req.body.password;
//       const user = await User.findOne({ email });
//       if (user && await bcrypt.compare(password, user.password)) {
//         res.json({ message: 'Login successful' });
//       } else {
//         res.status(401).json({ message: 'Invalid email or password' });
//       }
// }catch(e){
//     console.log(e);
// res.send(e);
//   }
// });
// router.delete('/users/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const deletedUser = await User.findByIdAndDelete(userId);
    
//     if (deletedUser) {
//       res.json({ message: 'User deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });