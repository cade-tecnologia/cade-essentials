import AndState from '../and/AndState';
import PhoneNumber from './PhoneNumber';

enum PhoneTypes {
  WITH_DDI = 'WITH_DDI',
  WITH_DDI_BRAZIL = 'WITH_DDI_BRAZIL',
  WITH_DDD = 'WITH_DDD',
  WITH_NINE = 'WITH_NINE',
}
export default PhoneTypes;

export type WithReturnType = AndState<PhoneNumber, PhoneTypes>;
