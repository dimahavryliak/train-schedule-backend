import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { TrainService } from './train.service';
import { Train } from './train.entity';

@Controller('train')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Get()
  findAll() {
    return this.trainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.trainService.findOne(id);
  }

  @Post()
  create(@Body() trainData: Partial<Train>) {
    return this.trainService.create(trainData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() trainData: Partial<Train>) {
    return this.trainService.update(id, trainData);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: number, @Body() trainData: Partial<Train>) {
    return this.trainService.update(id, trainData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.trainService.delete(id);
  }
}
