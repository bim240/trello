module.exports = {
  displayName: "client",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    "\\.scss": require.resolve("./utils/style_mock.js"),
  },
  testMatch: ["**/__test__/**/*.js"],
};
