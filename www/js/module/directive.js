(function(){                                                                     
	
	var DirectiveLifemarket = angular.module('lifemarketDirective', []);                                     
   
    DirectiveLifemarket.directive('imageonload', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('load', function() {

                    //pour force l'Appelle de la fonction qui a été passé en paramètre  a l'attribut ou la directive imageonload
                    //scope.$apply(attrs.imageonload);

                    //alert(attrs.data-img);
                   $timeout(function() {
                        //alert(attrs.src);
                        //attrs.src = "";
                        element.attr('src', attrs.imageonload);
                    }, 10000);
                });
                element.on('error', function(){
                    alert('impossible de charger l\'image');
                    //element.attr('src', 'images/loading.gif');
                });
            }
        };
    });

})(); 
