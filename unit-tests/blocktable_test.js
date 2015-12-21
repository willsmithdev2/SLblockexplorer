'use strict';

describe('blockTable module', function() {

  beforeEach(module('blockTable'));

  describe('BlockTableController controller', function(){
    var  ctrl , $httpBackend;
    beforeEach(inject(function(_$httpBackend_, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('resources/latest-block.json').
          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      ctrl = $controller('BlockTableController');
    }));

    it('should be defined', function() {
      //spec body
      expect(ctrl).toBeDefined();
    });

  });
});
