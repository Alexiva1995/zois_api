import mongoose, { Schema, Document } from "mongoose";

export interface ISignal extends Document {
  name: string;
  buyLimit: number;
  sellLimit: number;
  buyStop: number;
  sellStop: number;
  stopLoss: number;
  takeProfit: number;
  instructions?: string;
  professorId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export const SignalSchema = new mongoose.Schema<ISignal>(
  {
    name: {
      type: String,
      required: true
    },
    buyLimit: {
      type: Number,
      required: true
    },
    sellLimit: {
      type: Number,
      required: true
    },
    buyStop: {
      type: Number,
      required: true
    },
    sellStop: {
      type: Number,
      required: true
    },
    stopLoss: {
      type: Number,
      required: true
    },
    takeProfit: {
      type: Number,
      required: true
    },
    instructions: {
      type: String,
      default: ""
    },
    professorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professor",
      required: true
    }
  },
  {
    timestamps: true
  }
);
