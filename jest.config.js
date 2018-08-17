module.exports = {
  setupFiles: ['./test/temp-polyfills.ts','./test/setup.ts'],
  transform: {
    '^.+\\.(ts|tsx?)$': './node_modules/ts-jest/preprocessor.js',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
  ],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  modulePaths: ['src', 'node_modules'],
  globals: {
    NODE_ENV: 'test',
  },
  transformIgnorePatterns: ['/node_modules/(?!lodash-es)'],
  testPathIgnorePatterns: [],
};

