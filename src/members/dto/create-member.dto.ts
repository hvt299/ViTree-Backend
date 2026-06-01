import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsEnum, IsNumber, IsArray, IsMongoId } from 'class-validator';

export class CreateMemberDto {
    @ApiProperty({ example: 'Nguyễn Văn A', description: 'Họ và tên thành viên' })
    @IsString()
    fullName: string;

    @ApiProperty({ example: 'MALE', enum: ['MALE', 'FEMALE', 'UNKNOWN'] })
    @IsEnum(['MALE', 'FEMALE', 'UNKNOWN'])
    gender: string;

    @ApiPropertyOptional({ example: 'https://...', description: 'Link ảnh đại diện' })
    @IsOptional()
    @IsString()
    avatarUrl?: string;

    @ApiPropertyOptional({ example: 'Trưởng họ đời thứ 5' })
    @IsOptional()
    @IsString()
    shortNote?: string;

    @ApiProperty({ example: true, description: 'Còn sống hay đã mất' })
    @IsBoolean()
    isAlive: boolean;

    @ApiPropertyOptional({ example: '1950-01-01', description: 'Ngày sinh' })
    @IsOptional()
    @IsString()
    birthDate?: string;

    @ApiPropertyOptional({ example: '2020-05-10', description: 'Ngày mất (nếu có)' })
    @IsOptional()
    @IsString()
    deathDate?: string;

    @ApiPropertyOptional({ example: 'Nghĩa trang gia tộc', description: 'Nơi an táng' })
    @IsOptional()
    @IsString()
    burialPlace?: string;

    @ApiPropertyOptional({ example: '660a1b2c3d4e5f6a7b8c9d01', description: 'ID của Cha' })
    @IsOptional()
    @IsMongoId()
    fatherId?: string;

    @ApiPropertyOptional({ example: '660a1b2c3d4e5f6a7b8c9d02', description: 'ID của Mẹ' })
    @IsOptional()
    @IsMongoId()
    motherId?: string;

    @ApiPropertyOptional({
        example: ['660a1b2c3d4e5f6a7b8c9d03'],
        description: 'Danh sách ID Vợ/Chồng (Mảng)'
    })
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    spouseIds?: string[];

    @ApiPropertyOptional({ example: 1, description: 'Thứ tự trong gia đình (1: Anh/Chị cả, 2: Thứ hai...)' })
    @IsOptional()
    @IsNumber()
    orderInFamily?: number;

    @ApiProperty({ example: 5, description: 'Thế hệ thứ mấy trong họ' })
    @IsNumber()
    generation: number;
}