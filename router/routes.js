const express = require('express');
const { getServer } = require('../Controller/controller');
const { getAllUsers, updateUserIsOnlineStatus, deleteUser, createUser, getActiveUser, getDeactiveUser, getUserDetails } = require('../Controller/userController/user');
const { getAllCoffee, getCoffeeDetails, addOneCoffee, updateCoffee, deleteCoffee } = require('../Controller/coffee-managment/coffee');
const upload = require('../Config/multerConfig');
const { getAllCategories, addCategories } = require('../Controller/categoryController/categoryController');
const { getAllFeaturedProduct, getAllPopularProducts } = require('../Controller/ProductsListing/productsListing');
const router = express.Router();


router.get('/', getServer)


//general controller 
router.patch("/users", updateUserIsOnlineStatus) //update user online or not 
router.post("/users", createUser) // create user 
//all coffees
router.get("/coffees", getAllCoffee);
//coffee details
router.get("/coffees/:id", getCoffeeDetails);



//@ get all our best products for featured products section 
router.get('/popular/coffees', getAllPopularProducts)
// @ get all popular products
router.get('/featured/products', getAllFeaturedProduct)

// @ get all categories for admin side and customer side. 
router.get('/getAllCategories', getAllCategories)

// admin side controllers 
router.get('/users', getAllUsers)
router.delete("/users/:id", deleteUser)
router.get("/activeUsers", getActiveUser)
router.get("/deactivateUsers", getDeactiveUser)
router.get("/users/:id", getUserDetails)
router.post("/coffees", upload.array("images", 5), addOneCoffee);
router.put("/coffees/:id", upload.array("images", 5), updateCoffee);
router.delete("/coffees/:id", deleteCoffee);
// @ add category 
router.post('/addOneCategory', addCategories)

// customer side controllers

// rider api

module.exports = router;
