app.controller("dashboardController", function($scope, $localStorage, $http,$localStorage, $filter, $q, $location, $stateParams, $rootScope, toaster) {

	$scope.init = function(){
		$scope.currentSociety = $localStorage.society;
	}

// Call To get INCOME - EXPENSE Data

$scope.getIncomeExpenseData = function(){
  console.log('Now trying to fetch all INCOME - EXPENSE Data');
  var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/society/incomeexpense',
        }

        $http(req).then(function(response){
         console.log(response);

        // Logic starts
        $scope.trydata=response.data.body;

        var income = [];
        var expense = [];
        var month = [];

          for(i=0 ;i<$scope.trydata.length;i++)
            {

              income.push($scope.trydata[i].income);
              expense.push($scope.trydata[i].expense);
              month.push($scope.trydata[i].date);

            }


          $scope.IE_colors = ["#e56353","#556080"];
          $scope.IE_labels =month;
          $scope.IE_series = ['Income', 'Expense'];
          $scope.IE_data = [
            income,
            expense
          ];
          $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
          $scope.options = {
            scales: {
              yAxes: [
                {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left'
                }
                
              ]
            },
            legend: {
                display:true,
                position: 'top'

             }
           
          };

        //Logic to consume API response ENDS
        
        });
}

$scope.getComplaintData = function(){
  console.log('Now trying to fetch all Complaints Data');
  var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/v1/complaint/data',
        }

        $http(req).then(function(response){
        console.log(response);

         $scope.mydata=response.data.body;
     

        var closedComplaints= [];
        var raisedComplaints=[];
        var date=[];

        for(i=0;i<$scope.mydata.length;i++){
          
          closedComplaints.push($scope.mydata[i].closedComplaints)
          raisedComplaints.push($scope.mydata[i].raisedComplaints)
          date.push($scope.mydata[0].date)

        }
 
        $scope.C_colors = ["#46BFBD","rgb(120,130,144)"];
        $scope.C_labels = date;
        $scope.C_series = ['closedComplaints', 'raisedComplaints'];
        $scope.C_data = [
            closedComplaints,
            raisedComplaints
      ];

        });
}

// Dashboarad Controllers Function Starts here

// Function to RAW Get Member List

$scope.getRAWmemberList = function(){
  console.log("Trying TO fetch Member List");

var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/society/panel',
        }
$http(req).then(function(response){
  


    var member = [];
   
  for(i=0;i<response.data.body.length;i++){

     member.push({
       index:response.data.body[i].id,
       name:response.data.body[i].user.firstname,
       lastname:response.data.body[i].user.lastname
     })

   }
   
   $scope.members = member;
  })
}

  // Function To Fetch All Residency member

  $scope.getAllresidencyMember = function(){
    var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/user/getalluser',
        }
      
    $http(req).then(function(response){

      var ResidencyMember = [];

      for(i=0;i<3;i++){

       ResidencyMember.push({
          id:response.data.body[i].userid,
          firstname:response.data.body[i].firstname,
          lastname:response.data.body[i].lastname
       })

      }

      $scope.ResidencyMember = ResidencyMember;
      $scope.totalResidencyMember = response.data.body.length;
  
    })
  }

  $scope.getAllNotice = function(){
    console.log("Fetching All Notice !")
     var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/society/noticeboard/getall'
        }
        $http(req).then(function(response){
            console.log(response);

            //Code To fetch and insert image

            var notice = [];
            for(i=0;i<response.data.body.length;i++)
            {
              if(response.data.body[i].image_url1){
                notice.push({
                title:response.data.body[i].title,
                desc:response.data.body[i].description,
                image:response.data.body[i].image_url1
              })
              }else{
                notice.push({
                title:response.data.body[i].title,
                desc:response.data.body[i].description,
                image:"resources/images/tempimage.jpg"
              })
              }

              
            }
        
            $scope.notice = notice;
            $scope.myInterval = 300000;
        })
  }

  //Function to fetch Wallet Amount
  $scope.getWalletAmount = function(){
  var req = {
            method: 'GET',
            url: $rootScope.constant.SERVICE_URL + '/user/getuserwallet'
        }

        $http(req).then(function(response){
          console.log("GET WALLET AMOUNT")
          $scope.walletAmount = response.data.body.amount;
        })
  }//function ends here


//ROW 3


// Function to get user complaints
$scope.getUserComp = function(){
  console.log("Trying to fetch user complaints !")
  var req = {
    method:'GET',
    url: $rootScope.constant.SERVICE_URL + '/v1/complaint/getusercomplaint'
  }

  $http(req).then(function(response){
        console.log("USER BY COMPLAINT")
        console.log(response);
        var complaints = [];

        for(i=0;i<response.data.body.length;i++)
        {
          complaints.push({
            complaint: response.data.body[i].title
          })
        }

        $scope.complaints = complaints;
  })
}

// Function to get Asset booking list.
$scope.getAssetBookList = function(){
  console.log("tring to fetch Asset booking list")
  var req = {
    method:'POST',
    url: $rootScope.constant.SERVICE_URL + '/society/asset/getassetbyuser'
  }

  $http(req).then(function(response){

    var Assets = [];
    for(i=0;i<response.data.body.length;i++){
      Assets.push({
        item: response.data.body[i].asset.description
      })
    }

    $scope.Assets = Assets;



  })
}


});


    