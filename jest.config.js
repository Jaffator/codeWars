module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "./jest-report/index.html",
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],
};
