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

    const { productId, stock, regularPrice, salePrice } = createStocksDto;

    // Check if the product exists in the Product schema
    const productExists = await this.ProductModel.findById(productId).exec();
    
    if (!productExists) {
      throw new NotFoundException('Product does not exist');
    }
    // Check if a stock entry already exists for this product
    const existingStock = await this.stocksModel.findOne({ productId });

    if (existingStock) {
      // Merge stock sizes
      stock.forEach(newStock => {
        const existingStockIndex = existingStock.stock.findIndex(s => s.size === newStock.size);
        if (existingStockIndex !== -1) {
          // Update quantity if size exists
          existingStock.stock[existingStockIndex].quantity = newStock.quantity;
        } else {
          // Add new size if it doesn't exist
          existingStock.stock.push(newStock);
        }
      });
      // Update price fields if provided
    if (regularPrice !== undefined) existingStock.regularPrice = regularPrice;
    if (salePrice !== undefined) existingStock.salePrice = salePrice;

    // Ensure Mongoose detects changes
    existingStock.markModified('stock');

    // Save and return the updated stock
    return await existingStock.save();
  }

  // If no existing stock, create a new one
  const newStock = new this.stocksModel(createStocksDto);
  return newStock.save();


    // const newStock = new this.stocksModel(createStocksDto);
    // return newStock.save();
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

  // async update(id: string, updateStocksDto: UpdateStocksDto): Promise<Stocks> {
  //   const updatedStock = await this.stocksModel.findByIdAndUpdate(id, updateStocksDto, { new: true });
  //   if (!updatedStock) throw new NotFoundException('Stock not found');
  //   return updatedStock;
  // }
  async update(id: string, updateStocksDto: UpdateStocksDto): Promise<Stocks> {
    const stockEntry = await this.stocksModel.findById(id);
    
    if (!stockEntry) {
      throw new NotFoundException('Stock not found');
    }
  
    // Update price if provided
    if (updateStocksDto.regularPrice !== undefined) {
      stockEntry.regularPrice = updateStocksDto.regularPrice;
    }
  
    if (updateStocksDto.salePrice !== undefined) {
      stockEntry.salePrice = updateStocksDto.salePrice;
    }
  
    // Merge stock sizes if provided
    if (updateStocksDto.stock) {
      updateStocksDto.stock.forEach(newStock => {
        const existingStockIndex = stockEntry.stock.findIndex(s => s.size === newStock.size);
        if (existingStockIndex !== -1) {
          // Update quantity for existing size
          stockEntry.stock[existingStockIndex].quantity = newStock.quantity;
        } else {
          // Add new size if not found
          stockEntry.stock.push(newStock);
        }
      });
    }
  
    return stockEntry.save();
  }

  async remove(id: string): Promise<void> {
    const deletedStock = await this.stocksModel.findByIdAndDelete(id);
    if (!deletedStock) throw new NotFoundException('Stock not found');
  }
}

