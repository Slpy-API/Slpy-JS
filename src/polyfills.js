import 'core-js/es/string/includes.js';
import 'core-js/es/string/starts-with.js'
import 'core-js/es/array/includes.js';
import 'core-js/es/typed-array/includes.js'
import 'core-js/es/set/index.js';
import 'core-js/es/array/flat-map.js';
import 'core-js/es/array/find.js';
import 'core-js/es/array/from.js'
import 'core-js/es/typed-array/uint8-array.js';
import 'core-js/es/object/define-property.js';
import 'core-js/web/url'
import 'pepjs'
import 'whatwg-fetch'
import 'classlist-polyfill'
import 'resize-observer-polyfill/dist/ResizeObserver.global'
import 'requestanimationframe'


//polyfill for getRootNode
if (!Node.prototype.getRootNode) {
    Node.prototype.getRootNode = function (options) {
        var node = this;
        var parentNode = node.parentNode;

        while (parentNode) {
            node = parentNode;
            parentNode = node.parentNode;
        }

        if (options && options.composed) {
            var doc = node.ownerDocument;
            if (doc && doc.defaultView && doc.defaultView.frameElement) {
                return doc.defaultView.frameElement.getRootNode(options);
            }
        }

        return node;
    }
}

if (typeof window.ShadowRoot === 'undefined') {
    window.ShadowRoot = function () {
        this.toString = function () {
            return '[object ShadowRoot]';
        }
    }
}

if (typeof window.MutationObserver === 'undefined') {
    (function () {
        var MutationObserver;

        if (window.MutationObserver != null) {
            return;
        }

        MutationObserver = (function () {
            function MutationObserver(callBack) {
                this.callBack = callBack;
            }

            MutationObserver.prototype.observe = function (element, options) {
                this.element = element;
                return this.interval = setInterval((function (_this) {
                    return function () {
                        var html;
                        html = _this.element.innerHTML;
                        if (html !== _this.oldHtml) {
                            _this.oldHtml = html;
                            return _this.callBack.apply(null);
                        }
                    };
                })(this), 200);
            };

            MutationObserver.prototype.disconnect = function () {
                return window.clearInterval(this.interval);
            };

            return MutationObserver;

        })();

        window.MutationObserver = MutationObserver;

    }).call(this);
}

// Function to detect IE10
function isIE10() {
    return window.navigator.userAgent.indexOf("MSIE 10") !== -1;
}


if (typeof window.Worker === 'undefined' || isIE10()) {
    window.Worker = function (scriptUrl) {
        this._scriptUrl = scriptUrl;
        this.onmessage = null;
    };

    window.Worker.prototype.postMessage = function (msg) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this._scriptUrl, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var scriptText = xhr.responseText;
                var data = (function () {
                    return (new Function('return ' + scriptText))();
                })();
                if (_this.onmessage) {
                    _this.onmessage({ data: data });
                }
            }
        };
        xhr.send();
    };
}

if (typeof window.btoa === 'undefined') {
    window.btoa = function (input) {
        var str = String(input);
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        while (i < str.length) {
            chr1 = str.charCodeAt(i++);
            chr2 = i < str.length ? str.charCodeAt(i++) : NaN;
            chr3 = i < str.length ? str.charCodeAt(i++) : NaN;
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }

        return output;
    };
}

if (typeof window.Buffer === 'undefined') {
    window.Buffer = {
        from: function (str, encoding) {
            function utf8ToBinaryString(str) {
                var binaryStr = '';
                for (var i = 0; i < str.length; i++) {
                    binaryStr += str.charCodeAt(i).toString(2).padStart(8, '0');
                }
                return binaryStr;
            }

            function binaryToBase64(binaryString) {
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var result = '';

                var padding = binaryString.length % 6;
                if (padding) {
                    binaryString += '0'.repeat(6 - padding);
                }

                for (var i = 0; i < binaryString.length; i += 6) {
                    var int6 = parseInt(binaryString.slice(i, i + 6), 2);
                    result += characters.charAt(int6);
                }

                var remaining = str.length % 3;
                if (remaining) {
                    result += '='.repeat(3 - remaining);
                }

                return result;
            }

            var binaryString;
            if (encoding === 'binary') {
                binaryString = utf8ToBinaryString(str);
            } else {
                throw new Error('Unsupported encoding: ' + encoding);
            }

            return {
                toString: function (format) {
                    if (format === 'base64') {
                        return binaryToBase64(binaryString);
                    } else {
                        throw new Error('Unsupported format: ' + format);
                    }
                }
            };
        }
    };
}

// IE11 does not polyfill with pepjs, so we create polyfill from MouseEvent to get it working
if (window.PointerEvent && typeof window.PointerEvent !== 'function') {
    window.PointerEvent = function (type, pointerEventInit) {
        pointerEventInit = pointerEventInit || {};
        var event = document.createEvent('MouseEvent');
        event.initMouseEvent(type,
            (pointerEventInit.bubbles === undefined) ? true : pointerEventInit.bubbles,
            (pointerEventInit.cancelable === undefined) ? true : pointerEventInit.cancelable,
            window,
            0,
            pointerEventInit.screenX || 0,
            pointerEventInit.screenY || 0,
            pointerEventInit.clientX || 0,
            pointerEventInit.clientY || 0,
            pointerEventInit.ctrlKey || false,
            pointerEventInit.altKey || false,
            pointerEventInit.shiftKey || false,
            pointerEventInit.metaKey || false,
            pointerEventInit.button || 0,
            pointerEventInit.relatedTarget || null
        );

        // Set width and height
        event.width = pointerEventInit.width || 0;
        event.height = pointerEventInit.height || 0;

        // Set pointerId and isPrimary
        event.pointerId = pointerEventInit.pointerId || 0;
        event.isPrimary = pointerEventInit.isPrimary || false;

        return event;
    }
}