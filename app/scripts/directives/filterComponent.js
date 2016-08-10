(function () {
	'use strict';

	function filterCtrl ($http, conditionsProcessing, viewProcessing) {
		var vm = this;
		// widoki
		vm.viewFilterDetail = viewProcessing.views.viewFilterDetail;
		vm.viewFilterConditionsAny = viewProcessing.views.viewFilterConditionsAny;
		vm.viewFilterConditionsAll = viewProcessing.views.viewFilterConditionsAll;
		vm.filterAttr = viewProcessing.views.filterAttr;
		vm.loadFilterDetail = viewProcessing.views.loadFilterDetail;
		// /widoki
		// warunki filtra
		vm.filterOptions = {
			filterName:''
		};
		vm.filterQuery = {};
		vm.tempQuery = {};
		vm.tempConditionObj = [];
		// /warunki filtra
		// funkcje zmieniające widoki
		vm.changeView = changeView;
		vm.showConditionAttrs = showConditionAttrs;
		// /funkcje zmieniające widoki
		vm.selectFilter = selectFilter;
		vm.addCondition = addCondition;
		vm.deleteCondition = deleteCondition;
		vm.clearFilters = clearFilters;
		vm.clearAndChangeAddView = clearAndChangeAddView;


		function selectFilter (filter) {
			clearFilters();
			for (var i = 0; i < filter.conditions.and.length; i++) {
				(function(i) {
					conditionsProcessing.setFilterConditionsObjAnd(filter, i)
					.then(function(conditionObject) {
						addCondition(filter.conditions.and[i].property, conditionObject, 'and', filter.name);
					});
				})(i);
			}
			for (var i = 0; i < filter.conditions.or.length; i++) {
				(function(i) {
					conditionsProcessing.setFilterConditionsObjOr(filter, i)
					.then(function(conditionObject) {
						addCondition(filter.conditions.or[i].property, conditionObject, 'or', filter.name);
					});
				})(i);
			}
		}

		function addCondition (conditionName, conditionObject, logicalOperator, filterName) {
			if (conditionObject === undefined || conditionObject.operator === undefined || conditionObject.value === undefined) {
				return window.alert("You must select filter values!"); // zastosowany window alert poniewaz nie dzialaly mi pola required w filterBy.html
			}
			var tempFilterName;
			if (vm.filterOptions.filterName !== undefined) {
				tempFilterName = vm.filterOptions.filterName;
			}
			conditionsProcessing.createCondition(conditionName, conditionObject, logicalOperator, filterName)
			.then(function(conditions) {
				vm.tempConditionObj = conditions;
			});
			vm.filterOptions = {};
			vm.filterOptions.filterName = tempFilterName;
			vm.filterQuery = {};
		}

		function deleteCondition (logicalOperator, index) {
			var conditionObj = vm.tempConditionObj;
			conditionsProcessing.removeCondition(conditionObj, logicalOperator, index)
			.then(function(newConditionObj) {
				vm.tempConditionObj = newConditionObj;
			});
		}

		function changeView (view, name) {
			if (vm.loadFilterDetail === true && vm.tempConditionObj.name !== name && view === 'loadFilterDetail' ) {
				return vm.loadFilterDetail;
			}
			viewProcessing.changeView(view)
			.then(function(val) {
				vm[view] = val;
			});
		}

		function clearFilters () {
			conditionsProcessing.clearConditionObj();
			viewProcessing.clearFilterObj();
			vm.filterQuery = {};
			vm.tempQuery = {};
			vm.tempConditionObj = [];
			vm.filterOptions = {
				filterName:''
			};
			vm.viewFilterDetail = viewProcessing.views.viewFilterDetail;
			vm.viewFilterConditionsAny = viewProcessing.views.viewFilterConditionsAny;
			vm.viewFilterConditionsAll = viewProcessing.views.viewFilterConditionsAll;
			vm.filterAttr = viewProcessing.views.filterAttr;
		}

		function clearAndChangeAddView () {
			viewProcessing.changeView('viewFilterDetail')
			.then(function(newViewVal) {
				vm.viewFilterDetail = newViewVal;
			});
			conditionsProcessing.clearConditionObj();
			vm.filterQuery = {};
			vm.tempQuery = {};
			vm.tempConditionObj = [];
			vm.filterOptions = {
				filterName:''
			};
		}

		function showConditionAttrs (conditionName) { // myslalem nad przeniesieniem tego do serwisu, ale nie jest to zbyt "prosta" funkcja?
			vm.filterAttr = conditionName;
		}

}
var filterComponent = {
	bindings: {
		filters: '<',
		conditions: '<',
		users: '<',
		onEdit: '&',
		addFilter: '&',
		cloneFilter: '&'
	},
	controller: filterCtrl,
	controllerAs: 'ctrl',
	templateUrl: 'views/filterBy.html'
};

angular.module('es6FiltryApp')
.controller('filterCtrl', filterCtrl)
.component('filterComponent', filterComponent);
filterCtrl.$inject = ['$http','conditionsProcessing', 'viewProcessing'];

})();
