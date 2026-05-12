import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { CoreModule } from '@core/core.module'
import { AuthGuard, RolesGuard } from '@shared/guards'
import { ApiModule } from '@api/api.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GuardsModule } from './guards.module'

@Module({
	imports: [GuardsModule, CoreModule, ApiModule],
	controllers: [AppController],
	providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }, { provide: APP_GUARD, useExisting: RolesGuard }],
})
export class AppModule {}
