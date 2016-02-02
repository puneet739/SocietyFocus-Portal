app.controller("bulkController", function($scope, $http, $filter, $q, $location, $rootScope, toaster) {

    $scope.uploadFile = function() {
        console.log('User is about to upload the file');

        var fd = new FormData();
        fd.append('file', $scope.userfile);

        var req = {
            method: 'POST',
            url: $rootScope.constant.SERVICE_URL + '/upload/bulk/register',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: fd
        }

        $http(req).then(function successCallback(response) {
            console.log('Success Achived');
            $scope.toaster = {
                type: 'success',
                title: 'Users uploaded successfully',
                text: 'Users uploaded successfully'
            };
            toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
        }, function errorCallback(response) {
            console.log('Error in file upload');
        })

    }

});