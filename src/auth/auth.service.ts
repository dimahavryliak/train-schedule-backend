import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const existingUser = await this.userRepository.findOneBy({ username });
    if (existingUser) {
      return { message: 'Username already exists' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      trips: [], // Initialize trips as an empty array
    });
    await this.userRepository.save(user);
    return {
      message: 'User registered successfully',
      userId: user.id, // Include userId
      username,
      trips: user.trips,
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      userId: user.id, // Include userId
      username: user.username, // Include username
      trips: user.trips, // Include trips
    };
  }

  async addTrip(userId: number, trainId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    user.trips.push(trainId); // Add train ID to trips
    await this.userRepository.save(user);
    return user.trips;
  }

  async addTrainToTrips(userId: number, trainId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.trips.includes(trainId)) {
      user.trips.push(trainId); // Add trainId to trips if not already present
      await this.userRepository.save(user);
    }
    return { message: 'Train added to trips', trips: user.trips };
  }

  async getUserTrips(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    return { userId: user.id, trips: user.trips };
  }

  async removeTrainFromTrips(userId: number, trainId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    user.trips = user.trips.filter((id) => id !== trainId); // Remove trainId from trips
    await this.userRepository.save(user);
    return { message: 'Train removed from trips', trips: user.trips };
  }
}
