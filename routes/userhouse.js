const express = require("express");
const {
    createUserHouse,
    getUserHouses

} = require('../controller/userhouse');
const router = express.Router();
const UserHouse = require('../model/UserHouse');
const { protect, authorize } = require('../middleware/auth');

router.route("/").post(protect, createUserHouse).get(protect, getUserHouses);

module.exports = router;