;
(function (window) {
  'use strict';

  var sections = [
    'acerca',
    'reuniones',
    'contacto',
    'patrocinadores'
  ];
  var waypoints = [];
  var index = -1;

  return {
    setEvents: function () {
      for (var i = 0; i < sections.length; i += 1) {
        var newWaypoint = new Waypoint({
          element: document.getElementById(sections[i]),
          handler: function (direction) {
            if (direction === 'down') {
              index += 1;
            } else {
              index -= 1;
            }

            History.pushState(null, null, '/' + (sections[index] || ''));
          }
        });

        waypoints.push(newWaypoint);
      }
    },
    goTo: function (elementId) {
      document.getElementById(elementId).scrollIntoView();
    },
    init: function () {
      this.setEvents();

      var section = window.location.pathname.substr(1);
      if (sections.indexOf(section) >= 0) {
        this.goTo(section);
      }

      console.log('Hello visitor! this page was developed by @_TonyMtz (http://tonymtz.com)');
    }
  };
}(window)).init();
