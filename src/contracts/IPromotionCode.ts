import Unit from './Unit';

export default interface PromotionCode {
  key: string;
  discount: number;
  unit: Unit;
  expiryDate: Date;
  generatedDate: Date;
  used: boolean;
}