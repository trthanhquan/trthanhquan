app.controller("adminController", ['$scope', 'couchdbService', function($scope, couchdbService) {
    $scope.selectedDocs = [];
    $scope.allDocs = [];
    $scope.invalidUpdate=false;
    $scope.allDocs = function() {
        couchdbService.getAllDocs().then(function(allDocs) {
            $scope.allDocs = allDocs;
        });
    };
    $scope.allDocs();
    $scope.toggleSelection = function(doc) {
        var index = $scope.selectedDocs.indexOf(doc);
        if (index > -1) {
            $scope.selectedDocs.splice(index, 1);
        } else {
            $scope.selectedDocs.push(doc);
        }
    }
       $scope.add = function() {
        if(!$scope.isWorking){
            $scope.up = !$scope.up;
        }
                
$scope.workingDoc=null;$scope.isWorking=true;$scope.isUpdating=false;

    }
    $scope.submit = function() {
        couchdbService.save($scope.workingDoc).then(function(result) {
           if(!$scope.isUpdating){
             $scope.allDocs.push($scope.workingDoc)
           }
           else{
            angular.forEach($scope.allDocs, function(doc, index) {
                if(doc._id==$scope.workingDoc._id){
                    $scope.allDocs[index] = $scope.workingDoc;
                    
                }

            })}
            $scope.workingDoc=null;
        });
    }
     $scope.clear = function() {
        $scope.workingDoc=null;
    }
    $scope.update = function() {
                if($scope.selectedDocs.length==0){
            $scope.invalidUpdate=true;
            return;
        }

        if(!$scope.isWorking){
            $scope.up = !$scope.up;
        }
      var cloneSelectedDoc = angular.copy($scope.selectedDocs[0]);
       //$scope.test($scope.selectedDocs);
        $scope.workingDoc = cloneSelectedDoc;
        $scope.isWorking=true;
        $scope.isUpdating = true;



    
    }

    $scope.delete = function() {
        var cloneSelectedDocs =$scope.selectedDocs;
        angular.forEach(cloneSelectedDocs, function(doc, index) {
            couchdbService.delete(doc).then(function(result) {
                
                    var index = $scope.selectedDocs.indexOf(doc);

                    $scope.selectedDocs.splice(index, 1);
                    index=$scope.allDocs.indexOf(doc);
                    $scope.allDocs.splice(index, 1);
                
            });
        });
    }

}]);