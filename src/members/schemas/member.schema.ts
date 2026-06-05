import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    UNKNOWN = 'UNKNOWN',
}

export enum LifeStatus {
    ALIVE = 'ALIVE',
    DECEASED = 'DECEASED',
    UNKNOWN = 'UNKNOWN',
}

@Schema({ _id: false })
export class LunarDeathAnniversary {
    @Prop() day?: number;
    @Prop() month?: number;
    @Prop({ default: false }) isLeapMonth?: boolean;
    @Prop({ default: '' }) displayText?: string;
}
const LunarDeathAnniversarySchema = SchemaFactory.createForClass(LunarDeathAnniversary);

@Schema({ timestamps: true })
export class Member extends Document {
    @Prop({ required: true, trim: true }) fullName: string;
    @Prop({ default: '' }) tuName: string;
    @Prop({ required: true, enum: Gender, default: Gender.UNKNOWN }) gender: Gender;
    @Prop({ enum: LifeStatus, default: LifeStatus.UNKNOWN }) status: LifeStatus;

    @Prop({ default: null }) avatarUrl?: string;
    @Prop({ default: '' }) shortNote?: string;
    @Prop({ default: false }) isHeirless?: boolean;

    @Prop({ type: Date, default: null }) birthDate?: Date;
    @Prop({ type: Date, default: null }) deathDate?: Date;
    @Prop({ type: LunarDeathAnniversarySchema, default: null }) lunarDeathAnniversary?: LunarDeathAnniversary;
    @Prop({ default: null }) burialPlace?: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Member' }], default: [] })
    fatherIds?: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Member' }], default: [] })
    motherIds?: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Member' }], default: [] })
    spouseIds?: Types.ObjectId[];

    @Prop({ default: 1 }) orderInFamily?: number;

    @Prop({ required: true }) generation: number;
}

export const MemberSchema = SchemaFactory.createForClass(Member);

MemberSchema.index({ generation: 1 });

MemberSchema.index({ fatherIds: 1, orderInFamily: 1 });
MemberSchema.index({ motherIds: 1, orderInFamily: 1 });

MemberSchema.index({ spouseIds: 1 });