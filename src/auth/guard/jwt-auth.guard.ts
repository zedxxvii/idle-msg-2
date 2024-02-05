import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//This is taken from Nestjs official documemtation
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
