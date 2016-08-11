(function () {
	'use strict';

	class FilterCtrlConstructor {

		constructor($http, conditionsProcessing, viewProcessing) {
			this.$http = $http;
			this.conditionsProcessing = conditionsProcessing;
			this.viewProcessing = viewProcessing;
			// widoki
			this.viewFilterDetail = viewProcessing.views.viewFilterDetail;
			this.viewFilterConditionsAny = viewProcessing.views.viewFilterConditionsAny;
			this.viewFilterConditionsAll = viewProcessing.views.viewFilterConditionsAll;
			this.filterAttr = viewProcessing.views.filterAttr;
			this.loadFilterDetail = viewProcessing.views.loadFilterDetail;
			// /widoki
			// warunki filtra
			this.filterOptions = {
				filterName:''
			};
			this.filterQuery = {};
			this.tempQuery = {};
			this.tempConditionObj = [];
		}

		selectFilter (filter) {
			this.clearFilters();
			for (let i = 0; i < filter.conditions.and.length; i++) {
				(i => {
					this.conditionsProcessing.setFilterConditionsObjAnd(filter, i)
					.then(conditionObject => {
						this.addCondition(filter.conditions.and[i].property, conditionObject, 'and', filter.name);
					});
				})(i);
			}
			for (let i = 0; i < filter.conditions.or.length; i++) {
				(i => {
					this.conditionsProcessing.setFilterConditionsObjOr(filter, i)
					.then(conditionObject => {
						this.addCondition(filter.conditions.or[i].property, conditionObject, 'or', filter.name);
					});
				})(i);
			}
		}

		addCondition (conditionName, conditionObject, logicalOperator, filterName) {
			if (conditionObject === undefined || conditionObject.operator === undefined || conditionObject.value === undefined) {
				return window.alert("You must select filter values!"); // zastosowany window alert poniewaz nie dzialaly mi pola required w filterBy.html
			}
			let tempFilterName;
			if (this.filterOptions.filterName !== undefined) {
				tempFilterName = this.filterOptions.filterName;
			}
			this.conditionsProcessing.createCondition(conditionName, conditionObject, logicalOperator, filterName)
			.then(conditions => {
				this.tempConditionObj = conditions;
			});
			this.filterOptions = {};
			this.filterOptions.filterName = tempFilterName;
			this.filterQuery = {};
		}

		deleteCondition (logicalOperator, index) {
			let conditionObj = this.tempConditionObj;
			this.conditionsProcessing.removeCondition(conditionObj, logicalOperator, index)
			.then(newConditionObj => {
				this.tempConditionObj = newConditionObj;
			});
		}

		changeView (view, name) {
			if (this.loadFilterDetail === true && this.tempConditionObj.name !== name && view === 'loadFilterDetail' ) {
				return this.loadFilterDetail;
			}
			this.viewProcessing.changeView(view)
			.then(val => {
				this[view] = val;
			});
		}

		clearFilters () {
			this.conditionsProcessing.clearConditionObj();
			this.viewProcessing.clearFilterObj();
			this.filterQuery = {};
			this.tempQuery = {};
			this.tempConditionObj = [];
			this.filterOptions = {
				filterName:''
			};
			this.viewFilterDetail = this.viewProcessing.views.viewFilterDetail;
			this.viewFilterConditionsAny = this.viewProcessing.views.viewFilterConditionsAny;
			this.viewFilterConditionsAll = this.viewProcessing.views.viewFilterConditionsAll;
			this.filterAttr = this.viewProcessing.views.filterAttr;
		}

		clearAndChangeAddView () {
			this.viewProcessing.changeView('viewFilterDetail')
			.then(newViewVal => {
				this.viewFilterDetail = newViewVal;
			});
			this.conditionsProcessing.clearConditionObj();
			this.filterQuery = {};
			this.tempQuery = {};
			this.tempConditionObj = [];
			this.filterOptions = {
				filterName:''
			};
		}

		showConditionAttrs (conditionName) { // myslalem nad przeniesieniem tego do serwisu, ale nie jest to zbyt "prosta" funkcja?
		this.filterAttr = conditionName;
	}

}

const filterComponent = {
	bindings: {
		filters: '<',
		conditions: '<',
		users: '<',
		onEdit: '&',
		addFilter: '&',
		cloneFilter: '&'
	},
	controller: FilterCtrlConstructor,
	controllerAs: 'ctrl',
	templateUrl: 'views/filterBy.html'
};

FilterCtrlConstructor.$inject = ['$http','conditionsProcessing', 'viewProcessing'];
angular.module('es6FiltryApp')
.controller('FilterCtrlConstructor', FilterCtrlConstructor)
.component('filterComponent', filterComponent);

})();
