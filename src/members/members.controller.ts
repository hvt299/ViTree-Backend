import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@ApiTags('Members')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @Post()
  @ApiOperation({ summary: 'Tạo mới một thành viên' })
  @ApiResponse({ status: 201, description: 'Thành viên đã được tạo thành công.' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy ID quan hệ (Cha/Mẹ/Vợ/Chồng).' })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách thành viên (có phân trang)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Số trang (mặc định: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Số lượng / trang (mặc định: 50)' })
  @ApiQuery({ name: 'generation', required: false, type: Number, description: 'Lọc theo đời thứ mấy' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách thành viên và tổng số.' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('generation') generation?: string,
  ) {
    return this.membersService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 50,
      generation ? parseInt(generation, 10) : undefined
    );
  }

  @Get('search')
  @ApiOperation({ summary: 'Tìm kiếm thành viên theo tên' })
  @ApiQuery({ name: 'q', required: true, type: String, description: 'Từ khóa tìm kiếm' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách kết quả tìm kiếm (tối đa 20).' })
  search(@Query('q') keyword: string) {
    return this.membersService.search(keyword);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết một thành viên' })
  @ApiResponse({ status: 200, description: 'Trả về chi tiết thành viên.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thành viên hoặc ID không hợp lệ.' })
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin thành viên' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thành viên hoặc ID quan hệ không hợp lệ.' })
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa một thành viên' })
  @ApiResponse({ status: 200, description: 'Xóa thành công.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thành viên.' })
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }
}