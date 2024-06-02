export enum COUNTRY {
  Belarus = 'Belarus',
  Germany = 'Germany',
  Poland = 'Poland',
  US = 'United States',
}

type CountryCode = {
  [country: string]: string;
};

export const CountriesCodes: CountryCode = {
  [COUNTRY.Belarus]: 'BY',
  [COUNTRY.Germany]: 'DE',
  [COUNTRY.Poland]: 'PL',
  [COUNTRY.US]: 'US',
};

export const CountriesNames: { [key: string]: string } = {
  BY: 'Belarus',
  DE: 'Germany',
  PL: 'Poland',
  US: 'United States',
};

export type CountryType = {
  country: COUNTRY;
  mask: string;
  postalCode: string;
  pattern: RegExp;
};

export const countries: CountryType[] = [
  { country: COUNTRY.Belarus, mask: '00-00-00', postalCode: '11-11-11', pattern: /^\d{2}-\d{2}-\d{2}$/ },
  { country: COUNTRY.Germany, mask: '00000', postalCode: '11111', pattern: /^\d{5}$/ },
  { country: COUNTRY.Poland, mask: '00-000', postalCode: '11-111', pattern: /^\d{2}-\d{3}$/ },
  { country: COUNTRY.US, mask: '00000', postalCode: '11111', pattern: /^\d{5}$/ },
];
