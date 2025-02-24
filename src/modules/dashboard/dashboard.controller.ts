import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/auths/jwt-auth.guard';
import {
  DetailSwaggerExample,
  ListSwaggerExample,
} from '../../common/swagger/swagger-example.response';
import { ResponseTotalDashboardDto } from './dto/response-total-dashboard.dto';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { plainToInstance } from 'class-transformer';
import { ResponseChartDashboardDto } from './dto/response-chart-dashboard.dto';

@Controller('dashboard')
@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('total-article')
  @DetailSwaggerExample(
    ResponseTotalDashboardDto,
    'Mengambil total artikel yang ada',
  )
  async getTotalArticle(): Promise<
    BaseSuccessResponse<ResponseTotalDashboardDto>
  > {
    const total = await this.dashboardService.getTotalArticle();
    return {
      data: plainToInstance(ResponseTotalDashboardDto, total, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get('total-user-instagram')
  @DetailSwaggerExample(
    ResponseTotalDashboardDto,
    'Mengambil total pengguna Instagram yang terdaftar',
  )
  async getTotalUserInstagram(): Promise<
    BaseSuccessResponse<ResponseTotalDashboardDto>
  > {
    const total = await this.dashboardService.getTotalUserInstagram();
    return {
      data: plainToInstance(ResponseTotalDashboardDto, total, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get('chart-article-views')
  @ListSwaggerExample(
    ResponseChartDashboardDto,
    'Mengambil data views artikel',
    false,
  )
  async getChartArticleViews(): Promise<
    BaseSuccessResponse<ResponseChartDashboardDto>
  > {
    const data = await this.dashboardService.getChartArticleViews();
    return {
      data: plainToInstance(ResponseChartDashboardDto, data, {
        excludeExtraneousValues: true,
        strategy: 'excludeAll',
      }),
    };
  }
}
