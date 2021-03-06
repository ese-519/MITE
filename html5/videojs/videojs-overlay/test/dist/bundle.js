(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":1}],3:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
module.exports = function tsmlj(ts) {
  var out = '';
  var i = 0;

  // Match normal template string behavior to get the full, formatted string.
  for (; i < arguments.length; i++) {
    out += ts[i] + (arguments[i + 1] || '');
  }

  return out.replace(/\s+/g, ' ').trim();
};

},{}],5:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _templateObject = _taggedTemplateLiteral(['\n      created, listening to "', '" for "start" and\n      "', '" for "end"\n    '], ['\n      created, listening to "', '" for "start" and\n      "', '" for "end"\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n          hiding; ', ' is an integer and overlay should not show at this time\n        '], ['\n          hiding; ', ' is an integer and overlay should not show at this time\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n          hiding; show point (', ') is before now (', ') and end\n          point (', ') is an event\n        '], ['\n          hiding; show point (', ') is before now (', ') and end\n          point (', ') is an event\n        ']);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _tsmlj = require('tsmlj');

var _tsmlj2 = _interopRequireDefault(_tsmlj);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var defaults = {
  align: 'top-left',
  'class': '',
  content: 'This overlay will show up while the video is playing',
  debug: false,
  showBackground: true,
  attachToControlBar: false,
  overlays: [{
    start: 'playing',
    end: 'paused'
  }]
};

var Component = _videoJs2['default'].getComponent('Component');

/**
 * Whether the value is a `Number`.
 *
 * Both `Infinity` and `-Infinity` are accepted, but `NaN` is not.
 *
 * @param  {Number} n
 * @return {Boolean}
 */

/* eslint-disable no-self-compare */
var isNumber = function isNumber(n) {
  return typeof n === 'number' && n === n;
};
/* eslint-enable no-self-compare */

/**
 * Whether a value is a string with no whitespace.
 *
 * @param  {String} s
 * @return {Boolean}
 */
var hasNoWhitespace = function hasNoWhitespace(s) {
  return typeof s === 'string' && /^\S+$/.test(s);
};

/**
 * Overlay component.
 *
 * @class   Overlay
 * @extends {videojs.Component}
 */

var Overlay = (function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay(player, options) {
    var _this = this;

    _classCallCheck(this, Overlay);

    _get(Object.getPrototypeOf(Overlay.prototype), 'constructor', this).call(this, player, options);

    ['start', 'end'].forEach(function (key) {
      var value = _this.options_[key];

      if (isNumber(value)) {
        _this[key + 'Event_'] = 'timeupdate';
      } else if (hasNoWhitespace(value)) {
        _this[key + 'Event_'] = value;

        // An overlay MUST have a start option. Otherwise, it's pointless.
      } else if (key === 'start') {
          throw new Error('invalid "start" option; expected number or string');
        }
    });

    // video.js does not like components with multiple instances binding
    // events to the player because it tracks them at the player level,
    // not at the level of the object doing the binding. This could also be
    // solved with Function.prototype.bind (but not videojs.bind because of
    // its GUID magic), but the anonymous function approach avoids any issues
    // caused by crappy libraries clobbering Function.prototype.bind.
    // - https://github.com/videojs/video.js/issues/3097
    ['endListener_', 'rewindListener_', 'startListener_'].forEach(function (name) {
      _this[name] = function (e) {
        return Overlay.prototype[name].call(_this, e);
      };
    });

    // If the start event is a timeupdate, we need to watch for rewinds (i.e.,
    // when the user seeks backward).
    if (this.startEvent_ === 'timeupdate') {
      this.on(player, 'timeupdate', this.rewindListener_);
    }

    this.debug((0, _tsmlj2['default'])(_templateObject, this.startEvent_, this.endEvent_ || 'nothing'));

    this.hide();
  }

  _createClass(Overlay, [{
    key: 'createEl',
    value: function createEl() {
      var options = this.options_;
      var content = options.content;

      var background = options.showBackground ? 'vjs-overlay-background' : '';
      var el = _videoJs2['default'].createEl('div', {
        className: '\n        vjs-overlay\n        vjs-overlay-' + options.align + '\n        ' + options['class'] + '\n        ' + background + '\n        vjs-hidden\n      '
      });

      if (typeof content === 'string') {
        el.innerHTML = content;
      } else if (content instanceof _globalWindow2['default'].DocumentFragment) {
        el.appendChild(content);
      } else {
        _videoJs2['default'].appendContent(el, content);
      }

      return el;
    }

    /**
     * Logs debug errors
     * @param  {...[type]} args [description]
     * @return {[type]}         [description]
     */
  }, {
    key: 'debug',
    value: function debug() {
      if (!this.options_.debug) {
        return;
      }

      var log = _videoJs2['default'].log;
      var fn = log;

      // Support `videojs.log.foo` calls.

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (log.hasOwnProperty(args[0]) && typeof log[args[0]] === 'function') {
        fn = log[args.shift()];
      }

      fn.apply(undefined, ['overlay#' + this.id() + ': '].concat(args));
    }

    /**
     * Overrides the inherited method to perform some event binding
     *
     * @return {Overlay}
     */
  }, {
    key: 'hide',
    value: function hide() {
      _get(Object.getPrototypeOf(Overlay.prototype), 'hide', this).call(this);

      this.debug('hidden');
      this.debug('bound `startListener_` to "' + this.startEvent_ + '"');

      // Overlays without an "end" are valid.
      if (this.endEvent_) {
        this.debug('unbound `endListener_` from "' + this.endEvent_ + '"');
        this.off(this.player(), this.endEvent_, this.endListener_);
      }

      this.on(this.player(), this.startEvent_, this.startListener_);

      return this;
    }

    /**
     * Determine whether or not the overlay should hide.
     *
     * @param  {Number} time
     *         The current time reported by the player.
     * @param  {String} type
     *         An event type.
     * @return {Boolean}
     */
  }, {
    key: 'shouldHide_',
    value: function shouldHide_(time, type) {
      var end = this.options_.end;

      return isNumber(end) ? time >= end : end === type;
    }

    /**
     * Overrides the inherited method to perform some event binding
     *
     * @return {Overlay}
     */
  }, {
    key: 'show',
    value: function show() {
      _get(Object.getPrototypeOf(Overlay.prototype), 'show', this).call(this);
      this.off(this.player(), this.startEvent_, this.startListener_);
      this.debug('shown');
      this.debug('unbound `startListener_` from "' + this.startEvent_ + '"');

      // Overlays without an "end" are valid.
      if (this.endEvent_) {
        this.debug('bound `endListener_` to "' + this.endEvent_ + '"');
        this.on(this.player(), this.endEvent_, this.endListener_);
      }

      return this;
    }

    /**
     * Determine whether or not the overlay should show.
     *
     * @param  {Number} time
     *         The current time reported by the player.
     * @param  {String} type
     *         An event type.
     * @return {Boolean}
     */
  }, {
    key: 'shouldShow_',
    value: function shouldShow_(time, type) {
      var start = this.options_.start;
      var end = this.options_.end;

      if (isNumber(start)) {

        if (isNumber(end)) {
          return time >= start && time < end;

          // In this case, the start is a number and the end is a string. We need
          // to check whether or not the overlay has shown since the last seek.
        } else if (!this.hasShownSinceSeek_) {
            this.hasShownSinceSeek_ = true;
            return time >= start;
          }

        // In this case, the start is a number and the end is a string, but
        // the overlay has shown since the last seek. This means that we need
        // to be sure we aren't re-showing it at a later time than it is
        // scheduled to appear.
        return Math.floor(time) === start;
      }

      return start === type;
    }

    /**
     * Event listener that can trigger the overlay to show.
     *
     * @param  {Event} e
     */
  }, {
    key: 'startListener_',
    value: function startListener_(e) {
      var time = this.player().currentTime();

      if (this.shouldShow_(time, e.type)) {
        this.show();
      }
    }

    /**
     * Event listener that can trigger the overlay to show.
     *
     * @param  {Event} e
     */
  }, {
    key: 'endListener_',
    value: function endListener_(e) {
      var time = this.player().currentTime();

      if (this.shouldHide_(time, e.type)) {
        this.hide();
      }
    }

    /**
     * Event listener that can looks for rewinds - that is, backward seeks
     * and may hide the overlay as needed.
     *
     * @param  {Event} e
     */
  }, {
    key: 'rewindListener_',
    value: function rewindListener_(e) {
      var time = this.player().currentTime();
      var previous = this.previousTime_;
      var start = this.options_.start;
      var end = this.options_.end;

      // Did we seek backward?
      if (time < previous) {
        this.debug('rewind detected');

        // The overlay remains visible if two conditions are met: the end value
        // MUST be an integer and the the current time indicates that the
        // overlay should NOT be visible.
        if (isNumber(end) && !this.shouldShow_(time)) {
          this.debug((0, _tsmlj2['default'])(_templateObject2, end));
          this.hasShownSinceSeek_ = false;
          this.hide();

          // If the end value is an event name, we cannot reliably decide if the
          // overlay should still be displayed based solely on time; so, we can
          // only queue it up for showing if the seek took us to a point before
          // the start time.
        } else if (hasNoWhitespace(end) && time < start) {
            this.debug((0, _tsmlj2['default'])(_templateObject3, start, time, end));
            this.hasShownSinceSeek_ = false;
            this.hide();
          }
      }

      this.previousTime_ = time;
    }
  }]);

  return Overlay;
})(Component);

_videoJs2['default'].registerComponent('Overlay', Overlay);

/**
 * Initialize the plugin.
 *
 * @function plugin
 * @param    {Object} [options={}]
 */
var plugin = function plugin(options) {
  var _this2 = this;

  var settings = _videoJs2['default'].mergeOptions(defaults, options);

  // De-initialize the plugin if it already has an array of overlays.
  if (Array.isArray(this.overlays_)) {
    this.overlays_.forEach(function (overlay) {
      _this2.removeChild(overlay);
      if (_this2.controlBar) {
        _this2.controlBar.removeChild(overlay);
      }
      overlay.dispose();
    });
  }

  var overlays = settings.overlays;

  // We don't want to keep the original array of overlay options around
  // because it doesn't make sense to pass it to each Overlay component.
  delete settings.overlays;

  this.overlays_ = overlays.map(function (o) {
    var mergeOptions = _videoJs2['default'].mergeOptions(settings, o);

    // Attach bottom aligned overlays to the control bar so
    // they will adjust positioning when the control bar minimizes
    if (mergeOptions.attachToControlBar && _this2.controlBar && mergeOptions.align.indexOf('bottom') !== -1) {
      return _this2.controlBar.addChild('overlay', mergeOptions);
    }

    return _this2.addChild('overlay', mergeOptions);
  });
};

plugin.VERSION = '1.1.0';

_videoJs2['default'].plugin('overlay', plugin);

exports['default'] = plugin;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"global/window":3,"tsmlj":4}],6:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _globalDocument = require('global/document');

var _globalDocument2 = _interopRequireDefault(_globalDocument);

var _qunit = (typeof window !== "undefined" ? window['QUnit'] : typeof global !== "undefined" ? global['QUnit'] : null);

var _qunit2 = _interopRequireDefault(_qunit);

var _sinon = (typeof window !== "undefined" ? window['sinon'] : typeof global !== "undefined" ? global['sinon'] : null);

var _sinon2 = _interopRequireDefault(_sinon);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _srcPlugin = require('../src/plugin');

var _srcPlugin2 = _interopRequireDefault(_srcPlugin);

var Player = _videoJs2['default'].getComponent('Player');

_qunit2['default'].test('the environment is sane', function (assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof _sinon2['default'], 'object', 'sinon exists');
  assert.strictEqual(typeof _videoJs2['default'], 'function', 'videojs exists');
  assert.strictEqual(typeof _srcPlugin2['default'], 'function', 'plugin is a function');
});

_qunit2['default'].module('videojs-overlay', {

  beforeEach: function beforeEach() {
    var _this = this;

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = _sinon2['default'].useFakeTimers();

    this.fixture = _globalDocument2['default'].getElementById('qunit-fixture');
    this.video = _globalDocument2['default'].createElement('video');
    this.fixture.appendChild(this.video);
    this.player = (0, _videoJs2['default'])(this.video);

    // Simulate the video element playing to a specific time and stub
    // the `currentTime` method of the player to return this.
    this.currentTime = 0;

    this.player.currentTime = function () {
      return _this.currentTime;
    };

    this.updateTime = function (seconds) {
      _this.currentTime = seconds;
      _this.player.trigger('timeupdate');
    };

    this.assertOverlayCount = function (assert, expected) {
      var overlays = Array.prototype.filter.call(_this.player.$$('.vjs-overlay'), function (el) {
        return !_videoJs2['default'].hasClass(el, 'vjs-hidden');
      });
      var actual = overlays ? overlays.length : 0;
      var one = expected === 1;
      var msg = expected + ' overlay' + (one ? '' : 's') + ' exist' + (one ? 's' : '');

      assert.strictEqual(actual, expected, msg);
    };
  },

  afterEach: function afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

_qunit2['default'].test('registers itself with video.js', function (assert) {
  assert.expect(2);

  assert.strictEqual(Player.prototype.overlay, _srcPlugin2['default'], 'videojs-overlay plugin was registered');

  assert.ok(_videoJs2['default'].getComponent('Overlay'), 'the Overlay component was registered');
});

_qunit2['default'].test('does not display overlays when none are configured', function (assert) {
  assert.expect(1);

  this.player.overlay({
    overlays: []
  });

  this.assertOverlayCount(assert, 0);
});

_qunit2['default'].test('can be triggered and dismissed by events', function (assert) {
  assert.expect(3);

  this.player.overlay({
    overlays: [{
      start: 'custom-start',
      end: 'custom-end'
    }]
  });

  this.assertOverlayCount(assert, 0);

  this.player.trigger('custom-start');
  this.assertOverlayCount(assert, 1);

  this.player.trigger('custom-end');
  this.assertOverlayCount(assert, 0);
});

_qunit2['default'].test('can be triggered for time intervals', function (assert) {
  assert.expect(7);

  this.player.overlay({
    overlays: [{
      start: 5,
      end: 10
    }]
  });

  this.updateTime(4);
  this.assertOverlayCount(assert, 0);

  this.updateTime(5);
  this.assertOverlayCount(assert, 1);

  this.updateTime(7.5);
  this.assertOverlayCount(assert, 1);

  this.updateTime(10);
  this.assertOverlayCount(assert, 0);

  this.updateTime(11);
  this.assertOverlayCount(assert, 0);

  this.updateTime(6);
  this.assertOverlayCount(assert, 1);

  this.updateTime(12);
  this.assertOverlayCount(assert, 0);
});

_qunit2['default'].test('shows multiple overlays simultaneously', function (assert) {
  assert.expect(4);

  this.player.overlay({
    overlays: [{
      start: 3,
      end: 10
    }, {
      start: 'playing',
      end: 'ended'
    }]
  });

  this.updateTime(4);
  this.assertOverlayCount(assert, 1);

  this.player.trigger('playing');
  this.assertOverlayCount(assert, 2);

  this.player.trigger('ended');
  this.assertOverlayCount(assert, 1);

  this.updateTime(11);
  this.assertOverlayCount(assert, 0);
});

_qunit2['default'].test('the content of overlays can be specified as an HTML string', function (assert) {
  assert.expect(1);

  var innerHTML = '<p>overlay <a href="#">text</a></p>';

  this.player.overlay({
    content: innerHTML,
    overlays: [{
      start: 'playing',
      end: 'ended'
    }]
  });

  this.player.trigger('playing');

  assert.strictEqual(this.player.$('.vjs-overlay').innerHTML, innerHTML, 'innerHTML matched');
});

_qunit2['default'].test('an element can be used as the content of overlays', function (assert) {
  assert.expect(1);

  var content = _globalDocument2['default'].createElement('p');

  content.innerHTML = 'this is some text';

  this.player.overlay({
    content: content,
    overlays: [{
      start: 5,
      end: 10
    }]
  });

  this.updateTime(5);

  assert.strictEqual(this.player.$('.vjs-overlay p'), content, 'sets the content element');
});

_qunit2['default'].test('a DocumentFragment can be used as the content of overlays', function (assert) {
  assert.expect(1);

  var fragment = _globalDocument2['default'].createDocumentFragment();
  var br = _globalDocument2['default'].createElement('br');

  fragment.appendChild(br);

  this.player.overlay({
    content: fragment,
    overlays: [{
      start: 'showoverlay',
      end: 'hideoverlay'
    }]
  });

  this.player.trigger('showoverlay');

  assert.strictEqual(this.player.$('.vjs-overlay br'), br, 'sets the content fragment');
});

_qunit2['default'].test('allows content to be specified per overlay', function (assert) {
  assert.expect(5);

  var text = '<b>some text</b>';
  var html = '<p>overlay <a href="#">text</a></p>';
  var element = _globalDocument2['default'].createElement('i');
  var fragment = _globalDocument2['default'].createDocumentFragment();

  fragment.appendChild(_globalDocument2['default'].createElement('img'));

  this.player.overlay({
    content: text,
    overlays: [{
      start: 0,
      end: 1
    }, {
      content: html,
      start: 0,
      end: 1
    }, {
      content: element,
      start: 0,
      end: 1
    }, {
      content: fragment,
      start: 0,
      end: 1
    }]
  });

  this.updateTime(0);
  this.assertOverlayCount(assert, 4);

  assert.strictEqual(this.player.$$('.vjs-overlay b').length, 1, 'shows a default overlay');

  assert.strictEqual(this.player.$$('.vjs-overlay p').length, 1, 'shows an HTML string');

  assert.strictEqual(this.player.$$('.vjs-overlay i').length, 1, 'shows a DOM element');

  assert.strictEqual(this.player.$$('.vjs-overlay img').length, 1, 'shows a document fragment');
});

_qunit2['default'].test('allows css class to be specified per overlay', function (assert) {
  assert.expect(3);

  var text = '<b>some text</b>';
  var fragment = _globalDocument2['default'].createDocumentFragment();

  fragment.appendChild(_globalDocument2['default'].createElement('img'));

  this.player.overlay({
    content: text,
    overlays: [{
      'class': 'first-class-overlay',
      start: 0,
      end: 1
    }, {
      'class': 'second-class-overlay',
      start: 0,
      end: 1
    }, {
      start: 0,
      end: 1
    }]
  });

  this.updateTime(0);

  this.assertOverlayCount(assert, 3);

  assert.strictEqual(this.player.$$('.first-class-overlay').length, 1, 'shows an overlay with a custom class');

  assert.strictEqual(this.player.$$('.second-class-overlay').length, 1, 'shows an overlay with a different custom class');
});

_qunit2['default'].test('does not double add overlays that are triggered twice', function (assert) {
  assert.expect(1);

  this.player.overlay({
    overlays: [{
      start: 'start',
      end: 'end'
    }]
  });

  this.player.trigger('start');
  this.player.trigger('start');
  this.assertOverlayCount(assert, 1);
});

_qunit2['default'].test('does not double remove overlays that are triggered twice', function (assert) {
  assert.expect(1);

  this.player.overlay({
    overlays: [{
      start: 'start',
      end: 'end'
    }]
  });

  this.player.trigger('start');
  this.player.trigger('end');
  this.player.trigger('end');
  this.assertOverlayCount(assert, 0);
});

_qunit2['default'].test('displays overlays that mix event and playback time triggers', function (assert) {
  assert.expect(4);

  this.player.overlay({
    overlays: [{
      start: 'start',
      end: 10
    }, {
      start: 5,
      end: 'end'
    }]
  });

  this.player.trigger('start');
  this.assertOverlayCount(assert, 1);

  this.updateTime(6);
  this.assertOverlayCount(assert, 2);

  this.updateTime(10);
  this.assertOverlayCount(assert, 1);

  this.player.trigger('end');
  this.assertOverlayCount(assert, 0);
});

_qunit2['default'].test('shows mixed trigger overlays once per seek', function (assert) {
  assert.expect(6);

  this.player.overlay({
    overlays: [{
      start: 1,
      end: 'pause'
    }]
  });

  this.updateTime(1);
  this.assertOverlayCount(assert, 1);

  this.player.trigger('pause');
  this.assertOverlayCount(assert, 0);

  this.updateTime(2);
  this.assertOverlayCount(assert, 0);

  this.updateTime(1);
  this.assertOverlayCount(assert, 1);

  this.player.trigger('pause');
  this.assertOverlayCount(assert, 0);

  this.updateTime(2);
  this.assertOverlayCount(assert, 0);
});

_qunit2['default'].test('applies simple alignment class names', function (assert) {
  assert.expect(4);

  this.player.overlay({
    overlays: [{
      start: 'start',
      align: 'top'
    }, {
      start: 'start',
      align: 'left'
    }, {
      start: 'start',
      align: 'right'
    }, {
      start: 'start',
      align: 'bottom'
    }]
  });

  this.player.trigger('start');

  assert.ok(this.player.$('.vjs-overlay.vjs-overlay-top'), 'applies top class');

  assert.ok(this.player.$('.vjs-overlay.vjs-overlay-right'), 'applies right class');

  assert.ok(this.player.$('.vjs-overlay.vjs-overlay-bottom'), 'applies bottom class');

  assert.ok(this.player.$('.vjs-overlay.vjs-overlay-left'), 'applies left class');
});

_qunit2['default'].test('applies compound alignment class names', function (assert) {
  assert.expect(4);

  this.player.overlay({
    overlays: [{
      start: 'start',
      align: 'top-left'
    }, {
      start: 'start',
      align: 'top-right'
    }, {
      start: 'start',
      align: 'bottom-left'
    }, {
      start: 'start',
      align: 'bottom-right'
    }]
  });

  this.player.trigger('start');

  assert.ok(this.player.$('.vjs-overlay.vjs-overlay-top-left'), 'applies top class');

  assert.ok(this.player.$('.vjs-overlay.vjs-overlay-top-right'), 'applies right class');

  assert.ok(this.player.$('.vjs-overlay.vjs-overlay-bottom-left'), 'applies bottom class');

  assert.ok(this.player.$('.vjs-overlay.vjs-overlay-bottom-right'), 'applies left class');
});

_qunit2['default'].test('removes time based overlays if the user seeks backward', function (assert) {
  assert.expect(2);

  this.player.overlay({
    overlays: [{
      start: 5,
      end: 10
    }]
  });

  this.updateTime(6);
  this.assertOverlayCount(assert, 1);

  this.updateTime(4);
  this.assertOverlayCount(assert, 0);
});

_qunit2['default'].test('applies background styling when showBackground is true', function (assert) {
  assert.expect(1);

  this.player.overlay({
    overlays: [{
      start: 'start',
      showBackground: true
    }]
  });

  this.player.trigger('start');

  assert.ok(this.player.$('.vjs-overlay.vjs-overlay-background'), 'applies background styling');
});

_qunit2['default'].test('doesn\'t apply background when showBackground is false', function (assert) {
  assert.expect(1);

  this.player.overlay({
    overlays: [{
      start: 'start',
      showBackground: false
    }]
  });

  this.player.trigger('start');

  assert.notOk(this.player.$('.vjs-overlay.vjs-overlay-background'), 'does not apply background styling');
});

_qunit2['default'].test('attaches bottom aligned overlays to the controlBar', function (assert) {
  assert.expect(4);

  this.player.overlay({
    attachToControlBar: true,
    overlays: [{
      start: 'start',
      align: 'bottom-left'
    }, {
      start: 'start',
      align: 'bottom'
    }, {
      start: 'start',
      align: 'bottom-right'
    }, {
      start: 'start',
      align: 'top-right'
    }]
  });

  this.player.trigger('start');

  assert.ok(this.player.controlBar.$('.vjs-overlay.vjs-overlay-bottom-left'), 'bottom-left attaches to control bar');

  assert.ok(this.player.controlBar.$('.vjs-overlay.vjs-overlay-bottom'), 'bottom attaches to control bar');

  assert.ok(this.player.controlBar.$('.vjs-overlay.vjs-overlay-bottom-right'), 'bottom-right attaches to control bar');

  assert.notOk(this.player.controlBar.$('.vjs-overlay.vjs-overlay-top-right'), 'top-right is not attached to control bar');
});

_qunit2['default'].test('attach only to player when attachToControlbar is false', function (assert) {
  assert.expect(2);

  this.player.overlay({
    attachToControlBar: false,
    overlays: [{
      start: 'start',
      align: 'bottom-left'
    }, {
      start: 'start',
      align: 'bottom'
    }]
  });

  assert.notOk(this.player.controlBar.$('.vjs-overlay.vjs-overlay-bottom-left'), 'bottom-left is not attached to control bar');

  assert.notOk(this.player.controlBar.$('.vjs-overlay.vjs-overlay-bottom'), 'bottom is not attached to control bar');
});

_qunit2['default'].test('can deinitialize the plugin on reinitialization', function (assert) {
  assert.expect(3);

  this.player.overlay({
    attachToControlBar: true,
    overlays: [{
      start: 'start',
      align: 'bottom-left'
    }, {
      start: 'start',
      align: 'top-right'
    }]
  });

  this.player.overlay({
    overlays: [{
      start: 'start',
      align: 'top-left'
    }]
  });

  assert.notOk(this.player.$('.vjs-overlay.vjs-overlay-bottom-left'), 'previous bottom-left aligned overlay removed');

  assert.notOk(this.player.$('.vjs-overlay.vjs-overlay-top-right'), 'previous top-right aligned overlay removed');

  assert.ok(this.player.$('.vjs-overlay.vjs-overlay-top-left'), 'new top-left overlay added');
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../src/plugin":5,"global/document":2}]},{},[6]);
