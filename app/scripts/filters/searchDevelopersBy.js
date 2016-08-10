



// Na chwilę obecną specjalnie zostawione ale nigdzie nie uzywane

'use strict';
angular.module('es6FiltryApp')

.filter('searchDevelopersBy', function () {
  return function (developers, conditions) {

    var arr = [];
    //var test2;

//var xx = JSON.stringify(conditions);
    //console.log(eval(xx));

    angular.forEach(developers, function(developer) {
      //console.log(conditions);
      var devConfig = {
        age: developer.age,
        skill: developer.skill,
        degree: developer.degree,
        regionalTeam: developer.regionalTeam,
        languages: developer.languages,
        availability: developer.availability
      };

      var xx = JSON.stringify(conditions)
      console.log(xx)
      //Object.keys(conditions).length > 0 && createCondition (devConfig, conditions)
      if (eval(xx)) {
        arr.push(developer);
      }

    });

    /* function createCondition (devConfig, conditions) {


      //Object.keys(conditions)
      angular.forEach(conditions, function(condition) {
        //delete condition.$$hashKey;

        for (var name in condition) {
          var value = condition[name];

          if (devConfig[name] === value.value && name !== '$$hashKey' && test2 === undefined) {
            test2 = 'devConfig.'+ name + ' === ' + "'" + value.value + "'";
          }

          if (devConfig[name] === value.value && name !== '$$hashKey') {
            test2 = test2 + ' && ' + 'devConfig.'+ name + ' === ' + "'" + value.value + "'";
          }
        }

      });
      console.log(test2);
      return eval (test2);
    }

    function setAge (age) {
      var value = age.ageValue;
      var ageOperators = {
        equals: 'devConfig.age === ' + value,
        notEquals: 'devConfig.age != '+ value,
        lt: 'devConfig.age <= ' + value,
        gt: 'devConfig.age >= '+ value
      };
      return ageOperators[age.operator];
    }

    function setConditions (devKey, conditions) {
      var conditionsTab;

      //if (devConditions === conditions.value) {
      conditionsTab = 'devConfig.'+ devKey + ' === ' + "'"+conditions.value + "'";

      //console.log(conditionsTab);
      //return JSON.stringify(conditionsTab);
      //  }
      // var conditionsKeysTab = Object.keys(conditions);
      // for (var i = 0; i < conditionsKeysTab.length; i++) {
      //   if (conditionsKeysTab[i] !== '$$hashKey') {
      //     var objIndex = conditionsKeysTab[i];
      //     if (devConditions[objIndex] === conditions[objIndex].value) {
      //       conditionsTab = 'devConditions.'+ objIndex + ' == ' + conditions[objIndex].value ;
      //       console.log('git');
      //     }
      //   }
      return JSON.stringify(conditionsTab);
      //}

      // if (qqq !== undefined) {
      //   return JSON.stringify(qqq);
      // }

    }*/
    return arr;
  };
});
