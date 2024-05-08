enum COUNTRY {
  Belarus = 'Belarus',
  Canada = 'Canada',
  Poland = 'Poland',
  US = 'Unates States',
}

type CountryCode = {
  [country: string]: string;
};

export const CountriesCodes: CountryCode = {
  [COUNTRY.Belarus]: 'BY',
  [COUNTRY.Canada]: 'CA',
  [COUNTRY.Poland]: 'PL',
  [COUNTRY.US]: 'US',
};

export type CountryType = {
  country: COUNTRY;
  mask: string;
  postalCode: string;
  pattern: RegExp;
};

export const countries: CountryType[] = [
  { country: COUNTRY.Belarus, mask: '00-00-00', postalCode: '11-11-11', pattern: /^\d{2}-\d{2}-\d{2}$/ },
  { country: COUNTRY.Canada, mask: 'A0A 0A0', postalCode: 'A1A 1A1', pattern: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/ },
  { country: COUNTRY.Poland, mask: '00-000', postalCode: '11-111', pattern: /^\d{2}-\d{3}$/ },
  { country: COUNTRY.US, mask: '00000', postalCode: '11111', pattern: /^\d{5}$/ },
];
