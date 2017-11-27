(function(){                                                                     
	
	var AppLifemarket = angular.module('lifemarketApp', ['lifemarketService', 'lifemarketController', 'lifemarketDirective', 'ngRoute','ngAnimate', 'infinite-scroll']);                                     
	
	AppLifemarket.config(["$routeProvider", function($routeProvider){
		$routeProvider
			.when('/', {templateUrl: 'view/home.html', controller: 'homeCtrl'})
			.when('/about', {templateUrl: 'view/about.html', controller: 'aboutCtrl'})
			.when('/contact', {templateUrl: 'view/contact.html', controller: 'contactCtrl'})
			.when('/login', {templateUrl: 'view/login.html', controller: 'loginCtrl'})
			.when('/singup', {templateUrl: 'view/singup.html', controller: 'singupCtrl'})
			.when('/cart', {templateUrl: 'view/cart.html', controller: 'cartCtrl'})
			.when('/order', {
				templateUrl: 'view/order.html', 
				controller: 'orderCtrl',
				resolve:{
					"check":function(UserManager, $location, $rootScope){
						if(!UserManager.loginCheck())
						{

							$rootScope.oderStep = '/order';
							$location.path("/login");
							//pour forcer  la redirection en cas d'erreur
							if (!$rootScope.$$phase) $rootScope.$apply();

						}
					}

				}
			})
			.when('/product/:productId', {templateUrl: 'view/product.html', controller: 'productCtrl'})
			.otherwise({redirectTo: '/'});
			
	}]);
	
  AppLifemarket.run(['$rootScope', '$timeout', '$location', 'ProductManager', 'UserManager', function($rootScope, $timeout, $location, ProductManager, UserManager) {
	  
		$rootScope.setting = {'title': '', 'menu': 'home', 'totalQuantity': 0, 'prixTotal': 0, 'refresh':0};
		$rootScope.produit = [
		  {id: 1, name: 'Blanc de poulet', summary: 'Blanc de poulet', price: 3000, quantity: 1, image: 'images/of16.png'},
		  {id: 2, name: 'Ailes de poulet', summary: 'Ailes de poulet', price: 2000, quantity: 1, image: 'images/of17.png'},
		  {id: 3, name: 'Cuisse de poulet', summary: 'Cuisse de poulet', price: 3500, quantity: 1, image: 'images/of18.png'},
		  {id: 4, name: 'Poulet vide STSP', summary: 'Blanc de poulet', price: 4000, quantity: 1, image: 'images/of19.png'},
		  {id: 5, name: 'Poulet entier avec tête/cou/pattes', summary: 'Poulet entier', price: 5000, quantity: 1, image: 'images/of20.png'},
		  {id: 6, name: 'Fricassé de poulet', summary: 'Fricassé de poulet', price: 1500, quantity: 1, image: 'images/of21.png'},
		]

		//variable qui contient l'url de l'etape du processus de commande en cours
		$rootScope.oderStep = $location.path();


		//detection du changement de route
		/* $rootScope.$on("$routeChangeSuccess", function (scope, next, current) {
			$rootScope.transitionState = "active"
			//alert('ok');
		}); */

		/* $rootScope.$on('$routeChangeError', function () {
			
		}); */

		// recuperation du service des gestion des produits
		$rootScope.ProductManager = ProductManager;

		// recuperation du service des gestion des users
		$rootScope.userManager = UserManager;

		
		$rootScope.buyProduct = function(id, name, summary, price, quantity, image) {
			
			$rootScope.ProductManager.setProduct(id, name, summary, price, quantity, image);
			//initialisation des paramètres
			$rootScope.initCartSetting();
			
			//$('#my-cart-badge').text(getTotalQuantity());
			toastr.options = {
					//'closeButton' : true,
					//'progressBar' : true,
					'onclick' : function() { 
					//on affiche la panier
					
							$location.path("/cart");
							//pour forcer  la redirection en cas d'erreur
							if (!$rootScope.$$phase) $rootScope.$apply();

					//location.href = '#cart';
					
					},
			}
			
			toastr.success('ajouté au panier .', name, {timeOut: 3000});
			
			//simmulatio du click sur l'icone du panier 
			//$('#my-cart-icon').click();
									
		}

		$rootScope.getProduct = function(id) {
			  
			 var productIndex = -1;
			  var products = $rootScope.produit;
			  $.each(products, function(index, value){
				if(value.id == id){
				  productIndex = index;
				  return;
				}
			  });
			  
			  
			  if(productIndex < 0){
				return false;
			  }
			
			  return products[productIndex];
		}
		
		$rootScope.voirPlus = function() {

			$rootScope.setting.refresh = true;
				
				var delayedFn = $timeout(function(){ 
					
					var products = $rootScope.produit;
					var taille = $rootScope.produit.length;
					for (var i = 0; i < 6; i++) {
						
						value = {id: $rootScope.produit[i].id, name: $rootScope.produit[i].name, summary: $rootScope.produit[i].summary, price: $rootScope.produit[i].price, quantity: 1, image: $rootScope.produit[i].image};
	
						products.push(value);
					} 
					
					$rootScope.produit = products;

					$rootScope.setting.refresh = false;

				 /*var products = $rootScope.produit;
				  $.each(products, function(index, value){
					  
					$rootScope.produit.push(value);
					
				  });
				 */  
				 }, 5000);
				
			
		}
		
		
		
		$rootScope.delete = function(id)
		{
			$rootScope.ProductManager.removeProduct(id);
			$rootScope.initCartSetting();
			//alert('delete ' + id);
		}
		
		$rootScope.valuePlus = function(id, quantity)
		{
			quantity = eval(quantity + 1);
			$rootScope.ProductManager.updatePoduct(id, quantity);
			$rootScope.initCartSetting();
			//alert('delete ' + id + ' ' + quantity);
		}
		
		$rootScope.valueMinus = function(id, quantity)
		{
			if(eval(quantity - 1)>=0)
			{
				quantity = eval(quantity - 1);
				$rootScope.ProductManager.updatePoduct(id, quantity);
				$rootScope.initCartSetting();
			
			}
			//alert('delete ' + id + ' ' + quantity);
		}
		
		
		$rootScope.initCartSetting = function()
		{
			
			$rootScope.setting.panier = $rootScope.ProductManager.getAllProducts();
			$rootScope.setting.totalQuantity = $rootScope.ProductManager.getTotalQuantity();
			$rootScope.setting.prixTotal = $rootScope.ProductManager.getTotalPrice();

			if($rootScope.setting.panier.length > 0 )
				$rootScope.cartIsEmpty = false;
			else
				$rootScope.cartIsEmpty = true;
			
		}
		
		// on exécute la function au démarrage
		$rootScope.initCartSetting();

		$rootScope.logout = function()
		{

			$('.body-loader').css('visibility','visible'); 
			setTimeout(function() {
				$('.body-loader').css('visibility','hidden');
					
				$rootScope.userManager.logout();
				$rootScope.oderStep = '/home';
				$location.path('/home');
				//pour forcer  la redirection en cas d'erreur
				if (!$rootScope.$$phase) $rootScope.$apply();

			}, 3000);
		
		}

		
	}]);
	
})(); 


