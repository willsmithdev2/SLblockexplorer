'use strict';

describe('blockexplorer.blocktable module', function() {

  beforeEach(module('blockexplorer.blocktable'));

  describe('blockTableCtrl controller', function(){

    it('should be defined', inject(function($controller) {
      //spec body
      var blockTableCtrl = $controller('blockTableCtrl');
      expect(blockTableCtrl).toBeDefined();
    }));

  });
});
