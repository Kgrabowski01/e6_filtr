(function () {
  'use strict';

  angular.module('es6FiltryApp')

  .service('conditionsProcessing', conditionsProcessing);
  conditionsProcessing.$inject = ['$http', '$q'];

  function conditionsProcessing ($http, $q) {

    var filterQuery = {};
    var tempConditionObj = [];
    var conditionsAndArray = [];
    var conditionsOrArray = [];
    var conditionsAndObjects = [];
    var conditionsOrObjects = [];

    var storeConditionObj = {
      name:'',
      conditions :{
        and: [],
        or: [],
      }
    };

    function changeView (view) {
      if ( view === true) { return false; }
      return true;
    }

    function clearConditionObj () {
      filterQuery = {};
      tempConditionObj = [];
      conditionsAndArray = [];
      conditionsOrArray = [];
      conditionsAndObjects = [];
      conditionsOrObjects = [];
      storeConditionObj = {
        name:'',
        conditions :{
          and: [],
          or: [],
        }
      };
    }

    function NewConditions (property, operator, values, callbackPush) {
      this.conditions = [{
        property: property,
        operator: operator,
        values: [values]
      }];
      callbackPush.push(this.conditions[0]);
    }

    function createCondition (conditionName, conditionObj, logicalOperator, filterName) {
      if (filterName !== undefined) { addFilterName(filterName); }
      return addCondition (conditionName, conditionObj, logicalOperator);
    }

    function addFilterName (name) { storeConditionObj.name = name; }

    function removeCondition (conditionObj, logicalOperator, index) {
      conditionObj.conditions[logicalOperator].splice(index, 1);
      return $q.resolve(conditionObj);
    }

    function addCondition (conditionName, conditionObj, logicalOperator) {
      if (logicalOperator === 'and') { new NewConditions (conditionName, conditionObj.operator, conditionObj.value, storeConditionObj.conditions.and); }
      if (logicalOperator === 'or') { new NewConditions (conditionName, conditionObj.operator, conditionObj.value, storeConditionObj.conditions.or); }
      return $q.resolve(storeConditionObj);
    }

    function setFilterConditionsObjAnd (filter, i) {
      for (var it = 0; it < filter.conditions.and[i].values.length; it++) {
        var conditionObject = {
          operator: '',
          value: ''
        };
        conditionObject.operator = filter.conditions.and[i].operator;
        conditionObject.value = filter.conditions.and[i].values[it];
        return $q.resolve(conditionObject);
      }
    }

    function setFilterConditionsObjOr (filter, i) {
      for (var it = 0; it < filter.conditions.or[i].values.length; it++) {
        var conditionObject = {
          operator: '',
          value: ''
        };
        conditionObject.operator = filter.conditions.or[i].operator;
        conditionObject.value = filter.conditions.or[i].values[it];
        return $q.resolve(conditionObject);
      }
    }

    return {
      setFilterConditionsObjAnd: setFilterConditionsObjAnd,
      setFilterConditionsObjOr: setFilterConditionsObjOr,
      removeCondition: removeCondition,
      clearConditionObj:clearConditionObj,
      createCondition: createCondition,
      filterQuery: filterQuery,
      tempConditionObj: tempConditionObj,
      changeView: changeView,
    };

  }
})();
