var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin    sets up server to use
chai.use(chaiHttp);

var request;

describe("GET /api/examples", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server); //starts up test server
    return db.sequelize.sync({ force: true });  //resets the database
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.ToolSeq.bulkCreate([ //adds 2 rows to db
      { tool: "First Tool", category: "First Category", description: "First Description", price: "10", quantity: "100", owner: "Jeff" },
      { tool: "Second Tool", category: "Second Category", description: "Second Description", price: "20", quantity: "200", owner: "Joe" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/examples").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2); //only have 2 records

        expect(responseBody[0]) //expect first element in array to be a obj
          .to.be.an("object")
          .that.includes({ tool: "First Tool", category: "First Category", description: "First Description", price: "10", quantity: "100", owner: "Jeff" });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ tool: "Second Tool", category: "Second Category", description: "Second Description", price: "20", quantity: "200", owner: "Joe" });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});

//npm run test        will run the test with in package.json with mocha (can change mocha to something else)
