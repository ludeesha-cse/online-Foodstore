import { OrderStatus } from "../constants/order_status";
import { OrderModel } from "../models/order.model";

export const getTheOrder = async (id: string, status: any) => {
  return OrderModel.findOne({
    user: id,
    status: status,
  });
};

export const createNewOrder = async (orderData: any, userId: string) => {
  // Delete any existing "NEW" orders for the user
  await OrderModel.deleteOne({ user: userId, status: OrderStatus.NEW });

  // Create and save the new order
  const newOrder = new OrderModel({ ...orderData, user: userId });
  await newOrder.save();

  return newOrder;
};
