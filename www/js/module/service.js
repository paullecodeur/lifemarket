(function(){                                                                     
	
	var ServiceLifemarket = angular.module('lifemarketService', []);                                     
    
    ServiceLifemarket.service('UserManager', function(){
       
        var objToReturn = {};

        localStorage.user = localStorage.user ? localStorage.user : ""; 

        var getUser = function() {
            
            try {

                if(localStorage.user!="")
                {
                    var user = JSON.parse(localStorage.user);
                    return user;
                }
                else
                {
                    return null;
                }
               

            } catch (e) {

                return null; 

            }
           
        }

        var setUser=function(id, name, email, password) {
            
            var user = getUser();

            if( user == null)
            {
                user = {
                    id:0,
                    name:"",
                    email:"",
                    password:""
                }
            }
           
            user.id = id;
            user.name = name;
            user.email = email;
            user.password = password;

            localStorage.user = JSON.stringify(user);
            
        }

        var login = function(id, name, email, password) {
           
            setUser(id, name, email, password);
            
        }

        var loginCheck = function() {
            if(getUser() == null)
            return false;
            else
            return true;
        }

        var logout = function() {
            localStorage.user = "";
        }

        objToReturn.getUser = getUser;
        objToReturn.setUser = setUser;
        objToReturn.login = login;
        objToReturn.loginCheck = loginCheck;
        objToReturn.logout = logout;

        return objToReturn;
    })

	ServiceLifemarket.service('ProductManager', [function(){
		
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

	}]);

})(); 
