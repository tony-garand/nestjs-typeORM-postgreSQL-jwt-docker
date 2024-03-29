import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../../auth/entity/user.entity";
import { UserInfoDto } from "../dto/user-info.dto";
import { UserInfo } from "../entity/user-info.entity";
import { userInfoData } from "../interface/user-info.interface";

@Injectable()
export class UserService {
    async getUser(
        user: User
    ): Promise<UserInfo> {
        const userInfo = await UserInfo.findOne({ where : { id: user.user_info.id } })

        if (!userInfo) {
            throw new NotFoundException("User not found.");
        }
        return userInfo
    }

    async updateUserProfile(
        user: User,
        userInfoDto: UserInfoDto
    ): Promise<userInfoData> {
        const userInfo = await this.getUser(user)
        
        if (userInfoDto.photo) userInfo.photo = userInfoDto.photo
        
        await userInfo.save()
        return userInfo
    }
}