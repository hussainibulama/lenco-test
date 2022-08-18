let chai = require("chai");
let chaiHttp = require("chai-http");
let chance = require("chance").Chance();
let { hashPassword, comparePassword } = require("../src/helpers/password");
let { jwtSign, jwtVerify, jwtDecode } = require("../src/helpers/token");
const expect = chai.expect;

chai.use(chaiHttp);
describe("middleware tests", () => {
  beforeEach((done) => {
    done();
  });
  describe("/password", () => {
    it("password should be hashed", (done) => {
      const resp = hashPassword(chance.string());
      expect(resp).to.be.an("string");
      expect(resp).to.have.lengthOf.above(30);
      done();
    });
    it("password should be the same", (done) => {
      let p = "pass234";
      const resp = hashPassword(p);
      const check = comparePassword(resp, p);
      expect(check).to.be.true;
      expect(resp).to.have.lengthOf.above(30);
      done();
    });
  });
  describe("token", () => {
    it("should generate token", (done) => {
      const resp = jwtSign(chance.string());
      expect(resp).to.be.an("string");
      expect(resp).to.have.lengthOf.above(30);
      done();
    });
    it("should verify token", (done) => {
      let p = "pass234";
      const resp = jwtSign(p);
      const check = jwtVerify(resp);
      expect(check).to.be.an("object");
      expect(check).to.have.property("id");
      expect(check).to.have.property("exp");
      done();
    });
    it("should decode token", (done) => {
      let p = "pass234";
      const resp = jwtSign(p);
      const check = jwtDecode(resp);
      expect(check).to.be.an("object");
      expect(check).to.have.property("id");
      expect(check).to.have.property("exp");
      done();
    });
  });
});
