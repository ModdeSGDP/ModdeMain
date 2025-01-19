import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Retailer } from './schemas/retailer.schema';
import { CreateRetailerDto } from './dto/create-retailer.dto';
import { UpdateRetailerDto } from './dto/update-retailer.dto';

@Injectable()
export class RetailerService {
  constructor(
    @InjectModel(Retailer.name) private readonly retailerModel: Model<Retailer>,
  ) {}

  async create(createRetailerDto: CreateRetailerDto): Promise<Retailer> {
    const newRetailer = new this.retailerModel(createRetailerDto);
    return newRetailer.save();
  }

  async findAll(): Promise<Retailer[]> {
    return this.retailerModel.find().exec();
  }

  async findOne(id: string): Promise<Retailer> {
    const retailer = await this.retailerModel.findById(id).exec();
    if (!retailer) {
      throw new NotFoundException(`Retailer with ID ${id} not found`);
    }
    return retailer;
  }

  async update(
    id: string,
    updateRetailerDto: UpdateRetailerDto,
  ): Promise<Retailer> {
    const updatedRetailer = await this.retailerModel
      .findByIdAndUpdate(id, updateRetailerDto, { new: true })
      .exec();
    if (!updatedRetailer) {
      throw new NotFoundException(`Retailer with ID ${id} not found`);
    }
    return updatedRetailer;
  }

  async delete(id: string): Promise<void> {
    const result = await this.retailerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Retailer with ID ${id} not found`);
    }
  }
}
