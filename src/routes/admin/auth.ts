import { Router } from 'express';
import passport from 'passport';

const router = Router();
router.get('/signin', (_, res) => {
    res.send('admin signin');
})
// POST
router.post('/login', passport.authenticate('local'), (req, res, next) => {});

export default router;