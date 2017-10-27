var Account = artifacts.require("Account");
chai = require("chai");
chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

expect = chai.expect;

contract("Account", function(accounts) {
  describe("Deployed contract", function() {
    it("Get an instance", function() {
      return Account.deployed().then(function(instance){
        account = instance;
        expect(account).to.be.not.null;
      });
    });
 });

  describe("VAriables",function(){
	describe("Name", function(){
		it("should set the name properly", function(){
			return account.setName("My account").then(function(response){
				expect(response).to.not.be.an("error");
			});
		});

		it("should get the name saved previously", function(){
			return account.name().then(function(name){
				expect(name).to.be.equal("My account");
			});
		});

		it("should reject saving a name from  another  account", function(){
			return expect (account.setName("Stole account",{"from": accounts[4]})).to.be.eventually.rejected;	
		});


		it("should get the name saved originally", function(){
			return account.name().then(function(name){
				expect(name).to.be.equal("My account");
			});
		});
	});
  });

});