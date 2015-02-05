'use strict';

angular.module('lunchadoresApp').provider('notificationsConfig',
  function() {
    var config = {
      hideDelay: 3000,
      autoHide: false,
      saveReponse: false
    };

    function setHideDelay(value) {
      config.hideDelay = value;
    }

    function getHideDelay() {
      return config.hideDelay;
    }

    function setAutoHide(value) {
      config.autoHide = value;
    }

    function getAutoHide() {
      return config.autoHide;
    }

    function setSaveResponse(value) {
      config.saveResponse = value;
    }

    function getSaveResponse() {
      return config.saveResponse;
    }

  return {
    'setHideDelay': setHideDelay,
    'setAutoHide': setAutoHide,
    'setSaveResponse': setSaveResponse,

    $get: function() {
      return {
        'getHideDelay': getHideDelay,
        'getAutoHide': getAutoHide,
        'getSaveResponse': getSaveResponse
      };
    }
  };
});
