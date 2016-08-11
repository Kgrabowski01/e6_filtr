(function () {
  'use strict';

  class ConditionsProcessing {

    constructor($http, $q) {
      this.$http = $http;
      this.$q = $q;
      this.filterQuery = {};
      this.tempConditionObj = [];
      this.conditionsAndArray = [];
      this.conditionsOrArray = [];
      this.conditionsAndObjects = [];
      this.conditionsOrObjects = [];
      this.storeConditionObj = {
        name: '',
        conditions :{
          and: [],
          or: [],
        }
      };
    }

    changeView(view) {
      if (view === true) { return false; }
      return true;
    }

    clearConditionObj() {
      this.filterQuery = {};
      this.tempConditionObj = [];
      this.conditionsAndArray = [];
      this.conditionsOrArray = [];
      this.conditionsAndObjects = [];
      this.conditionsOrObjects = [];
      this.storeConditionObj = {
        name:'',
        conditions :{
          and: [],
          or: [],
        }
      };
    }

    NewConditions(property, operator, values, callbackPush) {
      this.conditions = [{
        property: property,
        operator: operator,
        values: [values]
      }];
      callbackPush.push(this.conditions[0]);
    }

    createCondition(conditionName, conditionObj, logicalOperator, filterName) {
      if (filterName !== undefined) { this.addFilterName(filterName); }
      return this.addCondition (conditionName, conditionObj, logicalOperator);
    }

    addFilterName(name) { this.storeConditionObj.name = name; }

    removeCondition(conditionObj, logicalOperator, index) {
      conditionObj.conditions[logicalOperator].splice(index, 1);
      return this.$q.resolve(conditionObj);
    }

    addCondition(conditionName, conditionObj, logicalOperator) {
      if (logicalOperator === 'and') { new this.NewConditions (conditionName, conditionObj.operator, conditionObj.value, this.storeConditionObj.conditions.and); }
      if (logicalOperator === 'or') { new this.NewConditions (conditionName, conditionObj.operator, conditionObj.value, this.storeConditionObj.conditions.or); }
      return this.$q.resolve(this.storeConditionObj);
    }

    setFilterConditionsObjAnd(filter, i) {
      for (let condition of filter.conditions.and) {
        let conditionObject = {
          operator: '',
          value: ''
        };
        conditionObject.operator = filter.conditions.and[i].operator;
        conditionObject.value = filter.conditions.and[i].values[0];
        return this.$q.resolve(conditionObject);
      }
    }

    setFilterConditionsObjOr(filter, i) {
      for (let condition of filter.conditions.or) {
        let conditionObject = {
          operator: '',
          value: ''
        };
        conditionObject.operator = filter.conditions.or[i].operator;
        conditionObject.value = filter.conditions.or[i].values[0];
        return this.$q.resolve(conditionObject);
      }
    }
  }

  ConditionsProcessing.$inject = ['$http', '$q'];
  angular.module('es6FiltryApp')
  .service('conditionsProcessing', ConditionsProcessing);

})();
