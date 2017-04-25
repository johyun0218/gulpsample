'use strict';

import angular from 'angular';

export function Modal($rootScope, $uibModal) {
  /**
   * Opens a modal
   * @param  {Object} scope      - an object to be merged with modal's scope
   * @param  {String} modalClass - (optional) class(es) to be applied to the modal
   * @return {Object}            - the instance $uibModal.open() returns
   */
  function openModal(scope = {}, modalClass = 'modal-default') {
    var modalScope = $rootScope.$new();

    angular.extend(modalScope, scope);

    return $uibModal.open({
      template: require('./modal.html'),
      windowClass: modalClass,
      scope: modalScope
    });
  }

  // Public API here
  return {

    /* Confirmation modals */
    confirm: {

      /**
       * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
       * @param  {Function} del - callback, ran when delete is confirmed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */
      delete(del = angular.noop) {
        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed straight to del callback
         */
        return function() {
          var args = Array.prototype.slice.call(arguments);
          var name = args.shift();
          var deleteModal;

          deleteModal = openModal({
            modal: {
              dismissable: true,
              title: 'Confirm Delete',
              html: `<p>Are you sure you want to delete <strong>${name}</strong> ?</p>`,
              buttons: [{
                classes: 'btn-danger',
                text: 'Delete',
                click(e) {
                  deleteModal.close(e);
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                click(e) {
                  deleteModal.dismiss(e);
                }
              }]
            }
          }, 'modal-danger');

          deleteModal.result.then(function(event) {
            del.apply(event, args);
          });
        };
      }
    }
  };
}

export function ModalBasic($uibModal, $q, $templateRequest) {
  'ngInject';
  /**
   * size : '', 'lg', 'sm'
   */
  function openModal(size, templateId, controller, params) {
    var modalInstance = $uibModal.open({
        templateUrl: templateId,
        controller: controller,
        size: size,
        dismissable: true,
        resolve: {
            params: function() {
                return params;
            }
        }
    });
    //console.log(modalInstance);
    var deferred = $q.defer();
    modalInstance.result
    .then(function(result) {
        deferred.resolve(result);
    }, function(error) {
        deferred.reject(error);
    });
    return deferred.promise;
  }

  return {
    open: openModal
  };
}

export default angular.module('envicase3App.Modal', [])
  .factory('Modal', Modal)
  .factory('ModalBasic', ModalBasic)
  .name;
