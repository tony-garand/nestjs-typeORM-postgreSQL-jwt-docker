import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInfo } from "src/user/entity/user-info.entity";
import { SignInCredentialsDto } from "../dto/signin-credentials.dto";
import { SignupCredentialsDto } from "../dto/signup-credentials.dto";
import { User } from "../entity/user.entity";
import { JwtPayload } from "../interface/jwt-payload.interface";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) {}

    async signUp(signupCredentialsDto: SignupCredentialsDto): Promise<{ message: string }> {
        const { username, password } = signupCredentialsDto

        const user = new User()
        user.username = username
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt)
        
        try {
            const userInfo = new UserInfo()
            await userInfo.save()

            user.user_info = userInfo
            await user.save()

            return { message: 'User successfully created !' }
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<{ accessToken: string, user: JwtPayload }> {
        const resp = await this.validateUserPassword(signInCredentialsDto)
        if (!resp) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload: JwtPayload = resp
        const accessToken = this.jwtService.sign(payload)

        return {
            accessToken,
            user: resp
        }
    }

    public async validateUserPassword(signinCredentialDto: SignInCredentialsDto): Promise <JwtPayload> {
        const { username, password } = signinCredentialDto
        const user = new User()
        const auth = await User.findOne({where: {username}})

        if (auth && await auth.validatePassword(password)) {
            return {
                username: auth.username,
                user_info: auth.user_info
            }
        } else {
            return null
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt)
    }
}