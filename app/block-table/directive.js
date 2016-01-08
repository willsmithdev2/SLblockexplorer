define(['./controller', 'text!./template.html'], function(controller, template) {
  function BlockTableDirective() {
    return {
      restrict :'E',
      scope: {},
      template: template,
      controller: controller,
      controllerAs: "blockTableCtrl"
    };
  }

  return BlockTableDirective;
});
