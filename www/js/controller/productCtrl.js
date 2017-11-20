function productCtrl($scope, $routeParams){

	$scope.setting.menu = 'product';
	$scope.productId = $routeParams.productId;
	$scope.product =  $scope.getProduct($scope.productId);
	
}