var homeController = app.controller('homeController', function ( $scope,$http,couchdbService) {

	 $scope.homeData=[];
   couchdbService.getAllDocs().then(function(allDocs){
    $scope.homeData = allDocs;
   });
        
}); 
