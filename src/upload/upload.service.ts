import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
    constructor(private configService: ConfigService) { }

    getUploadSignature() {
        const timestamp = Math.round(new Date().getTime() / 1000);

        const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
        const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
        const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');

        if (!cloudName || !apiKey || !apiSecret) {
            throw new InternalServerErrorException('Thiếu cấu hình Cloudinary trên Server!');
        }

        const signature = cloudinary.utils.api_sign_request(
            { timestamp },
            apiSecret
        );

        return {
            timestamp,
            signature,
            apiKey,
            cloudName
        };
    }
}
