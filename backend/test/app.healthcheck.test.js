const request = require("supertest");

const healthCheck = require("../app/app.healthcheck");
const app = require("../app/app.server");

describe("app/app.healthcheck.js", () => {
  describe("GET /healthz", () => {
    let server;

    beforeEach(() => {
      server = app.listen();
    });

    afterEach(() => server.close());

    describe("when system health is OK", () => {
      it("responds with OK http status code", done => {
        healthCheck(server);

        request(server)
          .get("/healthz")
          .expect(200, done);
      });
    });

    describe("when system health is DOWN", () => {
      xit("responds with OK http status code", () => {});
    });
  });
});
