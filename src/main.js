(function() {
  'use strict';

  window.sloppyscroll = {
    init: function () {
      var scrollableLinks = document.querySelectorAll('[data-sloppy-scroll]');

      [].forEach.call(scrollableLinks, function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();

          var linkParts = link.getAttribute('href').split('#');
          var linkId = linkParts[linkParts.length - 1];
          start(linkId);
        });
      });
    }
  };

  var minSpeed         = 150
    , toleranceBuffer  = 1
    , animationStopped = false
    , requestId
    , targetEl
    , targetId;

  function start(target) {
    targetId         = target;
    targetEl         = document.getElementById(targetId);
    animationStopped = false;
    loop();
  }

  function stop() {
    if (requestId) {
      window.cancelAnimationFrame(requestId);
      requestId        = undefined;
      animationStopped = true;
      location.hash    = targetId;
    }
  }

  function loop() {
    if (!animationStopped) {
      scroll(targetEl);
      requestId = window.requestAnimationFrame(loop);
    }
  }

  function scroll(el) {
    var targetOffset  = el.offsetTop
      , pageOffset    = window.pageYOffset
      , oldPageOffset = pageOffset;

    if (targetOffset > pageOffset + toleranceBuffer) {
      window.scrollTo(el.offsetLeft, pageOffset + easeOut(targetOffset, pageOffset));
      if (oldPageOffset >= pageYOffset) stop();
    } else if (targetOffset < pageOffset - toleranceBuffer) {
      window.scrollTo(el.offsetLeft, pageOffset - easeOut(pageOffset, targetOffset));
      if (oldPageOffset <= pageYOffset) stop();
    } else {
      window.scrollTo(el.offsetLeft, targetOffset); // it might be 1px off, so scroll the last bit
      stop();
    }
  }

  function easeOut(firstOffset, secondOffset) {
    var distance = firstOffset - secondOffset;

    if (distance >= minSpeed * 2) {
      return minSpeed;
    } else {
      return (parseInt(distance/10) * 2) + toleranceBuffer;
    }
  }
})();

