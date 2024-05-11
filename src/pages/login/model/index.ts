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
    message: 'Password must contain uppercase letters, lowercase letters, digits, and special characters',
  },
];
