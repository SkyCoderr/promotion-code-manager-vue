import Unit from './Unit';

export default interface IRowItem {
  key: string;
  discount: number;
  unit: Unit;
  expiry_date: Date;
  generated_date: Date;
}