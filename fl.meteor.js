angular.module('fl.meteor', ['angular-meteor'])
  .factory('MeteorHelper', ['$q', '$meteorUtils', '$rootScope', '$meteor', function($q, $meteorUtils, $rootScope) {
    return {
      excludeAngularKey: excludeAngularKey,
      checkPermission: checkPermission
    };

    function checkPermission(stateName) {
      var deferred = $q.defer();

      $meteorUtils.autorun($rootScope, function() {
        if(!Meteor.loggingIn() && Roles.subscription.ready() && Permissions.subscription.ready()) {
          if(Permissions.userHasPermissionByState(Meteor.user(), stateName)) {
            deferred.resolve(true);
          } else {
            deferred.reject("UNAUTHORIZED");
          }
        }
      });
      return deferred.promise;
    }

    function excludeAngularKey(source) {
      var rxAngularKey = /^\$/;
      return _.pick(source, function(value, key) {
        return !angular.isFunction(value) && !rxAngularKey.test(key);
      });
    }
  }])
  .run(run);

run.$inject = ['$rootScope', '$meteor'];

function run($rootScope, $meteor) {
}