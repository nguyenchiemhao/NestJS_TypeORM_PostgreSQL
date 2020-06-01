import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from 'src/user/user.entity';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user === undefined) {
        console.log('@GetUser() decorator must be use in Guard Auth')
    }
    return request.user;
})