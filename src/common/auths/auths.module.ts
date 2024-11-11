import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_ACCESS'),
        signOptions: { expiresIn: configService.get('JWT_ACCESS_EXPIRED') },
      }),
    }),
  ],
  controllers: [AuthsController],
  providers: [AuthsService, JwtStrategy],
})
export class AuthsModule {}
