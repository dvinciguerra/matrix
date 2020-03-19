const request = require("supertest");

const app = require("../app/app.server");

describe("app.server.js", () => {
  describe("GET /", () => {
    it("responds with OK http status code", done => {
      request(app)
        .get("/")
        .expect(200, done);
    });

    describe("when rendering", () => {
      it("returns the googleapi tag", () => {
        request(app)
          .get("/")
          .then(res => {
            expect(res.text).toMatch(
              /<script src="https:\/\/apis.google.com\/js\/platform.js"><\/script>/
            );
          });
      });

      it("returns <meta> google-signin-client_id", () => {
        request(app)
          .get("/")
          .then(res => {
            expect(res.text).toMatch(
              /<meta name="google-signin-client_id" content="">/
            );
          });
      });

      it("returns the element to render react app", () => {
        request(app)
          .get("/")
          .then(res => {
            expect(res.text).toMatch(/<div id="application"><\/div>/);
          });
      });

      it("returns script tag calling login.js", () => {
        request(app)
          .get("/")
          .then(res => {
            expect(res.text).toMatch(
              /<script src="\/dist\/login(-.[a-z0-9]+)?\.js"><\/script>/
            );
          });
      });
    });
  });
});
