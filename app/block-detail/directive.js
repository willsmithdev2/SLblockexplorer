define(['./controller','text!./template.html'], function(controller,template) {
  function BlockDetailDirective() {
    return {
      restrict :'E',
      scope: {},
      template: template,
      controller: controller,
      controllerAs: "blockDetailCtrl"
    };
  }

  return BlockDetailDirective;
});
