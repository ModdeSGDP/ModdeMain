import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { stocks, stocksDocument } from './schemas/stocks.schema';
import { CreateStocksDto } from './dtos/create-stocks.dto';
import { UpdateStocksDto } from './dtos/update-stocks.dto';

@Injectable()
export class StocksService {
  constructor(@InjectModel(stocks.name) private stocksModel: Model<stocksDocument>) {}

  async create(createStocksDto: CreateStocksDto): Promise<stocks> {
    const newStock = new this.stocksModel(createStocksDto);
    return newStock.save();
  }

  async findAll(): Promise<stocks[]> {
    return this.stocksModel.find().populate('productId').exec();
  }

  async findByProduct(productId: string): Promise<stocks[]> {
    return this.stocksModel.find({ productId }).populate('productId').exec();
  }

  async findOne(id: string): Promise<stocks> {
    const stock = await this.stocksModel.findById(id).populate('productId').exec();
    if (!stock) throw new NotFoundException('Stock not found');
    return stock;
  }

  async update(id: string, updateStocksDto: UpdateStocksDto): Promise<stocks> {
    const updatedStock = await this.stocksModel.findByIdAndUpdate(id, updateStocksDto, { new: true });
    if (!updatedStock) throw new NotFoundException('Stock not found');
    return updatedStock;
  }

  async remove(id: string): Promise<void> {
    const deletedStock = await this.stocksModel.findByIdAndDelete(id);
    if (!deletedStock) throw new NotFoundException('Stock not found');
  }
}

