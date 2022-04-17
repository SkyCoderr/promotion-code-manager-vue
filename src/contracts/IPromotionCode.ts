import { Moment } from 'moment';
import {Unit} from './Unit';

export default interface PromotionCode {
    key: string,
    discount: number,
    unit: Unit,
    expiry_date: Moment,
}