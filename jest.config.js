module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: "src",
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  setupFilesAfterEnv: [
    "<rootDir>/__test__/setup.ts"
  ],
  setupFiles: [
    "dotenv/config"
  ],
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  moduleNameMapper: {
    "@presentation": [
      "<rootDir>/presentation/index.ts"
    ],
    "@locales": [
      "<rootDir>/locales/index.ts"
    ],
    "@infrastructure": [
      "<rootDir>/infrastructure/index.ts"
    ],
    "@application": [
      "<rootDir>/application/index.ts"
    ],
    "@domain": [
      "<rootDir>/domain/index.ts"
    ],
    "@/(.*)": "<rootDir>/src$1"

  }
};