import {Router} from "express";
import UserApi from "./UserApi.js";
import Transactionapis from "./Transactionapi.js";
import AuthApi from "./AuthApi.js"
import passport from "passport"; 
const router = Router();

router.use("/transactions",passport.authenticate('jwt', { session: false }), Transactionapis);
router.use("/auth",AuthApi);
router.use("/user",UserApi);

export default router;