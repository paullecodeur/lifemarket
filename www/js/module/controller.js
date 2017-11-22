(function(){                                                                     
	
	var ControllerLifemarket = angular.module('lifemarketController', []);                                     
	
	ControllerLifemarket.controller('homeCtrl', function($scope){
		
				$scope.setting.menu = 'home';
				
				//$scope.setting.title = 'home';
				
					 
				/* $scope.addProduct = function(id, name, summary, price, quantity, image)
				{
					ProductManager.setProduct(id, name, summary, 2500, 2, "'" + image + "'");
					alert(name);
					
					//$scope.test = titre;
				} */
	});

	ControllerLifemarket.controller('aboutCtrl', function($scope){
		
		$scope.setting.menu = 'about';

	});

	ControllerLifemarket.controller('cartCtrl', function($scope){
		
		$scope.setting.menu = 'cart';
		
		$scope.setting.panier = $scope.ProductManager.getAllProducts();
		$scope.setting.prixTotal = $scope.ProductManager.getTotalPrice();	

	});

	ControllerLifemarket.controller('contactCtrl', function($scope){
		
		$scope.setting.menu = 'contact';	

	});

	ControllerLifemarket.controller('loginCtrl', function($scope){
		
		$scope.setting.menu = 'login';

	});

	ControllerLifemarket.controller('singupCtrl', function($scope){
		
		$scope.setting.menu = 'singup';

	});

	ControllerLifemarket.controller('productCtrl', function($scope, $routeParams){
		
		$scope.setting.menu = 'product';
		$scope.productId = $routeParams.productId;
		$scope.product =  $scope.getProduct($scope.productId);

	});

})(); 


