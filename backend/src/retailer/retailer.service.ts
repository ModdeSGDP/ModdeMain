import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Retailer } from './schemas/retailer.schema';
import { CreateRetailerDto } from './dtos/create-retailer.dto';
import { UpdateRetailerDto } from './dtos/update-retailer.dto';
import { PaginationDto } from './dtos/pagination.dto';

@Injectable()
export class RetailerService {
  constructor(
    @InjectModel(Retailer.name) private readonly retailerModel: Model<Retailer>,
  ) {}

  async create(createRetailerDto: CreateRetailerDto): Promise<Retailer> {
    const newRetailer = new this.retailerModel(createRetailerDto);
    return newRetailer.save();
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: Retailer[]; total: number }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const data = await this.retailerModel.find().skip(skip).limit(limit).exec();
    const total = await this.retailerModel.countDocuments();

    return { data, total };
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

}
