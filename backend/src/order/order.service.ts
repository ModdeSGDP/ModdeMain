import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from '../order/schema/order.schema';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { Stocks, StocksDocument } from '../stocks/schemas/stocks.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Stocks.name) private stockModel: Model<StocksDocument>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, user: any): Promise<Order> {
    const userId = new Types.ObjectId(user.id);
    if (!userId) {
      throw new Error('User ID is missing from the token');
    }
    // Validate stock items before creating the order
    
    for (const item of createOrderDto.items) {
      const stock = await this.stockModel.findById(item.stockId).exec();
      if (!stock) {
        throw new NotFoundException(`Stock item with ID ${item.stockId} not found`);
      }
      if (stock.get('quantity') < item.quantity) {
        throw new BadRequestException(`Insufficient stock for item with ID ${item.stockId}`);
      }
    }

    const newOrder = new this.orderModel({
      ...createOrderDto,
      userId,
    });
    return newOrder.save();
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).populate('items.stockId').exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async getOrdersByCustomer(customerId: string): Promise<Order[]> {
    return this.orderModel.find({ customerId: new Types.ObjectId(customerId) }).populate('items.stockId').exec();
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
    if (!updatedOrder) {
      throw new NotFoundException('Order not found');
    }
    return updatedOrder;
  }

  async deleteOrder(id: string): Promise<Order> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deletedOrder) {
      throw new NotFoundException('Order not found');
    }
    return deletedOrder;
  }
}
