app.controller('usersController', function($scope, $http) {
    $scope.pageHeader = 'Users Management';

    $scope.newUser = function () {
        $scope.user = new Object();
    }

    // List of users
    $http.get('/get-users')
        .success(function (data, status, header, config) {
            $scope.users = data;
        })
        .error(function (data) {
            $scope.statusMessage = 'An internal error ocurred preventing loading ' +
                'all users. Message: ' + JSON.stringify(data);
            $scope.style = 'alert-danger';
        });

    // Get details of user
    $scope.getUser = function (user) {
        $scope.user = user;
    }

    // // Get details of user by id
    // $scope.getUser = function (id) {
    //     $http.get('/get-user/' + id)
    //         .success(function (data) {
    //             $scope.user = data;
    //         })
    //         .error(function (data) {
    //             $scope.statusMessage = 'An internal error ocurred preventing loading ' +
    //                 'user with id=' + id + '. Message: ' + JSON.stringify(data);
    //             $scope.style = 'alert-danger';
    //         });
    //
    // }

    // Save user data from form
    $scope.saveUser = function () {
        var index = -1;

        if ($scope.user.id != 0) {
            for (var i = 0; i < $scope.users.length; ++i) {
                if ($scope.users[i].id == $scope.user.id) {
                    index = i;
                    break;
                }
            }
        }

        $http.post('/save-user', $scope.user)
            .success(function (data) {
                if (index < 0)
                    $scope.users.push(data);
                else
                    $scope.users[index] = data;

                $scope.newUser();
                $scope.statusMessage = 'User ' + data.name + ' ' +
                    data.surname + ' was successfully saved.';
                $scope.style = 'alert-success';
            })
            .error(function (data) {
                $scope.statusMessage = 'User was not saved. An internal error ocurred. ' +
                    'Message: ' + JSON.stringify(data);
                $scope.style = 'alert-danger';
            });
    }
    
    $scope.deleteUser = function (user) {
        $http.delete('/delete-user/' + user.id)
            .success(function () {
                var index = $scope.users.indexOf(user);
                $scope.users.splice(index, 1);

                $scope.statusMessage = 'User with id=' + user.id + ' deleted successfully.';
                $scope.style = 'alert-success';
            })
            .error(function (data) {
                $scope.statusMessage = 'User was not deleted. An internal error ocurred. ' +
                    'Message: ' + JSON.stringify(data);
                $scope.style = 'alert-danger';
            });
    }

});