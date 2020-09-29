const chai = require('chai');
const chaiHttp = require('chai-http');
const { report } = require('../../../testing');

const server = require('../dist/index').default;

chai.should();
chai.use(chaiHttp);

describe("Test API",()=>{//function of mocha.js

    describe(' GET "/" is the first route that should be tested',()=>{
        it("It should return our react application",(done)=>{
            chai.request(server).get('/').end((err,response)=>{
                response.should.have.status(200);
                done();
            });
        });
    });

    describe("Testing user's routes",()=>{
        describe("POST '/signup' is the first user's route that should be tested",()=>{
            it("It should return one userSaved and one token",(done)=>{
                const data = {
                    fullname: "Mariana del carmen cruz cruz", 
                    username: "Mari",  
                    email: "test3@test.com", 
                    password:"passwordtestmari"
                } 
                chai.request(server).post('/signup').send(data).end((err,response)=>{
                    response.should.have.status(200);
                    if(!response.body.ok){//For user already in db.
                        response.body.should.have.property("message");
                        response.body.message.should.be.a("string");
                        response.body.message.should.eq("user is already in db");
                    }else{//For new Users
                        response.body.should.have.property("token");
                        response.body.token.should.be.a("string");
                        response.body.should.have.property("userSaved");
                        response.body.userSaved.should.be.an("object");
                        response.body.userSaved.should.have.property("fullname").and.should.be.a("string");
                        response.body.userSaved.should.have.property("username").and.should.be.a("string");
                    }
                    done();
                });
            });
        });

        describe("POST '/login' it's the second route that should be tested before using our API",()=>{
            it("it should return one userSaved and one token, we need to provide an email and a password ",(done)=>{
                const data = {
                    email: "test3@test.co", 
                    password:"passwordtestmari"
                }
                chai.request(server).post('/login').send(data).end((err, response)=>{
                    response.body.should.have.property("ok");
                    if(!response.body.ok){
                        response.body.should.have.property("message").eql("email or password wrong");
                    }else{
                        response.body.should.have.property("token");
                        response.body.should.have.property("userSaved");

                        response.body.token.should.be.a("string");
                        response.body.userSaved.should.be.an('object');

                        response.body.userSaved.should.have.property("fullname");
                        response.body.userSaved.should.have.property("username");
                    }
                    done();
                });;
            });
        });

        
    });

})




