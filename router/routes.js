const express = require('express');
const { getServer } = require('../Controller/controller');
const { getAllUsers, updateUserIsOnlineStatus, deleteUser, createUser, getActiveUser, getDeactiveUser, getUserDetails } = require('../Controller/userController/user');
const { getAllCoffee, getCoffeeDetails, addOneCoffee } = require('../Controller/coffee-managment/coffee');
const router = express.Router();
router.get('/', getServer)


//general controller 
router.patch("/users", updateUserIsOnlineStatus) //update user online or not 
router.post("/users", createUser) // create user 
//all coffees
router.get("/coffees", getAllCoffee);
//coffee details
router.get("/coffees/:id", getCoffeeDetails);


// admin side controllers 
router.get('/users', getAllUsers)
router.delete("/users/:id", deleteUser)
router.get("/activeUsers", getActiveUser)
router.get("/deactivateUsers", getDeactiveUser)
router.get("/users/:id", getUserDetails)
router.post("/coffees", addOneCoffee);


// customer side controllers

// rider api

module.exports = router;
