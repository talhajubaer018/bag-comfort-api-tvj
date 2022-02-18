const express = require('express')
const router = express.Router()

const { registerUser, deleteUser, loginUser, getMe } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.post('/:id', deleteUser)

module.exports = router
