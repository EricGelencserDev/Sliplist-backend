const request = require('supertest');
const app = require('../app');

jest.mock('../models/available');
jest.mock('../models/user');

describe("App", () => {
  it("Tests the root path", () => {
    return request(app).get("/").then(response => {
      expect(response.statusCode).toBe(200);
    });
  });

  //Begins testing Availability functionality and validating.

  it("Lists availabilities", () => {
    return request(app).get("/availabilities").then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body.availabilities[0].loa).toBe(35);
    });
  });

  it("Creates availabilities", () => {
    return request(app).post("/availabilities").send({
      loa: 45,
      kind: 'mooring',
      location: 'C7 Shutter Island Marina',
      description: "End tie at dock C, draft is 10 feet. Near the slip is access to the marina and downtown bars."
    }).then(response => {
      expect(response.statusCode).toBe(201);
      expect(response.body.available.loa).toBe(45);
      expect(response.body.available.kind).toBe("mooring");
      expect(response.body.available.location).toBe('C7 Shutter Island Marina');
      expect(response.body.available.description).toBe("End tie at dock C, draft is 10 feet. Near the slip is access to the marina and downtown bars.");
    });
  });

  it("Validates LOA when creating availability", () => {
    return request(app).post("/availabilities").send({
      kind: "slip",
      location: "c7 dick marina",
      description: "End tie 40 draft"
    }).then(response => {
      expect(response.statusCode).toBe(400);
      const error = response.body.errors.validations[0];
      expect(error.param).toBe('loa');
      expect(error.msg).toBe('Is required');
    });
  });

  it("Validates 'kind' when creating availability", () => {
    return request(app).post("/availabilities").send({
      loa: 35,
      location: "c7 dick marina",
      description: "End tie 40 draft"
    }).then(response => {
      expect(response.statusCode).toBe(400);
      const error = response.body.errors.validations[0];
      expect(error.param).toBe('kind');
      expect(error.msg).toBe('Is required');
    });
  });

  it("Validates location when creating availability", () => {
    return request(app).post("/availabilities").send({
      loa: 35,
      kind: 'slip',
      description: "End tie at dock C, the draft is roughly 20 feet. Near the moor is access to the marina and downtown bars."
    }).then(response => {
      expect(response.statusCode).toBe(400);
      const error = response.body.errors.validations[0];
      expect(error.param).toBe('location');
      expect(error.msg).toBe('Is required');
    });
  });

  it("Validates description when creating availability", () => {
    return request(app).post("/availabilities").send({
      loa: 35,
      kind: 'slip',
      location: "c7 dick marina"
    }).then(response => {
      expect(response.statusCode).toBe(400);
      const error = response.body.errors.validations[0];
      expect(error.param).toBe('description');
      expect(error.msg).toBe('Is required');
    });
  });

  //Begin testing the User model functionality

  it("Creates new Users", () => {
    return request(app).post("/users").send({
      firstname: 'John',
      lastname: 'Goodman',
      email: 'goodJohn@gmail.com',
      password: 'Yo',
      phone: '1(805)218-2171'
    }).then(response => {
      expect(response.statusCode).toBe(201);
      expect(response.body.user.firstname).toBe('John');
      expect(response.body.user.lastname).toBe('Goodman');
      expect(response.body.user.email).toBe('goodJohn@gmail.com');
      expect(response.body.user.password).toBe('Yo');
      expect(response.body.user.phone).toBe('1(805)218-2171');
    });
  });
  it("Validates firstname when creating a new user", () => {
    return request(app).post("/users").send({
      lastname: 'Vanderbilt',
      password: 'Empty',
      email: 'mrtoodVee@gmail.com',
      phone: '1(805)217-2171'
    }).then(response => {
      expect(response.statusCode).toBe(400);
      const error = response.body.errors.validations[0];
      expect(error.param).toBe('firstname');
      expect(error.msg).toBe('Is required');
    });
  });
  it("Validates lastname when creating a new user", () => {
    return request(app).post("/users").send({
      firstname: 'Tood',
      password: 'Empty',
      email: 'mrtoodVee@gmail.com',
      phone: '1(805)217-2171'
    }).then(response => {
      expect(response.statusCode).toBe(400);
      const error = response.body.errors.validations[0];
      expect(error.param).toBe('lastname');
      expect(error.msg).toBe('Is required');
    });
  });
  it("Validates password when creating a new user", () => {
    return request(app).post("/users").send({
      firstname: 'Tood',
      lastname: 'Vanderbilt',
      email: 'mrtoodVee@gmail.com',
      phone: '1(805)217-2171'
    }).then(response => {
      expect(response.statusCode).toBe(400);
      const error = response.body.errors.validations[0];
      expect(error.param).toBe('password');
      expect(error.msg).toBe('Is required');
    });
  });
  it("Validates email when creating a new user", () => {
    return request(app).post("/users").send({
      firstname: 'Tood',
      lastname: 'Vanderbilt',
      password: 'Empty',
      phone: '1(805)217-2171'
    }).then(response => {
      expect(response.statusCode).toBe(400);
      const error = response.body.errors.validations[0];
      expect(error.param).toBe('email');
      expect(error.msg).toBe('Is required');
    });
  });
});