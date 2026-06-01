import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Member } from './schemas/member.schema';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(@InjectModel(Member.name) private memberModel: Model<Member>) { }

  private async validateRelations(fatherId?: string, motherId?: string, spouseIds?: string[]) {
    if (fatherId) {
      const father = await this.memberModel.findById(fatherId).exec();
      if (!father) throw new NotFoundException(`Không tìm thấy Cha với ID: ${fatherId}`);
    }

    if (motherId) {
      const mother = await this.memberModel.findById(motherId).exec();
      if (!mother) throw new NotFoundException(`Không tìm thấy Mẹ với ID: ${motherId}`);
    }

    if (spouseIds && spouseIds.length > 0) {
      const spouses = await this.memberModel.find({ _id: { $in: spouseIds } }).exec();
      if (spouses.length !== spouseIds.length) {
        throw new NotFoundException('Một hoặc nhiều ID Vợ/Chồng không tồn tại trong hệ thống');
      }
    }
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    await this.validateRelations(
      createMemberDto.fatherId,
      createMemberDto.motherId,
      createMemberDto.spouseIds
    );

    const createdMember = new this.memberModel(createMemberDto);
    return createdMember.save();
  }

  async findAll(page: number = 1, limit: number = 50, generation?: number): Promise<{ data: Member[], total: number, page: number, limit: number }> {
    const skip = (page - 1) * limit;
    const filter = generation ? { generation } : {};

    const [data, total] = await Promise.all([
      this.memberModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ generation: 1, orderInFamily: 1 })
        .exec(),
      this.memberModel.countDocuments(filter).exec()
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Member> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID không hợp lệ');

    const member = await this.memberModel.findById(id).exec();
    if (!member) throw new NotFoundException(`Không tìm thấy thành viên với ID: ${id}`);

    return member;
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID không hợp lệ');

    if (updateMemberDto.fatherId || updateMemberDto.motherId || updateMemberDto.spouseIds) {
      await this.validateRelations(
        updateMemberDto.fatherId,
        updateMemberDto.motherId,
        updateMemberDto.spouseIds
      );
    }

    const updatedMember = await this.memberModel
      .findByIdAndUpdate(id, updateMemberDto, { new: true })
      .exec();

    if (!updatedMember) throw new NotFoundException(`Không tìm thấy thành viên với ID: ${id}`);
    return updatedMember;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID không hợp lệ');

    const result = await this.memberModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Không tìm thấy thành viên với ID: ${id}`);
  }

  async search(keyword: string): Promise<Member[]> {
    if (!keyword) return [];

    return this.memberModel
      .find({ $text: { $search: keyword } })
      .sort({ score: { $meta: 'textScore' } })
      .limit(20)
      .exec();
  }
}