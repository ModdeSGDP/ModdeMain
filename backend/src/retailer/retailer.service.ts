import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Retailer } from './schemas/retailer.schema';
import { CreateRetailerDto } from './dtos/create-retailer.dto';
import { UpdateRetailerDto } from './dtos/update-retailer.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class RetailerService {
  constructor(
    @InjectModel(Retailer.name) private readonly retailerModel: Model<Retailer>,
  ) {}

  async create(createRetailerDto: CreateRetailerDto): Promise<Retailer> {
    const { email } = createRetailerDto;
    const existingRetailer = await this.retailerModel.findOne({ email }).exec();
    if(existingRetailer){
      throw new ConflictException(`Retailer with email ${email} already exists`);
    }
    const newRetailer = new this.retailerModel(createRetailerDto);
    return newRetailer.save();
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: Retailer[]; meta: any }> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const data = await this.retailerModel.find().skip(skip).limit(limit).exec();
    const total = await this.retailerModel.countDocuments();

    if(skip >= total){
      throw new BadRequestException('Page number exceeds available data');
    }

    return { 
      data, 
      meta: {
        totalItems: total,
        itemCount: data.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    }, };
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
