import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsEnum, IsMongoId, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Gender, LifeStatus } from '../schemas/member.schema';

export class LunarDeathAnniversaryDto {
    @ApiPropertyOptional({ example: 10 }) @IsOptional() @IsNumber() day?: number;
    @ApiPropertyOptional({ example: 3 }) @IsOptional() @IsNumber() month?: number;
    @ApiPropertyOptional({ example: false }) @IsOptional() @IsBoolean() isLeapMonth?: boolean;
    @ApiPropertyOptional({ example: 'Mùng 10 tháng 3 âm lịch' }) @IsOptional() @IsString() displayText?: string;
}

export class CreateMemberDto {
    @ApiProperty({ example: 'Nguyễn Văn A' }) @IsString() fullName: string;
    @ApiPropertyOptional({ example: 'Tử Đằng' }) @IsOptional() @IsString() tuName?: string;

    @ApiProperty({ enum: Gender, example: Gender.MALE }) @IsEnum(Gender) gender: Gender;
    @ApiPropertyOptional({ enum: LifeStatus, example: LifeStatus.ALIVE }) @IsOptional() @IsEnum(LifeStatus) status?: LifeStatus;

    @ApiPropertyOptional() @IsOptional() @IsString() avatarUrl?: string;
    @ApiPropertyOptional() @IsOptional() @IsString() shortNote?: string;
    @ApiPropertyOptional({ example: false, description: 'Vô tự' }) @IsOptional() @IsBoolean() isHeirless?: boolean;

    @ApiPropertyOptional({ example: '1950-01-01' }) @IsOptional() @IsDateString() birthDate?: string;
    @ApiPropertyOptional({ example: '2020-05-10' }) @IsOptional() @IsDateString() deathDate?: string;

    @ApiPropertyOptional({ type: LunarDeathAnniversaryDto })
    @IsOptional()
    @ValidateNested()
    @Type(() => LunarDeathAnniversaryDto)
    lunarDeathAnniversary?: LunarDeathAnniversaryDto;

    @ApiPropertyOptional({ example: 'Nghĩa trang gia tộc' }) @IsOptional() @IsString() burialPlace?: string;

    @ApiPropertyOptional({ type: [String], description: 'Danh sách ID Cha' })
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    fatherIds?: string[];

    @ApiPropertyOptional({ type: [String], description: 'Danh sách ID Mẹ (Hỗ trợ case không rõ mẹ)' })
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    motherIds?: string[];

    @ApiPropertyOptional({ type: [String] })
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    spouseIds?: string[];

    @ApiPropertyOptional({ example: 1 }) @IsOptional() @IsNumber() orderInFamily?: number;
    @ApiProperty({ example: 5 }) @IsNumber() generation: number;
    @ApiPropertyOptional({ example: 'CHI_TRUONG' }) @IsOptional() @IsString() branchId?: string;
}