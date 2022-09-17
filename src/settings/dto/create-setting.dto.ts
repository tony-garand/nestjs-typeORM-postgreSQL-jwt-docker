import { ApiProperty } from "@nestjs/swagger";

export class CreateSettingDto {
    @ApiProperty({
        required: false
    })
    darkMode: boolean
}
