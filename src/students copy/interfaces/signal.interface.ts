import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Signal extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  buyLimit: number;

  @Prop({ required: true })
  sellLimit: number;

  @Prop({ required: true })
  buyStop: number;

  @Prop({ required: true })
  sellStop: number;

  @Prop({ required: true })
  stopLoss: number;

  @Prop({ required: true })
  takeProfit: number;

  @Prop()
  instructions: string;

  @Prop({ type: Types.ObjectId, ref: "Professor", required: true })
  professorId: Types.ObjectId;
}
