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
                },
                {
                  id: 'y-axis-2',
                  type: 'linear',
                  display: true,
                  position: 'right'
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




});


    