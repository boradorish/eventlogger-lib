export const preset = 'ts-jest';
export const testEnvironment = 'jsdom';
export const transform = {
  '^.+\\.tsx?$': 'ts-jest',
};
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx'];
export const testMatch = ['**/__tests__/**/*.(test|spec).(ts|tsx)'];
