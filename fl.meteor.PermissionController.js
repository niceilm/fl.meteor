angular.module('fl.meteor').controller('PermissionController', PermissionController);

PermissionController.$inject = ['$scope', 'GridHelper', '$meteor'];

function PermissionController($scope, GridHelper, $meteor) {
  var size = 30;
  $scope.gridTitle = "권한관리";
  $scope.limit = size;
  $scope.query = {};

  $scope.gridOptions = GridHelper.generateGridOptions({
    columnDefs: [
      {field: 'state', displayName: '스테이트', cellClass: 'center'},
      {field: 'roles', displayName: '롤', cellClass: 'center'}
    ],
    data: $scope.$meteorCollection(function() {
      $log.debug("$scope.$meteorCollection()");
      return Meteor.permissions.findByQuery($scope.getReactively("query", true));
    }, false),
    onRegisterApi: function(gridApi) {
      $scope.gridApi = gridApi;
      GridHelper.attachNeedLoadMoreData($scope, gridApi, size);
      GridHelper.attachAutorun($scope, gridApi, 'permissionsByQuery', 'permissions-of-counter');
      GridHelper.attachWatchQuery($scope, gridApi, size);
      $scope.removeSelected = GridHelper.factory.removeSelected(gridApi, removes);
      $scope.remove = GridHelper.factory.remove(gridApi, removes);
    }
  });
  $scope.savePermission = savePermission;
  $scope.permissionFindAll = permissionFindAll;
  $scope.permissionBulkUpsert = permissionBulkUpsert;

  function removes(ids) {
    return $meteor.call('removePermissions', ids);
  }

  function savePermission() {
    $meteor.call('savePermission', $scope.form);
  }

  function permissionFindAll() {
    $meteor.call('permissionFindAll').then(function(permissions) {
      $scope.json = JSON.stringify(_.map(permissions, function(permission) {
        return _.pick(permission, "state", "roles");
      }));
    });
  }

  function permissionBulkUpsert() {
    $meteor.call('permissionBulkUpsert', JSON.parse($scope.json)).then(function() {
    });
  }
}