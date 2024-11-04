import express from 'express';
import { creat, getAllusers, getUserbyId, updateUserbyId, delateUserbyId } from '../2-controller/userController.js';

const route = express.Router();

route.post("/user", creat);
route.get("/users", getAllusers);
route.get("/user/:id", getUserbyId);
route.put("/update/user/:id", updateUserbyId);
route.delete("/delete/user/:id", delateUserbyId);




export default route;