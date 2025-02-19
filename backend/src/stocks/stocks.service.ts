import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stocks, StocksDocument } from './schemas/stocks.schema';
import { Product, ProductDocument } from '../product/schemas/product.schema';
import { CreateStocksDto } from './dtos/create-stocks.dto';
import { UpdateStocksDto } from './dtos/update-stocks.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class StocksService {
  constructor(
    @InjectModel(Stocks.name) private stocksModel: Model<StocksDocument>,
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>
  ) {}

  async create(createStocksDto: CreateStocksDto): Promise<Stocks> {

    const { productId } = createStocksDto;

    // Check if the product exists in the Product schema
    const productExists = await this.ProductModel.findById(productId).exec();
    
    if (!productExists) {
      throw new NotFoundException('Product does not exist');
    }

    const newStock = new this.stocksModel(createStocksDto);
    return newStock.save();
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
  
    const stocks = await this.stocksModel
      .find()
      .populate('productId')
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  
    const totalCount = await this.stocksModel.countDocuments();
  
    return {
      stocks,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      totalItems: totalCount,
    };
  }

  async findByProduct(productId: string): Promise<Stocks[]> {
    return this.stocksModel.find({ productId }).populate('productId').exec();
  }

  async findOne(id: string): Promise<Stocks> {
    const stock = await this.stocksModel.findById(id).populate('productId').exec();
    if (!stock) throw new NotFoundException('Stock not found');
    return stock;
  }

  async update(id: string, updateStocksDto: UpdateStocksDto): Promise<Stocks> {
    const updatedStock = await this.stocksModel.findByIdAndUpdate(id, updateStocksDto, { new: true });
    if (!updatedStock) throw new NotFoundException('Stock not found');
    return updatedStock;
  }

  async remove(id: string): Promise<void> {
    const deletedStock = await this.stocksModel.findByIdAndDelete(id);
    if (!deletedStock) throw new NotFoundException('Stock not found');
  }
}

