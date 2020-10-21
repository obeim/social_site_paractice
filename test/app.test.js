const expect = require("expect");
const { app } = require("../app");
const request = require("supertest");
const { User } = require("../models/User");
const { before } = require("mocha");
const users = [
  {
    email: "obei.m2017@gmail.com",
    name: "obei",
    password: "123456",
  },
  { email: "obei@m.com", name: "dude", password: "123456" },
];
const posts = [
  {
    title: "the test post",
    body: "the test post body",
  },
  {},
];
beforeEach((done) => {
  User.deleteMany({}).then(() => {
    done();
  });
});
beforeEach((done) => {
  User.create(users[0]).then(() => {
    done();
  });
});

describe("/POST signup", () => {
  const user = { email: "m@m.com", password: "123456", name: "test user" };
  it("should create a new user and create token", (done) => {
    request(app).post("/signup").send(user).expect(200).end(done);
  });
  it("should return 400 when data is invalid or email is taken", (done) => {
    const user = { email: "mm.com", password: "123456", name: "test user" };
    request(app).post("/signup").send(user).expect(400).end(done);
  });
});
describe("/POST login", () => {
  it("should return 200 when login is valid", (done) => {
    const user = { email: "obei.m2017@gmail.com", password: "123456" };
    request(app).post("/login").send(user).expect(200).end(done);
  });
  it("should return 400 if user does not exist", (done) => {
    const user = { email: "m@a.com", password: "2222222" };
    request(app).post("/login").send(user).expect(400).end(done);
  });
  it("should return 404 if password is wrong", (done) => {
    request(app)
      .post("/login")
      .send({ email: "obei.m2017@gmail.com", password: "1456" })
      .expect(404)
      .end(done);
  });
  it("should return 400 if user does not exist", (done) => {
    request(app)
      .post("/login")
      .send({ email: "obei.m2017@l.com", password: "1456" })
      .expect(400)
      .end(done);
  });
  it("should log out ", (done) => {
    request(app).get("/logout").expect(200).end(done);
  });
});
describe("/POST posts", () => {
  it(" should return 404 because we are not logged in", (done) => {
    request(app)
      .post("/adminpanel/posts/add")
      .send({ title: "title", body: "gsssss" })
      .expect(404)
      .end(done);
  });
});
