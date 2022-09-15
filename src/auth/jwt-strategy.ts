import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { User } from "./entity/user.entity";
import { JwtPayload } from "./interface/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload
        const user = await User.findOne({where: {username}})

        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}