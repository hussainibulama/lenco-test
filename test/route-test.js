let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/server");
let should = chai.should();
let chance = require("chance").Chance();
const expect = chai.expect;

chai.use(chaiHttp);
describe("unit route test", () => {
  beforeEach((done) => {
    done();
  });
  describe("/GET book", () => {
    it("user should login", (done) => {
      let user = {
        email: "hussainibulama@yahoo.com",
        password: "Hussaini",
      };
      chai
        .request(server)
        .post("/v1/user/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.data.should.have.property("accessToken");
          done();
        });
    });
    it("user can create", (done) => {
      let user = {
        name: chance.name(),
        email: chance.email(),
        password: chance.string(),
      };
      chai
        .request(server)
        .post("/v1/user/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.data.should.have.property("name");
          res.body.data.should.have.property("email");
          done();
        });
    });
    it("user can transfer", (done) => {
      let user = {
        email: "hussainibulama02@gmail.com",
        amount: 1,
      };
      chai
        .request(server)
        .patch("/v1/user/transfer")
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          expect(res.body.status).to.deep.equal("error");
          expect(res.body.message).to.deep.equal("invalid header");

          done();
        });
    });
    it("user can fund wallet", (done) => {
      let user = {
        amount: chance.prime(),
      };
      chai
        .request(server)
        .patch("/v1/user/update-balance")
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          expect(res.body.status).to.deep.equal("error");
          expect(res.body.message).to.deep.equal("invalid header");
          done();
        });
    });
    it("user can withdraw", (done) => {
      let user = {
        amount: 1,
      };
      chai
        .request(server)
        .patch("/v1/user/withdraw")
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          expect(res.body.status).to.deep.equal("error");
          expect(res.body.message).to.deep.equal("invalid header");
          done();
        });
    });
  });
});
