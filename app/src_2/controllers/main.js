(function () {
  'use strict';

  class MainCtrl {
    constructor($http, filterProcessing) {
      this.$http = $http;
      this.filterProcessing = filterProcessing;
      this.availableFilters = filterProcessing.availableFilters;
      $http.get('/data/input/conditionsTempate.json')
      .then(res => {
        this.availableConditions = res.data.conditions;
      });

      $http.get('/data/input/tempUsers.json')
      .then( res => {
        this.availableUsers = res.data.users;
      });
    }

    addFilter (filterObj, filterName) {
      if (filterName === undefined || filterName === '') {
        return window.alert("You must enter filter name!"); // zastosowany window alert poniewaz nie dzialaly mi pola required w filterBy.html
      }
      this.filterProcessing.addNewFilter(filterObj, filterName)
      .then(updatedFilters => {
        this.availableFilters = updatedFilters;
      });
    }

    editFilter (filterIndex, newConditions, newFilterName) {
      this.filterProcessing.editFilter (filterIndex, newConditions, newFilterName)
      .then(updatedFilters => {
        this.availableFilters = updatedFilters;
      });
    }

    cloneFilter (filterIndex) {
      this.filterProcessing.cloneFilter (filterIndex)
      .then(updatedFilters => {
        this.availableFilters = updatedFilters;
      });
    }
  }

  MainCtrl.$inject=['$http', 'filterProcessing'];
  angular.module('es6FiltryApp')
  .controller('MainCtrl', MainCtrl);

})();
