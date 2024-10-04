import { Router } from 'express';
import { registerUser, getUserById, loginUser, getUsers, blockUser } from '../controllers/userController';
import { authenticateJWT, isAdmin } from '../middleware/auth';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:id', authenticateJWT, getUserById);
router.get('/dashboard/users', authenticateJWT, isAdmin, getUsers);
router.patch('/dashboard/users/:id/block', authenticateJWT, isAdmin, blockUser);

export default router;