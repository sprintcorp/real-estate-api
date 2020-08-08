const express = require("express");
const { getAgents, getAgentHouse, getAgent } = require('../controller/user');
// const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAgents);
router.get('/agent/:id', getAgent);
router.get('/:user', getAgentHouse);


module.exports = router;