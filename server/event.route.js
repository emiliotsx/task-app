const { Router } = require('express');
const router = Router();

const { init, createEvent } = require('./event.controller')

router.get('/', init);
router.post('/', createEvent);


module.exports = router;
