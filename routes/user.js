const express = require("express");
const { getAgents, getAgentHouse, getAgentBySearch } = require('../controller/user');
// const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAgents);
router.get('/:user', getAgentHouse);
router.get('/_/search', getAgentBySearch);


module.exports = router;