'use strict';

describe('blockTable module', function() {

  var latestBlockJson={"hash":"000000000000000006a8961c438339d28db630515ec7da0bfc62327f3dc6f314",
    "confirmations":11440,
    "size":3182,
    "height":378066,
    "version":3,
    "merkleroot":"d3f0e717a577ae8139c7e3261da26f3dc66a618bd4661e03b9860cb738b55806",
    "tx":[],
      "time":1444349800,
      "nonce":1438955897,
      "bits":"18121472",
      "difficulty":60813224039.440346,
      "chainwork":"0000000000000000000000000000000000000000000aeb55a866a589db70f122",
      "previousblockhash":"00000000000000000a5093e24e1f43c509e2cd51dd3ec38c739a92de83665b5a",
      "nextblockhash":"00000000000000000ef9af22be9e30034d259e9189319350b0bcfd5df42d6bd1",
      "reward":25,
      "isMainChain":true}

  beforeEach(module('blockTable'));

  describe('BlockTableController controller', function(){
    var  ctrl , $httpBackend;
    beforeEach(inject(function(_$httpBackend_, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('resources/latest-block.json').
          respond(latestBlockJson);

      ctrl = $controller('BlockTableController');
    }));

    it('should be defined', function() {
      expect(ctrl).toBeDefined();
    });

    it('should store the latestBlock info when instantiated', function() {
      expect(ctrl.latestBlock).toBeUndefined();
      $httpBackend.flush();
      expect(ctrl.latestBlock).toEqual(latestBlockJson)
    });

  });
});
