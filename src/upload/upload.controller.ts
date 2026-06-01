import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Get('signature')
    @ApiOperation({ summary: 'Cấp chữ ký số để client tự upload ảnh trực tiếp lên Cloudinary' })
    @ApiResponse({ status: 200, description: 'Trả về credentials và signature hợp lệ' })
    getUploadSignature() {
        return this.uploadService.getUploadSignature();
    }
}
