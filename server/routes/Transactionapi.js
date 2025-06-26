import {Router} from 'express';
import passport from 'passport';
const router = Router();
import Transaction from '../models/transaction.js';
import * as TransactionController from '../controller/TransactionController.js'

router.get("/", 
TransactionController.index
);
router.post("/", TransactionController.create);
router.delete("/:id",TransactionController.del);
router.patch("/:id",TransactionController.upd);
export default router; 