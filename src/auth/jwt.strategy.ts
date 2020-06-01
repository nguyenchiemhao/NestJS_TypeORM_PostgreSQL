import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayLoadInterface } from './jwt-payload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51',
        })
    }

    async validate(payload: JwtPayLoadInterface) {
        const { username } = payload;
        const user = this.userRepository.findOne({ username })

        if (!user) {
            throw new UnauthorizedException();
        }

        return user
    }
}