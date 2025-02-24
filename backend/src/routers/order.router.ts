import { Router } from "express";
import auth from "../middlewares/auth.mid";
import { createOrder, getOrder } from "../controllers/order.controller";

const router = Router();
router.use(auth);  // every request in this path uses auth middleware to verify the user

router.post("/create", createOrder);

router.get("/newOrderForCurrentUser", getOrder);

export default router;
