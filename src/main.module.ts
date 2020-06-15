import { Module } from '@nestjs/common';

import { AppModule } from './app/app.module';
import { AuthenticationModule } from './Authentication/authentication.module';

@Module({
  imports: [
    AppModule,
    AuthenticationModule
  ],
  exports: [
    AppModule,
    AuthenticationModule
  ]
})
export class MainModule {}
