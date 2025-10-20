import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["babel-jest", { configFile: "./babel.jest.config.js" }],
  },
  transformIgnorePatterns: ["/node_modules/(?!(next)/)"],
  testMatch: ["<rootDir>/src/tests/**/*.test.(ts|tsx)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
