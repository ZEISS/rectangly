module.exports = {
  setupFiles: ['./test/unit/temp-polyfills.ts','./test/unit/setup.ts'],
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
  moduleNameMapper: {
    '@zeiss/pharos': '<rootDir>/node_modules/@zeiss/pharos/dist/es5',
  },
};

