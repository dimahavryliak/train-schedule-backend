import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Train } from './train.entity';

@Injectable()
export class TrainService {
  constructor(
    @InjectRepository(Train)
    private trainRepository: Repository<Train>,
  ) {}

  create(trainData: Partial<Train>) {
    const train = this.trainRepository.create(trainData);
    return this.trainRepository.save(train);
  }

  findAll() {
    return this.trainRepository.find();
  }

  findOne(id: number) {
    return this.trainRepository.findOneBy({ id });
  }

  update(id: number, trainData: Partial<Train>) {
    return this.trainRepository.update(id, trainData);
  }

  delete(id: number) {
    return this.trainRepository.delete(id);
  }
}
