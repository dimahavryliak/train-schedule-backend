import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: { username: string; password: string }) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('add-trip')
  async addTrip(@Body() body: { userId: number; trainId: number }) {
    const { userId, trainId } = body;
    return this.authService.addTrainToTrips(userId, trainId);
  }

  @Get('trips/:userId')
  async getTrips(@Param('userId') userId: number) {
    return this.authService.getUserTrips(userId);
  }

  @Patch('remove-trip')
  async removeTrip(@Body() body: { userId: number; trainId: number }) {
    const { userId, trainId } = body;
    return this.authService.removeTrainFromTrips(userId, trainId);
  }
}
