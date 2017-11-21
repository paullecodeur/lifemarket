var AngularApp = angular.module('AngularApp', []);
		
	AngularApp.config(function($routeProvider){
		$routeProvider
			.when('/', {templateUrl: 'view/home.html', controller: homeCtrl})
			.when('/about', {templateUrl: 'view/about.html', controller: aboutCtrl})
			.when('/contact', {templateUrl: 'view/contact.html', controller: contactCtrl})
			.when('/login', {templateUrl: 'view/login.html', controller: loginCtrl})
			.when('/singup', {templateUrl: 'view/singup.html', controller: singupCtrl})
			.when('/cart', {templateUrl: 'view/cart.html', controller: cartCtrl})
			.when('/product/:productId', {templateUrl: 'view/product.html', controller: productCtrl})
			.otherwise({redirectTo: '/'})
			
	});
	
  AngularApp.run(function($rootScope) {
	  
		$rootScope.setting = {'title': '', 'menu': 'home', 'totalQuantity': 0, 'prixTotal': 0, 'refresh':0};
		$rootScope.produit = [
		  {id: 1, name: 'Blanc de poulet', summary: 'Blanc de poulet', price: 3000, quantity: 1, image: 'images/of16.png'},
		  {id: 2, name: 'Ailes de poulet', summary: 'Ailes de poulet', price: 2000, quantity: 1, image: 'images/of17.png'},
		  {id: 3, name: 'Cuisse de poulet', summary: 'Cuisse de poulet', price: 3500, quantity: 1, image: 'images/of18.png'},
		  {id: 4, name: 'Poulet vide STSP', summary: 'Blanc de poulet', price: 4000, quantity: 1, image: 'images/of19.png'},
		  {id: 5, name: 'Poulet entier', summary: 'Poulet entier', price: 5000, quantity: 1, image: 'images/of20.png'},
		  {id: 6, name: 'Fricassé de poulet', summary: 'Fricassé de poulet', price: 1500, quantity: 1, image: 'images/of21.png'},
		]
	
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
			$rootScope.setting.refresh = 1;
			//setTimeout(function() {
				/* value = {id: 400, name: 'Blanc de poulet', summary: 'Blanc de poulet', price: 3000, quantity: 1, image: 'images/of16.png'}
				value = {id: 400, name: 'Blanc de poulet', summary: 'Blanc de poulet', price: 3000, quantity: 1, image: 'images/of16.png'} */
				var products = $rootScope.produit;
				var taille = $rootScope.produit.length;
				for (var i = 0; i < taille; i++) {
					
					value = {id: $rootScope.produit[i].id, name: $rootScope.produit[i].name, summary: $rootScope.produit[i].summary, price: $rootScope.produit[i].price, quantity: 1, image: $rootScope.produit[i].image};

					products.push(value);
				} 
				
				$rootScope.produit = products;
				 /*var products = $rootScope.produit;
				  $.each(products, function(index, value){
					  
					$rootScope.produit.push(value);
					
				  });
				 */  
			//}, 5000);
			
			$rootScope.setting.refresh = 0;
		}
			
		$rootScope.ProductManager = (function(){
			var objToReturn = {};

			/*
			PRIVATE
			*/
			localStorage.products = localStorage.products ? localStorage.products : "";
			var getIndexOfProduct = function(id){
			  var productIndex = -1;
			  var products = getAllProducts();
			  $.each(products, function(index, value){
				if(value.id == id){
				  productIndex = index;
				  return;
				}
			  });
			  return productIndex;
			}
			var setAllProducts = function(products){
			  localStorage.products = JSON.stringify(products);
			}
			var addProduct = function(id, name, summary, price, quantity, image) {
			  var products = getAllProducts();
			 /*  products.push({
				id: id,
				name: name,
				summary: summary,
				price: price,
				quantity: quantity,
				image: image
			  }); */
			  //ajouter au debut du tableau
			   products.unshift({
				id: id,
				name: name,
				summary: summary,
				price: price,
				quantity: quantity,
				image: image
			  });
			  
			  setAllProducts(products);
			}

			/*
			PUBLIC
			*/
			var getAllProducts = function(){
			  try {
				var products = JSON.parse(localStorage.products);
				/* var productsOrder = [];
				for (var i = eval(products.length - 1); i >= 0; i--) {
				 
					productsOrder.push(products[i])
				  
				} */
				return products;
				
			  } catch (e) {
				return [];
			  }
			}
			var updatePoduct = function(id, quantity) {
			  var productIndex = getIndexOfProduct(id);
			  if(productIndex < 0){
				return false;
			  }
			  var products = getAllProducts();
			  products[productIndex].quantity = typeof quantity === "undefined" ? products[productIndex].quantity * 1 + 1 : quantity;
			  setAllProducts(products);
			  return true;
			}
			
			var getProduct = function(id) {
			  var productIndex = getIndexOfProduct(id);
			  if(productIndex < 0){
				return false;
			  }
			  var products = getAllProducts();
			  
			  return products[productIndex];
			}
			
			var setProduct = function(id, name, summary, price, quantity, image) {
			  if(typeof id === "undefined"){
				console.error("id required")
				return false;
			  }
			  if(typeof name === "undefined"){
				console.error("name required")
				return false;
			  }
			  if(typeof image === "undefined"){
				console.error("image required")
				return false;
			  }
			  if(!$.isNumeric(price)){
				console.error("price is not a number")
				return false;
			  }
			  if(!$.isNumeric(quantity)) {
				console.error("quantity is not a number");
				return false;
			  }
			  summary = typeof summary === "undefined" ? "" : summary;

			  if(!updatePoduct(id)){
				addProduct(id, name, summary, price, quantity, image);
			  }
			  
			  //initialisation des paramètres
			  $rootScope.initSetting();

			  
			  //$('#my-cart-badge').text(getTotalQuantity());
			  toastr.options = {
				'closeButton' : true,
				'progressBar' : true,
				'onclick' : function() { 
				//on affiche la panier
				location.href='#cart';
			  
				},
			  }
			  
			  toastr.success('ajouté au panier .', name, {timeOut: 3000});
			  
			  
				
			  //simmulatio du click sur l'icone du panier 
			  //$('#my-cart-icon').click();
			  
			}
			var clearProduct = function(){
			  setAllProducts([]);
			}
			var removeProduct = function(id){
			  var products = getAllProducts();
			  products = $.grep(products, function(value, index) {
				return value.id != id;
			  });
			  setAllProducts(products);
			}
			var getTotalQuantity = function(){
			  var total = 0;
			  var products = getAllProducts();
			  $.each(products, function(index, value){
				total += value.quantity * 1;
			  });
			  return total;
			}
			var getTotalPrice = function(){
			  var products = getAllProducts();
			  var total = 0;
			  $.each(products, function(index, value){
				total += value.quantity * value.price;
			  });
			  
			  return total;
			}

			objToReturn.getAllProducts = getAllProducts;
			objToReturn.updatePoduct = updatePoduct;
			objToReturn.setProduct = setProduct;
			objToReturn.getProduct = getProduct;
			objToReturn.clearProduct = clearProduct;
			objToReturn.removeProduct = removeProduct;
			objToReturn.getTotalQuantity = getTotalQuantity;
			objToReturn.getTotalPrice = getTotalPrice;
			return objToReturn;
		}());
		
	
		$rootScope.delete = function(id)
		{
			$rootScope.ProductManager.removeProduct(id);
			$rootScope.initSetting();
			//alert('delete ' + id);
		}
		
		$rootScope.valuePlus = function(id, quantity)
		{
			quantity = eval(quantity + 1);
			$rootScope.ProductManager.updatePoduct(id, quantity);
			$rootScope.initSetting();
			//alert('delete ' + id + ' ' + quantity);
		}
		
		$rootScope.valueMinus = function(id, quantity)
		{
			if(eval(quantity - 1)>=0)
			{
				quantity = eval(quantity - 1);
				$rootScope.ProductManager.updatePoduct(id, quantity);
				$rootScope.initSetting();
			
			}
			//alert('delete ' + id + ' ' + quantity);
		}
		
		
		$rootScope.initSetting = function()
		{
			
			$rootScope.setting.panier = $rootScope.ProductManager.getAllProducts();
			$rootScope.setting.totalQuantity = $rootScope.ProductManager.getTotalQuantity();
			$rootScope.setting.prixTotal = $rootScope.ProductManager.getTotalPrice();
			
		}
		
		$rootScope.initSetting();

		
  });
