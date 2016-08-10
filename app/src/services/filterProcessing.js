(function () {
  'use strict';

  class FilterProcessing {

    constructor($q) {
      this.$q = $q,
      this.availableFilters = [{
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
    }

    NewFilter (filterConditions, filterName, callbackPush) {
      this.filter = [{
        name: filterName,
        conditions: {
          and: filterConditions.conditions.and,
          or: filterConditions.conditions.or,
        }
      }];
      callbackPush.push(this.filter[0]);
    }

    addNewFilter (filterObj, filterName) {
      new this.NewFilter (filterObj, filterName, this.availableFilters);
      return this.$q.resolve(this.availableFilters);
    }

    editFilter (filterIndex, newConditions, newFilterName) {
      this.availableFilters[filterIndex] = newConditions;
      if (newFilterName.length !== 0) { this.availableFilters[filterIndex].name = newFilterName; }
      return this.$q.resolve(this.availableFilters);
    }

    cloneFilter (filterIndex) {
      let tempCloneObj = JSON.parse(JSON.stringify(this.availableFilters[filterIndex]));
      tempCloneObj.name = tempCloneObj.name + ' copy';
      this.availableFilters.push(tempCloneObj);
      return this.$q.resolve(this.availableFilters);
    }

  }

  FilterProcessing.$inject = ['$q'];
  angular.module('es6FiltryApp')
  .service('filterProcessing', FilterProcessing);

})();
