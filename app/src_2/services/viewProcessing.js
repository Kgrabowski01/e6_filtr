(function () {
  'use strict';

  class ViewProcessing {

    constructor($q) {
      this.$q = $q;
      this.views = {
        viewFilterDetail: false,
        viewFilterConditionsAny: false,
        viewFilterConditionsAll: false,
        filterAttr: false,
        loadFilterDetail: false
      };
    }

    changeView(view) {
      if (this.views[view] === false) {
        this.views[view] = true;
        return this.$q.resolve(this.views[view]);
      }
      this.views[view] = false;
      return this.$q.resolve(this.views[view]);
    }

    clearFilterObj() {
      this.views.viewFilterDetail = false;
      this.views.viewFilterConditionsAny = false;
      this.views.viewFilterConditionsAll = false;
      this.views.filterAttr = false;
    }

  }

  ViewProcessing.$inject = ['$q'];
  angular.module('es6FiltryApp')
  .service('viewProcessing', ViewProcessing);

})();
