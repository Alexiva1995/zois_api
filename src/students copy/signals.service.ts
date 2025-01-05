import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Signal } from './interfaces/signal.interface';

@Injectable()
export class SignalService {
  constructor(
   @InjectModel("Signals") private readonly signalModel: Model<Signal>,
  ) {}

  async createSignal(data: Partial<Signal>): Promise<Signal> {
    const signal = new this.signalModel(data);
    return signal.save();
  }

  async findLatestByProfessor(professorId: string, limit: number): Promise<Signal[]> {
    return this.signalModel
      .find({ professorId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async findByProfessorWithFilters(professorId: string, filters: any): Promise<any[]> {
    if (!this.isValidObjectId(professorId)) {
      return [];
    }

    const signals = await this.signalModel.find({ professorId, ...filters }).exec();
    return signals || [];
  }

  private isValidObjectId(id: string): boolean {
    const ObjectId = require('mongoose').Types.ObjectId;
    return ObjectId.isValid(id);
  }
}
