import { Global, Module } from '@nestjs/common'

import { RolesGuard } from '@shared/guards'
import { AccountModule } from '@api/account/account.module'

@Global()
@Module({
	imports: [AccountModule],
	providers: [RolesGuard],
	exports: [RolesGuard],
})
export class GuardsModule {}
