
		
	function test($rootScope){
	
		
		
		$rootScope.sayHello = function(titre)
		{
			//alert('test');
			
			$rootScope.setting.title = titre;
		}
		
	}