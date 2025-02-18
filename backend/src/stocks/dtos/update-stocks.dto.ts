import { PartialType } from "@nestjs/mapped-types";
import { CreateStocksDto } from "./create-stocks.dto";

export class UpdateStocksDto extends PartialType(CreateStocksDto) {}