function cartCtrl($scope){

	$scope.setting.menu = 'cart';
	
	$scope.setting.panier = $scope.ProductManager.getAllProducts();
	$scope.setting.prixTotal = $scope.ProductManager.getTotalPrice();	
	
	
}