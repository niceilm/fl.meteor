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

run.$inject = ['$rootScope', '$meteor'];

function run($rootScope, $meteor) {
  $rootScope.logout = logout;
  $rootScope.loginWithPassword = loginWithPassword;
  $rootScope.loginWithFacebook = loginWithFacebook;
  $rootScope.loginWithTwitter = loginWithTwitter;
  $rootScope.isAdmin = isAdmin;

  function logout() {
    return $meteor.logout();
  }

  function loginWithTwitter() {
    return $meteor.loginWithTwitter(Meteor.isCordova ? {loginStyle: "redirect"} : {});
  }

  function loginWithFacebook() {
    return $meteor.loginWithFacebook(Meteor.isCordova ? {loginStyle: "redirect"} : {});
  }

  function loginWithPassword(username, password) {
    return $meteor.loginWithPassword(username, password);
  }

  function isAdmin() {
    return Roles.userIsInRole($rootScope.currentUser, [ROLES.ADMIN, ROLES.MANAGER]);
  }
}