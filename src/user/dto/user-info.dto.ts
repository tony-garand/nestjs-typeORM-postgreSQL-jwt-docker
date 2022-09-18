import { ApiProperty } from "@nestjs/swagger"

export class UserInfoDto {
    @ApiProperty({
        type: 'file',
        properties: {
            file: {
                type: 'string',
                format: 'binary'
            }
        },
        required: false
    })
    photo: string
}