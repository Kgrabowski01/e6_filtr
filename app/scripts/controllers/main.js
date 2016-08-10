(function () {
  'use strict';

  angular.module('es6FiltryApp')


  .controller('MainCtrl', MainCtrl);
  MainCtrl.$inject=['$http', 'filterProcessing'];

  function MainCtrl ($http, filterProcessing) {
    var vm = this;
    vm.addFilter = addFilter;
    vm.editFilter = editFilter;
    vm.cloneFilter = cloneFilter;
    vm.availableFilters = filterProcessing.availableFilters;

    $http.get('/data/input/conditionsTempate.json')
    .then(function(res){
      vm.availableConditions = res.data.conditions;
    });

    $http.get('/data/input/tempUsers.json')
    .then(function(res){
      vm.availableUsers = res.data.users;
    });

    function addFilter (filterObj, filterName) {
      if (filterName === undefined || filterName === '') {
        return window.alert("You must enter filter name!"); // zastosowany window alert poniewaz nie dzialaly mi pola required w filterBy.html
      }
      filterProcessing.addNewFilter(filterObj, filterName)
      .then(function(updatedFilters) {
        vm.availableFilters = updatedFilters;
      });
    }

    function editFilter (filterIndex, newConditions, newFilterName) {
      filterProcessing.editFilter (filterIndex, newConditions, newFilterName)
      .then(function(updatedFilters) {
        vm.availableFilters = updatedFilters;
      });
    }

    function cloneFilter (filterIndex) {
      filterProcessing.cloneFilter (filterIndex)
      .then(function(updatedFilters) {
        vm.availableFilters = updatedFilters;
      });
    }

  }
})();
