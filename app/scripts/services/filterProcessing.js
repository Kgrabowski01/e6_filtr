(function () {
  'use strict';


  angular.module('es6FiltryApp')

  .service('filterProcessing', filterProcessing);
  filterProcessing.$inject = ['$q'];

  function filterProcessing ($q) {

    var availableFilters = [{
      "name": "Experienced Technicians West",
      "conditions": {
        "and": [{
          "property": "skill",
          "operator": "is",
          "values": ["senior"]
        },{
          "property": "skill",
          "operator": "is not",
          "values": ["junior"]
        },
        {
          "property": "age",
          "operator": "equals",
          "values": ["22"]
        }],
        "or": [{
          "property": "age",
          "operator": "greater then",
          "values": ["1"]
        },
        {
          "property": "age",
          "operator": "greater then",
          "values": ["2"]
        },
        {
          "property": "age",
          "operator": "greater then",
          "values": ["3"]
        }]
      }
    },{
      "name": "Mid Experienced Technicians East",
      "conditions": {
        "and": [{
          "property": "skill",
          "operator": "is",
          "values": ["advanced"]
        }],
        "or": [{
          "property": "age",
          "operator": "greater then",
          "values": ["1"]
        }]
      }
    },{
      "name": "Low Experienced Technicians South",
      "conditions": {
        "and": [{
          "property": "skill",
          "operator": "is",
          "values": ["junior"]
        }],
        "or": [

        ]
      }
    }];

    function NewFilter (filterConditions, filterName, callbackPush) {
      this.filter = [{
        name: filterName,
        conditions: {
          and: filterConditions.conditions.and,
          or: filterConditions.conditions.or,
        }
      }];
      callbackPush.push(this.filter[0]);
    }

    function addNewFilter (filterObj, filterName) {
      new NewFilter (filterObj, filterName, availableFilters);
      return $q.resolve(availableFilters);
    }

    function editFilter (filterIndex, newConditions, newFilterName) {
      availableFilters[filterIndex] = newConditions;
      if (newFilterName.length !== 0) { availableFilters[filterIndex].name = newFilterName; }
      return $q.resolve(availableFilters);
    }

    function cloneFilter (filterIndex) {
      var tempCloneObj = JSON.parse(JSON.stringify(availableFilters[filterIndex]));
      tempCloneObj.name = tempCloneObj.name + ' copy';
      availableFilters.push(tempCloneObj);
      return $q.resolve(availableFilters);
    }

    return {
      availableFilters: availableFilters,
      addNewFilter: addNewFilter,
      editFilter: editFilter,
      cloneFilter: cloneFilter
    };

  }
})();
