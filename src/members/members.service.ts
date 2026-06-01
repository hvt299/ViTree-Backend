import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from './schemas/member.schema';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MembersService {
  constructor(@InjectModel(Member.name) private memberModel: Model<Member>) { }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const createdMember = new this.memberModel(createMemberDto);
    return createdMember.save();
  }

  async findAll(): Promise<Member[]> {
    return this.memberModel.find().exec();
  }
}