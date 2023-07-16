import type { IElement, IEntity } from './generic';

export interface ICustomer extends IEntity {
  href: string;
  id: string;
  firstName: string;
  lastName: string;
  marketingAllowed: boolean;
  customerSince: number;
  emailAddresses: IElement<EmailAddressesElement>;
  phoneNumbers: IElement<PhoneNumbersElement>;
  emailAddressesList: EmailAddressesElement[];
  phoneNumbersList: PhoneNumbersElement[];
}

export interface EmailAddressesElement {
  emailAddress: string;
  primaryEmail: boolean;
}

export interface PhoneNumbersElement {
  phoneNumber: string;
}
