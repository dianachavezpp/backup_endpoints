const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/estudiantesController');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.insert);
router.put('/:id', ctrl.update);
router.patch('/:id', ctrl.patch);
router.delete('/:id', ctrl.remove);

module.exports = router;