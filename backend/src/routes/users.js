const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',authMiddleware ,userController.getAllUsers);
router.get('/:id/get',authMiddleware,userController.getUserById);
router.post('/', userController.createUser);
router.put('/',authMiddleware ,userController.updateUser);
router.delete('/',authMiddleware ,userController.deleteUser);
router.post('/login', userController.loginUser);
router.post('/logout',authMiddleware ,userController.logout);
router.get('/profile', authMiddleware,userController.profile);

module.exports = router;