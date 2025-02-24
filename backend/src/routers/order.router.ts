import asyncHandler from "express-async-handler";
import { Router } from "express";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status";
import auth from "../middlewares/auth.mid";
import { createOrder, getOrder } from "../controllers/order.controller";

const router = Router();
router.use(auth);  // every request in this path uses auth middleware to verify the user

router.post("/create", createOrder);

router.get("/newOrderForCurrentUser", getOrder);

export default router;
