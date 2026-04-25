import { Module } from '@nestjs/common'

import { CoreModule } from '@core/core.module'
import { ApiModule } from '@api/api.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
	imports: [CoreModule, ApiModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
