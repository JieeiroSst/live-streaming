window.onload = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    tracking.ColorTracker.registerColor('purple', function(r, g, b) {
      var dx = r - 120;
      var dy = g - 60;
      var dz = b - 210;

      if ((b - g) >= 100 && (r - g) >= 60) {
        return true;
      }
      return dx * dx + dy * dy + dz * dz < 3500;
    });

    var tracker = new tracking.ColorTracker(['yellow', 'purple']);
    tracker.setMinDimension(5);

    tracking.track('#video', tracker);

    tracker.on('track', function(event) {
      context.clearRect(0, 0, canvas.width, canvas.height);

      event.data.forEach(function(rect) {
        if (rect.color === 'custom') {
          rect.color = tracker.customColor;
        }

        context.strokeStyle = rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });
    });

    initGUIControllers(tracker);
};