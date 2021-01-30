module.exports = {
  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "coverage",

  coveragePathIgnorePatterns: ["index.ts", "/node_modules/"],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },

  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],

  testEnvironment: "node",

  testMatch: ["**/tests/**/*.[jt]s?(x)", "**/tests/**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "\\.(ts)$": "ts-jest"
  }
};
