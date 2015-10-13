angular.module('fl.meteor', ['angular-meteor', 'fl.common'])
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
  .filter('findByValue', [function() {
    return function(matchValue, targetList, returnKey, findKey) {
      return NUTIL.finder(matchValue, targetList).returnKey(returnKey || "label").findKey(findKey || "value").find();
    }
  }])
  .filter('findById', [function() {
    return function(matchValue, targetList, returnKey) {
      return NUTIL.finder(matchValue, targetList).returnKey(returnKey).findKey("_id").find();
    }
  }])
  .run(run);

run.$inject = ['$rootScope', '$meteor', 'AgentManager'];

function run($rootScope, $meteor, AgentManager) {
  $rootScope.logout = function() {
    return $meteor.logout();
  };

  $rootScope.loginWithFacebook = function() {
    return $meteor.loginWithFacebook({'loginStyle': AgentManager.isMobile() ? 'redirect' : 'popup'});
  };

  $rootScope.isAdmin = function() {
    return Roles.userIsInRole($rootScope.currentUser, [ROLES.ADMIN, ROLES.MANAGER]);
  };
}