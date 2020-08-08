const express = require("express");
const { getAgents, getAgentHouse } = require('../controller/user');
// const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAgents);
router.get('/:user', getAgentHouse);


module.exports = router;