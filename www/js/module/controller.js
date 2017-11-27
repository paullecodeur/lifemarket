(function(){                                                                     
	
	var ControllerLifemarket = angular.module('lifemarketController', []);                                     
	
	ControllerLifemarket.controller('homeCtrl', function($scope){
		
				$scope.setting.menu = 'home';
				
				//$scope.setting.title = 'home';
				
				$scope.loademore = function()
				{
					
					alert("");
					
					//$scope.test = titre;
				} 

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

	ControllerLifemarket.controller('loginCtrl', function($scope, $location){
		
		$scope.setting.menu = 'login';
		
		$scope.user = {
			id:"5",
			name:"paulo",
			email:"paulyemdji@gmail.com",
			password:"1234"
		}


		$scope.submitform = function()
		{
			$('.body-loader').css('visibility','visible'); 
			setTimeout(function() {
				$('.body-loader').css('visibility','hidden');
				$scope.userManager.login($scope.user.id, $scope.user.name, $scope.user.email, $scope.user.password);
				$location.path($scope.oderStep);
				//pour forcer  la redirection en cas d'erreur
				if (!$scope.$$phase) $scope.$apply();

			}, 3000);
			
		}

	});

	ControllerLifemarket.controller('singupCtrl', function($scope){
		
		$scope.setting.menu = 'singup';

	});


	ControllerLifemarket.controller('orderCtrl', function($scope, $location){
		
		$scope.setting.menu = 'order';

		$scope.user = $scope.userManager.getUser();

		$scope.submitOrder = function()
		{
			$('.body-loader').css('visibility','visible'); 
			setTimeout(function() {
				$('.body-loader').css('visibility','hidden');
				$scope.ProductManager.clearProduct();
				$scope.initCartSetting();
				//location.href="#home";

				$location.path("/home");
				//pour forcer  la redirection en cas d'erreur
				if (!$scope.$$phase) $scope.$apply();

			}, 3000);
			

			
		}

	});

	ControllerLifemarket.controller('productCtrl', function($scope, $routeParams){
		
		$scope.setting.menu = 'product';
		$scope.productId = $routeParams.productId;
		$scope.product =  $scope.getProduct($scope.productId);

		$scope.also = [];
		for (var i = 0; i < 6; i++) {
			
			//value = {id: $rootScope.produit[i].id, name: $rootScope.produit[i].name, summary: $rootScope.produit[i].summary, price: $rootScope.produit[i].price, quantity: 1, image: $rootScope.produit[i].image};

			$scope.also.push($scope.produit[i]);
		} 

	});

})(); 


