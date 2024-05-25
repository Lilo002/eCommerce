export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '^.+\\.(png|jpg|jpeg|gif)$': '<rootDir>/src/__mocks__/fileMock.ts',
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
