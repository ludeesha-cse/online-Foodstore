import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status";

export const createOrder = asyncHandler(async (req: any, res: any) => {
  const requestOrder = req.body;

  if (requestOrder.items.length <= 0) {
    res.status(HTTP_BAD_REQUEST).send("Order items cannot be empty");
    return;
  }

  await OrderModel.deleteOne({ user: req.user.id, status: OrderStatus.NEW });

  const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
  await newOrder.save();
  //console.log(newOrder);
  res.send(newOrder);
});

export const getOrder = asyncHandler(async (req: any, res: any) => {
    const order = await OrderModel.findOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });
    if (order) {
      res.send(order);
    } else {
      res.status(HTTP_BAD_REQUEST).send("Order not found");
    }
  })
