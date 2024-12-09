const express = require('express');
const { getUsers, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router({ mergeParams: true });

router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
