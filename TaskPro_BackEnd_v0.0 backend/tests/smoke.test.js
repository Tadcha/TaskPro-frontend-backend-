// Simple smoke test to verify Jest setup
describe("Test Environment Setup", () => {
  test("Jest is working correctly", () => {
    expect(true).toBe(true);
  });

  test("Environment variables are set", () => {
    expect(process.env.NODE_ENV).toBe("test");
    expect(process.env.JWT_SECRET).toBe("test-jwt-secret-key");
  });

  test("Basic math operations work", () => {
    expect(2 + 2).toBe(4);
    expect(5 * 3).toBe(15);
  });
});

// Test basic Node.js functionality
describe("Node.js Environment", () => {
  test("setTimeout works in test environment", done => {
    setTimeout(() => {
      expect(true).toBe(true);
      done();
    }, 10);
  });

  test("Promises work correctly", async () => {
    const result = await Promise.resolve("test");
    expect(result).toBe("test");
  });
});
