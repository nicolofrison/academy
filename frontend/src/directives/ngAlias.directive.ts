import appModule from "../app.module";

appModule
  .directive('ngAlias', ['$compile', function ngAlias($compile) {
    return {
      restrict: "A",
      link: function(scope: any, element: any, attrs: any) {
        var args = attrs.ngAlias.split('as').map(function(elm: any){return elm.replace(/ /g,'')});

        scope[args[0]] = '';

        var dot: string[] = args[1].split('.');

        var object: any = {};

        dot.forEach(function(value: any, index: any){
          index === 0
            ? object = scope[value]
            : object = object[value] === null ? object[value] = {} : object[value];
        });

        console.log(object)

        scope[args[0]] = object;
      }
    };
  }]);
