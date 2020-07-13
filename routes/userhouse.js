const express = require("express");
const {
    createUserHouse,
    getUserHouses,
    deleteUserHouses

} = require('../controller/userhouse');
const router = express.Router();
const UserHouse = require('../model/UserHouse');
const { protect, authorize } = require('../middleware/auth');

router.route("/").post(protect, createUserHouse).get(protect, getUserHouses);
router.delete("/:id", protect, deleteUserHouses);

module.exports = router;