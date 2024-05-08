import { AddressDraft, CustomerDraft } from '../../../sdk/api';

import { CountriesCodes } from './countries';

interface DataIsObject {
  $D: number;
  $M: number;
  $y: number;
}

export interface RegistationInformation {
  firstName: string;
  lastName: string;
  dateOfBirth: DataIsObject;
  email: string;
  password: string;
  defaultShippingAdress: boolean;
  setAsBillingdress: boolean;
  shippingCountry: string;
  shippingPostalCode: string;
  shippingStreet: string;
  shippingCity: string;
  defaultBillingAdress?: boolean;
  billingCountry?: string;
  billingPostalCode?: string;
  billingStreet?: string;
  billingCity?: string;
}

const getCountryCode = (country: string): string => CountriesCodes[country];

const getAdressesFromRegistration = (info: RegistationInformation): AddressDraft[] => [
  {
    streetName: info.shippingStreet,
    city: info.shippingCity,
    country: getCountryCode(info.shippingCountry),
    postalCode: info.shippingPostalCode,
  },
];

const getDateOfBirth = (data: DataIsObject): string => {
  const month = (data.$M + 1).toString().padStart(2, '0');
  const day = data.$D.toString().padStart(2, '0');
  const year = data.$y.toString();
  return `${year}-${month}-${day}`;
};

export const prepareRegisterInfoToRequest = (info: RegistationInformation): CustomerDraft => ({
  firstName: info.firstName,
  lastName: info.lastName,
  dateOfBirth: getDateOfBirth(info.dateOfBirth),
  email: info.email,
  password: info.password,
  addresses: getAdressesFromRegistration(info),
});
