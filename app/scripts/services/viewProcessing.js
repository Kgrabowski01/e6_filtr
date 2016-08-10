(function () {
  'use strict';

  angular.module('es6FiltryApp')

  .service('viewProcessing', viewProcessing);
  viewProcessing.$inject = ['$q'];

  function viewProcessing ($q) {

    var views = {
      viewFilterDetail: false,
      viewFilterConditionsAny: false,
      viewFilterConditionsAll: false,
      filterAttr: false,
      loadFilterDetail: false
    };

    function changeView (view) {
      if (views[view] === false) {
        views[view] = true;
        return $q.resolve(views[view]);
      }
        views[view] = false;
        return $q.resolve(views[view]);
    }

    function clearFilterObj () {
      views.viewFilterDetail = false;
      views.viewFilterConditionsAny = false;
      views.viewFilterConditionsAll = false;
      views.filterAttr = false;
    }

    return {
      views: views,
      changeView: changeView,
      clearFilterObj: clearFilterObj
    };

  }
})();
