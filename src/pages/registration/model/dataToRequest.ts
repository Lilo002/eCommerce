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
  defaultShippingAddress: boolean;
  setAsBillingAddress: boolean;
  shippingCountry: COUNTRY;
  shippingPostalCode: string;
  shippingStreet: string;
  shippingCity: string;
  defaultBillingAddress: boolean;
  billingCountry: COUNTRY;
  billingPostalCode?: string;
  billingStreet?: string;
  billingCity?: string;
}

const getCountryCode = (country: string): string => CountriesCodes[country];

const getAddressesFromRegistration = (
  shippingStreet: string,
  shippingCity: string,
  shippingCountry: string,
  shippingPostalCode: string,
  setAsBillingAddress: boolean,
  billingStreet: string | undefined,
  billingCity: string | undefined,
  billingCountry: string,
  billingPostalCode: string | undefined,
): [AddressDraft, AddressDraft] => [
  {
    streetName: shippingStreet,
    city: shippingCity,
    country: getCountryCode(shippingCountry),
    postalCode: shippingPostalCode,
  },
  !setAsBillingAddress
    ? {
        streetName: billingStreet || '',
        city: billingCity || '',
        country: getCountryCode(billingCountry),
        postalCode: billingPostalCode || '',
      }
    : {
        streetName: shippingStreet,
        city: shippingCity,
        country: getCountryCode(shippingCountry),
        postalCode: shippingPostalCode,
      },
];

const getDateOfBirth = (data: DataIsObject): string => {
  const month = (data.$M + 1).toString().padStart(2, '0');
  const day = data.$D.toString().padStart(2, '0');
  const year = data.$y.toString();
  return `${year}-${month}-${day}`;
};

export const prepareRegisterInfoToRequest = ({
  firstName,
  lastName,
  dateOfBirth,
  email,
  password,
  shippingStreet,
  shippingCity,
  shippingCountry,
  shippingPostalCode,
  setAsBillingAddress,
  billingStreet,
  billingCity,
  billingCountry,
  billingPostalCode,
}: RegistrationInformation): CustomerDraft => ({
  firstName,
  lastName,
  dateOfBirth: getDateOfBirth(dateOfBirth),
  email,
  password,
  addresses: getAddressesFromRegistration(
    shippingStreet,
    shippingCity,
    shippingCountry,
    shippingPostalCode,
    setAsBillingAddress,
    billingStreet,
    billingCity,
    billingCountry,
    billingPostalCode,
  ),
});
