export const emailRules = [
  { required: true, message: 'Please input your email' },
  { pattern: /^\S+$/, message: 'Email must not contain leading or trailing whitespace' },
  {
    pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=\\[\]{};:"\\|,.<>\\/?]+$/,
    message: 'Email must contain only Latin letters',
  },
  { pattern: /^[\w.]+@[\w.]+\.\w+$/, message: 'Invalid email format' },
];

export const passwordRules = [
  { required: true, message: 'Please input your password' },
  { min: 8, message: 'Password must be at least 8 characters' },
  { pattern: /^\S+$/, message: 'Password must not contain leading or trailing whitespace' },
  {
    pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=\\[\]{};:"\\|,.<>\\/?]+$/,
    message: 'Password must contain only Latin letters',
  },
  {
    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]?)[A-Za-z\d!@#$%^&*]+$/,
    message: 'Password must contain uppercase letters, lowercase letters, digits and special characters',
  },
];

export function textRules(field: string) {
  return [
    { required: true, message: `Please input your ${field}` },
    {
      pattern: /^[a-zA-Z]+$/,
      message: `${field} must contain at least one character and no special characters or numbers`,
    },
  ];
}

const validateAge = (value: string): boolean => {
  const validAge = 13;
  const birthdayDate = new Date(value);
  const currentDate = new Date();
  const currentDateToValidAge = new Date(
    currentDate.getFullYear() - validAge,
    currentDate.getMonth(),
    currentDate.getDate(),
  );
  if (birthdayDate > currentDateToValidAge) {
    return false;
  }
  return true;
};

export const ageRules = [
  { required: true, message: 'Please input your date of birth' },
  {
    validator: (_: object, value: string) => {
      if (validateAge(value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('You should have 13 years old or older'));
    },
  },
];

export const countryRules = [{ required: true, message: `Please select your country` }];

export const streetRules = [
  { required: true, message: 'Please input your street' },
  { pattern: /^\w+/, message: 'Street must contain at least one character' },
];

export const messageForPostalCodeError = 'Please enter valid postal code';
