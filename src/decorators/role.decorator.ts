import {SetMetadata} from '@nestjs/common';

export enum Role {
    Admin = 'Admin',
    Reader = 'Reader',
    Writer = 'Writer'
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);