import { Controller, Post } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('consume-and-save')
  async consumeAndSaveData(): Promise<void> {
    await this.apiService.consumeAndSaveData();
  }
}
