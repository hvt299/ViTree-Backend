import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Member extends Document {
    @Prop({ required: true, trim: true, index: 'text' })
    fullName: string;

    @Prop({ required: true, enum: ['MALE', 'FEMALE', 'UNKNOWN'] })
    gender: string;

    @Prop({ default: null })
    avatarUrl: string;

    @Prop({ default: '' })
    shortNote: string;

    @Prop({ default: true })
    isAlive: boolean;

    @Prop({ default: null })
    birthDate: string;

    @Prop({ default: null })
    deathDate: string;

    @Prop({ default: null })
    burialPlace: string;

    @Prop({ type: Types.ObjectId, ref: 'Member', default: null, index: true })
    fatherId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Member', default: null, index: true })
    motherId: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Member' }], default: [] })
    spouseIds: Types.ObjectId[];

    @Prop({ default: 1 })
    orderInFamily: number;

    @Prop({ default: 1, index: true })
    generation: number;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
MemberSchema.index({ fullName: 'text' });