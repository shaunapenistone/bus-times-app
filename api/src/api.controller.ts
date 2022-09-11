import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/bus-times')
  getBusTimes() {
    return this.apiService.getBusTimes();
  }

  @Get('/todays-buses')
  getRunningBus() {
    return this.apiService.getRunningBus();
  }
}
