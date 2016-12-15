angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('page', {
    url: '/page1',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

  $urlRouterProvider.otherwise('/page1')

});
