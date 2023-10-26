const config = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+.(js|ts)$': 'babel-jest',
  },
  // transformIgnorePatterns: ['node_modules/(?!(appblocks|@appblocks))'],
}

export default config
