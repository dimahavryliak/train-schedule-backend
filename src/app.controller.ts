import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TrainService } from './train/train.service';

@Controller('train')
export class AppController {
  constructor(private readonly trainService: TrainService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.trainService.findAll();
  }
}
