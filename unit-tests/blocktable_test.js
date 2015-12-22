'use strict';

var fakeChain={"blockChain": [{
  "hash":"000000000000000006a8961c438339d28db630515ec7da0bfc62327f3dc6f314",
  "time":1422349800,
  "height":5454356
  },
  {
    "hash":"000000000000000006a8961c438339d28db630515ec7da0bfc62325645645",
    "time":1444388800,
    "height":12478066
  }]};

var latestBlockInfo= {"syncTipHash":"0000000000000000040fbb7c8bf00ea03aee212db5b844bbe9272b468c796618",
"lastblockhash":"0000000000000000040fbb7c8bf00ea03aee212db5b844bbe9272b468c796618"}


describe('blockTable module', function() {

  beforeEach(module('blockTable'));

  describe('BlockTableController controller', function(){
    var  ctrl , $httpBackend;
    beforeEach(inject(function(_$httpBackend_, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET',"https://blockexplorer.com/api/status?q=getLastBlockHash").respond(latestBlockInfo);
      $httpBackend.when('GET', 'resources/fakeBlockChain.json').respond(fakeChain);
      ctrl = $controller('BlockTableController');
    }));

    it('should be defined', function() {
      expect(ctrl).toBeDefined();
    });

    it('should store the latestBlock info when instantiated', function() {
      expect(ctrl.latestBlock).toBeUndefined();
      $httpBackend.flush();
      expect(ctrl.latestBlock).toEqual("0000000000000000040fbb7c8bf00ea03aee212db5b844bbe9272b468c796618")
    });

    it('blockChain should store an array of block information', function() {
      expect(ctrl.blockChain).toBeUndefined();
      $httpBackend.flush();
      fakeChain.blockChain.reverse();
      expect(ctrl.blockChain).toEqual(fakeChain);
    });

  });
});
