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
"lastblockhash":"111"}

var fakeBlock1={"hash":"111",
  "height":111,
  "time":111,
  "previousblockhash":"222"
  }

var fakeBlock2={"hash":"222",
    "height":222,
    "time":222,
    "previousblockhash":"333"
}

var fakeBlock3={"hash":"333",
      "height":333,
      "time":333
  }


describe('blockTable module', function() {

  beforeEach(module('blockTable'));

  describe('BlockTableController controller', function(){
    var  ctrl , $httpBackend;
    beforeEach(inject(function(_$httpBackend_, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET',"https://blockexplorer.com/api/status?q=getLastBlockHash").respond(latestBlockInfo);
      $httpBackend.when('GET', 'resources/fakeBlockChain.json').respond(fakeChain);
      $httpBackend.when('GET', 'https://blockexplorer.com/api/block/111').respond(fakeBlock1);
      $httpBackend.when('GET', 'https://blockexplorer.com/api/block/222').respond(fakeBlock2);
      $httpBackend.when('GET', 'https://blockexplorer.com/api/block/333').respond(fakeBlock3);

      ctrl = $controller('BlockTableController');
    }));

    it('should be defined', function() {
      expect(ctrl).toBeDefined();
    });

    it('should store the latestBlock info when instantiated', function() {
      expect(ctrl.latestBlockHash).toBeUndefined();
      $httpBackend.flush();
      expect(ctrl.latestBlockHash).toEqual("111")
    });


    it('getBlockData should create a list of objects containing the hash,timestamp and height of each block in block chain', function() {
      $httpBackend.flush();
      var finalChain=ctrl.blockChain;
      expect(ctrl.blockChain).toEqual(
      [
        {
            "index":1,
            "hash":"111",
            "height":111,
            "time":'01/01/1970 12:01AM'
        },
        {
          "index":2,
            "hash":"222",
            "height":222,
            "time":'01/01/1970 12:03AM'
        },
        {
          "index":3,
            "hash":"333",
            "height":333,
            "time":'01/01/1970 12:05AM'
        }
        ]
      )
    });

  });
});
