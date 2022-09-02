const express = require('express');
const { getRandomUser, getAllUsers, postSaveUser, deleteUser, patchBulkUpdateUser, patchUpdateUser } = require('../controllers/user.controller');
const router = express.Router();

router.get('/random', getRandomUser)
router.get('/all', getAllUsers)
router.post('/save', postSaveUser)
router.patch('/update', patchUpdateUser)
router.patch('/bulk-update', patchBulkUpdateUser)
router.delete('/delete', deleteUser)
module.exports = router;