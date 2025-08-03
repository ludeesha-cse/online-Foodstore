import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderStatus } from "../constants/order_status";
import { createNewOrder, getTheOrder } from "../services/order.service";

export const createOrder = asyncHandler(async (req: any, res: any) => {
  const requestOrder = req.body;

  if (requestOrder.items.length <= 0) {
    res.status(HTTP_BAD_REQUEST).send("Order items cannot be empty");
    return;
  }

  const newOrder = await createNewOrder(requestOrder, req.user.id);
  res.status(401).json(newOrder);
});

export const getOrder = asyncHandler(async (req: any, res: any) => {

    const order = await getTheOrder(req.user.id, OrderStatus.NEW);
  
    if (order) {
      res.send(order);
    } else {
      res.status(HTTP_BAD_REQUEST).send("Order not found");
    }
  })
