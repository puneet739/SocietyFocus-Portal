app.controller("bulkController", function($scope, $http, $filter, $q, $location, $rootScope, $cookieStore, toaster,FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
        url: $rootScope.constant.SERVICE_URL + '/upload/bulk/register',
        headers : {
            'X-Auth-Token': $cookieStore.get('X-Auth-Token')
        }
    });

    // FILTERS

    uploader.filters.push({
        name: 'customFilter',
        fn: function (item/*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function (item/*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function (fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function (addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function (item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function (fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function (progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function (fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function (fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function (fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function (fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function () {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);
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

function fileName(){
    document.getElementById("uploadFile").value = document.getElementById("uploadBtn").value;
}