const jwt = require("jsonwebtoken");
const { createToken } = require("../../helpers/tokens");
const { SECRET_KEY } = require("../../config");

describe("createToken", function () {
  test("works: not admin", function () {
    const token = createToken({ username: "test", isSiteadmin: false });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      isSiteAdmin: false,
    });
  });

  test("works: admin", function () {
    const token = createToken({ username: "test", isSiteAdmin: true });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      isSiteAdmin: true,
    });
  });

  test("works: default no admin", function () {
    // given the security risk if this didn't work, checking this specifically
    const token = createToken({ username: "test" });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      isSiteAdmin: false,
    });
  });
});
