import IModalContext from '@/contracts/IModalContext';
import { uuid } from 'uuidv4';
import IPromotionCode from '@/contracts/IPromotionCode';


function generateCode(body: IModalContext): IPromotionCode {
  const generatedDate = new Date();
  const key = uuid();
  const generatedCode: IPromotionCode = {
    key,
    generatedDate,
    used: false,
    ...body
  };
  return generatedCode;
}

export { generateCode };