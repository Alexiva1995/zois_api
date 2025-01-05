export class CreateSignalDto {
  name: string;

  buyLimit: number;

  sellLimit: number;

  buyStop: number;

  sellStop: number;

  stopLoss: number;

  takeProfit: number;

  instructions?: string;
}
