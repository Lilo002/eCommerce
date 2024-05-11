import { AddressDraft, CustomerDraft } from '../../../sdk/api';

import { CountriesCodes, COUNTRY } from './countries';

interface DataIsObject {
  $D: number;
  $M: number;
  $y: number;
}

export interface RegistrationInformation {
  firstName: string;
  lastName: string;
  dateOfBirth: DataIsObject;
  email: string;
  password: string;
  defaultShippingAdress: boolean;
  setAsBillingAdress: boolean;
  shippingCountry: COUNTRY;
  shippingPostalCode: string;
  shippingStreet: string;
  shippingCity: string;
  defaultBillingAdress: boolean;
  billingCountry: COUNTRY;
  billingPostalCode?: string;
  billingStreet?: string;
  billingCity?: string;
}

const getCountryCode = (country: string): string => CountriesCodes[country];

const getAdressesFromRegistration = (info: RegistrationInformation): AddressDraft[] => {
  const addresses: AddressDraft[] = [];
  addresses.push({
    streetName: info.shippingStreet,
    city: info.shippingCity,
    country: getCountryCode(info.shippingCountry),
    postalCode: info.shippingPostalCode,
  });
  if (info.setAsBillingAdress) {
    addresses.push({
      streetName: info.shippingStreet,
      city: info.shippingCity,
      country: getCountryCode(info.shippingCountry),
      postalCode: info.shippingPostalCode,
    });
  }
  if (!info.setAsBillingAdress) {
    addresses.push({
      streetName: info.billingStreet || '',
      city: info.billingCity || '',
      country: getCountryCode(info.billingCountry),
      postalCode: info.billingPostalCode || '',
    });
  }
  return addresses;
};

const getDateOfBirth = (data: DataIsObject): string => {
  const month = (data.$M + 1).toString().padStart(2, '0');
  const day = data.$D.toString().padStart(2, '0');
  const year = data.$y.toString();
  return `${year}-${month}-${day}`;
};

export const prepareRegisterInfoToRequest = (info: RegistrationInformation): CustomerDraft => ({
  firstName: info.firstName,
  lastName: info.lastName,
  dateOfBirth: getDateOfBirth(info.dateOfBirth),
  email: info.email,
  password: info.password,
  addresses: getAdressesFromRegistration(info),
});
