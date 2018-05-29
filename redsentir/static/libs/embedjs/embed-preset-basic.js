(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.embedPresetBasic = factory());
}(this, (function () { 'use strict';

var justExtend = extend;
function extend() {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    if (!result || typeof result != 'object' && typeof result != 'function') {
        throw new Error('extendee must be an object');
    }
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0;i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            var value = extender[key];
            if (deep && value && (typeof value == 'object' || typeof value == 'function')) {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend(true, result[key] || base, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

var justExtend$1 = extend$2;
function extend$2() {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    if (!result || typeof result != 'object' && typeof result != 'function') {
        throw new Error('extendee must be an object');
    }
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0;i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            var value = extender[key];
            if (deep && value && (typeof value == 'object' || typeof value == 'function')) {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend$2(true, result[key] || base, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' && document.nodeType === 9;

var justExtend$2 = extend$4;
function extend$4() {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    if (!result || typeof result != 'object' && typeof result != 'function') {
        throw new Error('extendee must be an object');
    }
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0;i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            var value = extender[key];
            if (deep && value && (typeof value == 'object' || typeof value == 'function')) {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend$4(true, result[key] || base, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

var justExtend$3 = extend$6;
function extend$6() {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    if (!result || typeof result != 'object' && typeof result != 'function') {
        throw new Error('extendee must be an object');
    }
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0;i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            var value = extender[key];
            if (deep && value && (typeof value == 'object' || typeof value == 'function')) {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend$6(true, result[key] || base, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

function matchAll(str, re) {
    var matches = [];
    var res = re.exec(str);
    while (res) {
        matches.push(res);
        if (!re.global) {
            break;
        }
        res = re.exec(str);
    }
    return matches;
}

function replaceAll(str, matches) {
    return matches.reverse().reduce(function (res, match) {
        var prefix = res.slice(0, match.index);
        var postfix = res.slice(match.index + match[0].length);
        return prefix + match.replacement + postfix;
    }, str);
}

function assignReplacement(match, replacer) {
    var args = match.concat([match.index,match.input]);
    return replacer.apply(null, args).then(function (res) {
        return justExtend$3({}, match, {
            replacement: res
        });
    });
}

function concurrency(matches, replacer) {
    var promises = matches.map(function (match) {
        return assignReplacement(match, replacer);
    });
    return Promise.all(promises);
}

function processString(str, re, replacer) {
    var matches = matchAll(str, re);
    var processor = concurrency;
    return processor(matches, replacer).then(function (matches) {
        return replaceAll(str, matches);
    });
}

function stringReplaceAsync(str, re, replacer) {
    re.lastIndex = 0;
    try {
        return Promise.resolve(processString(str, re, replacer));
    } catch (e) {
        return Promise.reject(e);
    }
}

var anchorRegex = /<a[^>]*>([^<]+)<\/a>/gi;
function getAnchorRegex(regex) {
    return new RegExp(("<a[^>]*>(" + (regex.source) + ")<\\/a>"), "gi");
}

function isMatchPresent(regex, text, test) {
    if ( test === void 0 ) test = false;

    return test ? regex.test(text) : text.match(regex);
}

function isAnchorTagApplied(ref, ref$1) {
    var result = ref.result;
    var plugins = ref.plugins; if ( plugins === void 0 ) plugins = [];
    var regex = ref$1.regex;

    return getAnchorRegex(regex).test(result) || plugins.filter(function (plugin) { return plugin.id === "url"; }).length;
}

function saveServiceName(ref, ref$1, match) {
    var _services = ref._services;
    var id = ref$1.id;

    if (!_services.filter(function (x) { return x.match === match; }).length) {
        _services.push({
            id: id,
            match: match
        });
    }
}

function pushEmbedContent(text, options, pluginOptions, index) {
    return new Promise(function ($return, $error) {
        var regex;
        var assign;
        ((assign = pluginOptions, regex = assign.regex));
        return stringReplaceAsync(text, regex, function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return new Promise(function ($return, $error) { return getTemplate(args, options, pluginOptions).then(function ($await_7) {
            try {
                options._embeds.push({
                    content: $await_7,
                    index: index || args.find(function (x) { return typeof x === "number"; })
                });
                saveServiceName(options, pluginOptions, args[0]);
                return $return();
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }, $error); });
        }).then(function ($await_8) {
            try {
                return $return(options);
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }, $error);
    });
}

function saveEmbedData(opts, pluginOptions) {
    var this$1 = this;

    return new Promise(function ($return, $error) {
        var regex;
        var options;
        var assign;
        ((assign = pluginOptions, regex = assign.regex));
        options = justExtend$3({}, opts);
        if (isAnchorTagApplied(options, {
            regex: regex
        })) {
            return stringReplaceAsync(options.result, anchorRegex, function (match, url, index) { return new Promise(function ($return, $error) {
                if (!isMatchPresent(regex, match, true)) 
                    { return $return(match); }
                saveServiceName(options, pluginOptions, match);
                return pushEmbedContent(url, options, pluginOptions, index).then(function ($await_9) {
                    try {
                        options = $await_9;
                        return $return(match);
                    } catch ($boundEx) {
                        return $error($boundEx);
                    }
                }, $error);
            }); }).then(function ($await_10) {
                try {
                    return $If_3.call(this$1);
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }, $error);
        } else {
            options = pushEmbedContent(options.result, options, pluginOptions);
            return $If_3.call(this$1);
        }
        function $If_3() {
            return $return(options);
        }
        
    });
}

function getMatch(regex, string) {
    regex.lastIndex = 0;
    var matches = regex.exec(string);
    regex.lastIndex = 0;
    return matches;
}

function getTemplate(args, options, pluginOptions) {
    var this$1 = this;

    return new Promise(function ($return, $error) {
        var _process, template;
        var data;
        var assign;
        ((assign = pluginOptions, _process = assign._process, template = assign.template));
        if (_process) {
            return _process(args, options, pluginOptions).then(function ($await_11) {
                try {
                    data = $await_11;
                    return $If_4.call(this$1);
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }, $error);
        }
        function $If_4() {
            return $return(template(args, options, pluginOptions, data));
        }
        
        return $If_4.call(this$1);
    });
}

function basicReplace(options, pluginOptions) {
    return new Promise(function ($return, $error) {
        var result = options.result;
        var replaceUrl = options.replaceUrl;
        var regex = pluginOptions.regex;
        var _replaceAnyways = pluginOptions._replaceAnyways;
        return $return(stringReplaceAsync(result, regex, function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return new Promise(function ($return, $error) {
            saveServiceName(options, pluginOptions, args[0]);
            return new Promise(function ($return, $error) {
                if (replaceUrl || _replaceAnyways) 
                    { return $return(getTemplate(args, options, pluginOptions)); }
                return getTemplate(args, options, pluginOptions).then(function ($await_12) {
                    try {
                        return $return(((args[0]) + " " + $await_12));
                    } catch ($boundEx) {
                        return $error($boundEx);
                    }
                }, $error);
            }).then($return, $error);
        });
        }));
    });
}

function anchorReplace(options, pluginOptions) {
    return new Promise(function ($return, $error) {
        var result = options.result;
        var replaceUrl = options.replaceUrl;
        var regex = pluginOptions.regex;
        var _replaceAnyways = pluginOptions._replaceAnyways;
        return $return(stringReplaceAsync(result, anchorRegex, function (match, url) { return new Promise(function ($return, $error) {
            var args, t;
            if (!isMatchPresent(regex, url, true)) {
                return $return(match);
            }
            if (!(replaceUrl || _replaceAnyways)) {
                args = getMatch(regex, url);
                saveServiceName(options, pluginOptions, args[0]);
                return getTemplate(args, options, pluginOptions).then(function ($await_14) {
                    try {
                        t = $await_14;
                        return $return(args ? match + t : match);
                    } catch ($boundEx) {
                        return $error($boundEx);
                    }
                }, $error);
            }
            return $return(stringReplaceAsync(url, regex, function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                return new Promise(function ($return, $error) {
                saveServiceName(options, pluginOptions, args[0]);
                return $return(getTemplate(args, options, pluginOptions));
            });
            }));
        }); }));
    });
}

var insert = function (options, pluginOptions) {
    return new Promise(function ($return, $error) {
        var inlineEmbed, _ignoreAnchorCheck, _ignoreInlineCheck, regex;
        var output;
        var assign;
        ((assign = options, inlineEmbed = assign.inlineEmbed));
        var assign$1;
        ((assign$1 = pluginOptions, _ignoreAnchorCheck = assign$1._ignoreAnchorCheck, _ignoreInlineCheck = assign$1._ignoreInlineCheck, regex = assign$1.regex));
        if (!inlineEmbed && !_ignoreInlineCheck) {
            return $return(saveEmbedData(options, pluginOptions));
        }
        return new Promise(function ($return, $error) {
            if (isAnchorTagApplied(options, {
                regex: regex
            }) && !_ignoreAnchorCheck) {
                return anchorReplace(options, pluginOptions).then($return, $error);
            }
            return basicReplace(options, pluginOptions).then($return, $error);
        }).then(function ($await_17) {
            try {
                output = $await_17;
                return $return(justExtend$3({}, options, {
                    result: output
                }));
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }, $error);
    });
};

var justTruncate = truncate;
function truncate(str, length, end) {
    if (length == null || length >= str.length) {
        return str;
    }
    if (end == null) {
        end = '...';
    }
    return str.slice(0, Math.max(0, length - end.length)) + end;
}

var withDetailsTemplate = function (ref, thumbClassName, showPlayIcon) {
    var url = ref.url;
    var title = ref.title;
    var embedUrl = ref.embedUrl;
    var description = ref.description;
    var thumbnail = ref.thumbnail;
    if ( showPlayIcon === void 0 ) showPlayIcon = false;

    return ("<div class=\"ejs-preview ejs-embed\"><div class=\"ejs-thumb " + thumbClassName + "\" data-url=\"" + embedUrl + "\" style=\"background-image:url(" + thumbnail + ")\">" + (showPlayIcon ? '<span>&#9658;</span>' : '') + "</div><div class=\"ejs-info\"><h4 class=\"ejs-title\"><a href=\"" + url + "\">" + title + "</a></h4><div class=\"ejs-desc\">" + (justTruncate(description, 150)) + "</div></div></div>");
};

var withoutDetailsTemplate = function (embedUrl, height, name) {
    return ("<iframe class=\"ejs-embed ejs-" + name + "\" src=\"" + embedUrl + "\" frameBorder=\"0\" height=\"" + height + "\"></iframe>");
};

var base = function (opts) {
    var defaultOptions = {
        _replaceAnyways: false,
        _ignoreAnchorCheck: false,
        _ignoreInlineCheck: false,
        onLoad: function onLoad() {}
    };
    var pluginOptions = justExtend$2({}, defaultOptions, opts);
    var _onLoadInternal = pluginOptions._onLoadInternal;
    var onLoad = pluginOptions.onLoad;
    var regex = pluginOptions.regex;
    var template = pluginOptions.template;
    var id = pluginOptions.id;
    if (!regex) {
        throw new Error("regex not passed.");
    }
    if (!template) {
        throw new Error("template not passed.");
    }
    return {
        id: id,
        transform: function transform(options) {
            return new Promise(function ($return, $error) { return insert(options, pluginOptions).then(function ($await_1) {
                try {
                    return $return(justExtend$2({}, options, $await_1));
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }, $error); });
        },
        onLoad: function onLoad$1(options) {
            if (_onLoadInternal) {
                _onLoadInternal(options, pluginOptions);
            }
            if (onLoad) {
                onLoad(options, pluginOptions);
            }
        }
    };
};

var id = "highlight";
function highlight(opts) {
    var defaultOptions = {
        id: id,
        regex: /(`{3})(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm,
        prismjs: !isBrowser ? global.Prism : window.Prism,
        template: function template(args, options, ref) {
            var prismjs = ref.prismjs;

            var language = args[2] === "\n" || !args[2] ? "markup" : args[2];
            var code = args[3];
            var className = "language-" + language;
            return ("<pre class=\"" + className + "\"><code class=\"" + className + "\">" + (prismjs.highlight(code, prismjs.languages[language])) + "</code></pre>");
        }
    };
    var pluginOptions = justExtend$1({}, defaultOptions, opts, {
        _replaceAnyways: true,
        _ignoreAnchorCheck: true,
        _ignoreInlineCheck: true
    });
    if (!pluginOptions.prismjs) {
        throw new Error("You need to load prismjs as a global variable or pass it in options.");
    }
    return base(pluginOptions);
}

highlight.id = id;

var justExtend$4 = extend$8;
function extend$8() {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    if (!result || typeof result != 'object' && typeof result != 'function') {
        throw new Error('extendee must be an object');
    }
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0;i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            var value = extender[key];
            if (deep && value && (typeof value == 'object' || typeof value == 'function')) {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend$8(true, result[key] || base, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

var lib = function emojiRegex() {
    return /:([a-z0-9_\+\-]+):/g;
};

var justKebabCase = kebabCase;
var wordSeparators = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;
var capitals = /[A-Z\u00C0-\u00D6\u00D9-\u00DD]/g;
function kebabCase(str) {
    str = str.replace(capitals, function (match) {
        return ' ' + (match.toLowerCase() || match);
    });
    return str.trim().split(wordSeparators).join('-');
}

var id$1 = "emoji";
function emoji(opts) {
    var defaultOptions = {
        id: id$1,
        regex: lib(),
        template: function template(emojiName) {
            return ("<span class=\"ec ec-" + (justKebabCase(emojiName)) + "\"></span>");
        }
    };
    var pluginOptions = justExtend$4({}, defaultOptions, opts);
    return {
        transform: function transform(options) {
            return Promise.resolve(justExtend$4({}, options, {
                result: options.result.replace(pluginOptions.regex, function (match, emojiName) {
                    options._services.push({
                        id: id$1,
                        match: match
                    });
                    return pluginOptions.template(emojiName, options, pluginOptions);
                })
            }));
        }
    };
}

emoji.id = id$1;

var justExtend$5 = extend$10;
function extend$10() {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    if (!result || typeof result != 'object' && typeof result != 'function') {
        throw new Error('extendee must be an object');
    }
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0;i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            var value = extender[key];
            if (deep && value && (typeof value == 'object' || typeof value == 'function')) {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend$10(true, result[key] || base, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

var id$2 = "github";
function _process(args, ref) {
    var fetch = ref.fetch;

    return new Promise(function ($return, $error) {
        var user, repo, res;
        var assign;
        (assign = args, user = assign[1], repo = assign[2]);
        var $Try_1_Post = function () {
            try {
                return $return();
            } catch ($boundEx) {
                return $error($boundEx);
            }
        };
        var $Try_1_Catch = function (e) {
            try {
                return $return({});
            } catch ($boundEx) {
                return $error($boundEx);
            }
        };
        try {
            return fetch(("https://api.github.com/repos/" + user + "/" + repo)).then(function ($await_2) {
                try {
                    res = $await_2;
                    return $return(res.json());
                } catch ($boundEx) {
                    return $Try_1_Catch($boundEx);
                }
            }, $Try_1_Catch);
        } catch (e) {
            $Try_1_Catch(e);
        }
    });
}

function github(opts) {
    var defaultOptions = {
        id: id$2,
        regex: /[^\.]github.com\/([\w\.\-]+)\/([\w\.\-]+[^\.])/gi,
        template: function template(args, options, pluginOptions, ref) {
            var owner = ref.owner;
            var description = ref.description;
            var html_url = ref.html_url;
            var full_name = ref.full_name;

            return new Promise(function ($return, $error) { return $return(withDetailsTemplate({
                thumbnail: owner.avatar_url,
                url: html_url,
                description: description,
                title: full_name
            })); });
        }
    };
    var pluginOptions = justExtend$5({}, defaultOptions, opts, {
        _process: _process
    });
    return base(pluginOptions);
}

github.id = id$2;

var justExtend$6 = extend$12;
function extend$12() {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    if (!result || typeof result != 'object' && typeof result != 'function') {
        throw new Error('extendee must be an object');
    }
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0;i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            var value = extender[key];
            if (deep && value && (typeof value == 'object' || typeof value == 'function')) {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend$12(true, result[key] || base, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var isBrowser$2 = (typeof window === "undefined" ? "undefined" : _typeof$1(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof$1(document)) === 'object' && document.nodeType === 9;

var isDom = isNode;
function isNode(val) {
    return !val || typeof val !== 'object' ? false : typeof window === 'object' && typeof window.Node === 'object' ? val instanceof window.Node : typeof val.nodeType === 'number' && typeof val.nodeName === 'string';
}

var justPluckIt = pluck;
function pluck(collection, propertyName) {
    if (!collection || typeof collection != 'object') {
        return new Error('expected first argument to be an object or array');
    }
    var result, len, i, keys, key;
    if (Array.isArray(collection)) {
        result = [];
        len = collection.length;
        for (i = 0; i < len; i++) {
            result.push(collection[i][propertyName]);
        }
    } else {
        result = {};
        keys = Object.keys(collection);
        len = keys.length;
        for (i = 0; i < len; i++) {
            key = keys[i];
            result[key] = collection[key][propertyName];
        }
    }
    return result;
}

var justFlattenIt = flatten;
function flatten(arr) {
    var result = [];
    var len = arr.length;
    for (var i = 0;i < len; i++) {
        var elem = arr[i];
        if (Array.isArray(elem)) {
            result.push.apply(result, flatten(elem));
        } else {
            result.push(elem);
        }
    }
    return result;
}

var regexes = [{
    patterns: ["https?://soundcloud.com/.*/.[^\\s]*"],
    name: "SoundCloud"
},{
    name: "slideshare",
    patterns: ["https?://www\\.slideshare\\.net/.*/.[^\\s]*","https?://fr\\.slideshare\\.net/.*/.[^\\s]*",
        "https?://de\\.slideshare\\.net/.*/.[^\\s]*","https?://es\\.slideshare\\.net/.*/.[^\\s]*",
        "https?://pt\\.slideshare\\.net/.*/.[^\\s]*"]
},{
    name: "vimeo",
    patterns: ["https?://vimeo\\.com/.[^\\s]*","https?://vimeo\\.com/album/.*/video/.[^\\s]*",
        "https?://vimeo\\.com/channels/.*/.[^\\s]*","https?://vimeo\\.com/groups/.*/videos/.[^\\s]*",
        "https?://vimeo\\.com/ondemand/.*/.[^\\s]*"]
},{
    patterns: ["https?://photos\\.app\\.net/.*/.[^\\s]*","https?://live\\.amcharts\\.com/.[^\\s]*",
        "https?://codepen\\.io/.[^\\s]*","https?://codepen\\.io/.[^\\s]*","https?://www\\.collegehumor\\.com/video/.[^\\s]*",
        "https?://www\\.dailymotion\\.com/video/.[^\\s]*","https?://.*\\.deviantart\\.com/art/.[^\\s]*",
        "https?://.*\\.deviantart\\.com/.*#/d.[^\\s]*","https?://dotsub\\.com/view/.[^\\s]*",
        "https?://.*\\.flickr\\.com/photos/.[^\\s]*","https?://flic\\.kr/p/.[^\\s]*",
        "https?://.*\\.wikimedia\\.org/.*_geograph\\.org\\.uk_.[^\\s]*","https?://gfycat\\.com/.[^\\s]*",
        "https?://www\\.gfycat\\.com/.[^\\s]*","https?://gfycat\\.com/.[^\\s]*","https?://www\\.gfycat\\.com/.[^\\s]*",
        "https?://giphy\\.com/gifs/.[^\\s]*","https?://media\\.giphy\\.com/media/.*/giphy\\.gif",
        "https?://www\\.hulu\\.com/watch/.[^\\s]*","https?://www\\.kickstarter\\.com/projects/.[^\\s]*",
        "https?://www\\.mixcloud\\.com/.*/.*/","https?://reddit\\.com/r/.*/comments/.*/.[^\\s]*",
        "https?://.*\\.screen9\\.tv/.[^\\s]*","https?://www\\.scribd\\.com/doc/.[^\\s]*",
        "https?://.*\\.smugmug\\.com/.[^\\s]*","https?://soundcloud\\.com/.[^\\s]*",
        "https?://play\\.soundsgood\\.co/playlist/.[^\\s]*","https?://speakerdeck\\.com/.*/.[^\\s]*",
        "https?://speakerdeck\\.com/.*/.[^\\s]*","https?://ted\\.com/talks/.[^\\s]*",
        "https?://www\\.nytimes\\.com/svc/oembed","https?://nytimes\\.com/.[^\\s]*",
        "https?://.*\\.nytimes\\.com/.[^\\s]*","https?://clips\\.twitch\\.tv/.[^\\s]*",
        "https?://clips\\.twitch\\.tv/.[^\\s]*","https?://www\\.twitch\\.tv/.[^\\s]*",
        "https?://www\\.twitch\\.tv/.[^\\s]*","https?://twitch\\.tv/.[^\\s]*","https?://twitch\\.tv/.[^\\s]*",
        "https?://.*\\.ustream\\.tv/.[^\\s]*","https?://.*\\.ustream\\.com/.[^\\s]*",
        "https?://veervr\\.tv/videos/.[^\\s]*","https?://www\\.vevo\\.com/.[^\\s]*",
        "https?://www\\.vevo\\.com/.[^\\s]*","https?://player\\.vimeo\\.com/video/.[^\\s]*",
        "https?://vine\\.co/v/.[^\\s]*","https?://vine\\.co/v/.[^\\s]*"],
    name: "oEmbed"
},{
    name: "Imgur",
    patterns: ["https?://imgur\\.com/(?:[^\\/]+/)?[0-9a-zA-Z]+$"]
},{
    patterns: ["https?://www\\.(dropbox\\.com/s/.+\\.(?:jpg|png|gif))","https?://db\\.tt/[a-zA-Z0-9][^\\s]+"],
    name: "Dropbox"
},{
    patterns: ["https?:\\/\\/(?:[^\\.]+\\.)?youtube\\.com\\/watch\\/?\\?(?:.+&)?v=([^&][^\\s]+)",
        "https?://(?:[^\\.]+\\.)?(?:youtu\\.be|youtube\\.com/embed)/([a-zA-Z0-9_-][^\\s]+)"],
    name: "YouTube"
},{
    patterns: ["https?://(?:www|mobile\\.)?twitter\\.com/(?:#!/)?([^/]+)/status(?:es)?/(\\d+)"],
    name: "Twitter"
}];
function getRegexes(excludeServices) {
    if ( excludeServices === void 0 ) excludeServices = [];

    var includedRegexes = regexes.filter(function (r) { return excludeServices.indexOf(r.name.toLowerCase()) === -1; });
    var patterns = justFlattenIt(justPluckIt(includedRegexes, "patterns"));
    return new RegExp(patterns.join("|"), "gi");
}

function isServicePresent(serviceName, text) {
    var service = regexes.filter(function (r) { return r.name.toLowerCase() === serviceName; })[0];
    var regex = new RegExp(service.patterns.join("|"), "gi");
    return regex.test(text);
}

var id$3 = "noEmbed";
function _process$1(args, ref) {
    var fetch = ref.fetch;

    return new Promise(function ($return, $error) {
        var url, res;
        url = args[0];
        var $Try_1_Post = function () {
            try {
                return $return();
            } catch ($boundEx) {
                return $error($boundEx);
            }
        };
        var $Try_1_Catch = function (e) {
            try {
                return $return({
                    html: url
                });
            } catch ($boundEx) {
                return $error($boundEx);
            }
        };
        try {
            return fetch(("https://noembed.com/embed?url=" + url)).then(function ($await_2) {
                try {
                    res = $await_2;
                    return res.json().then($return, $Try_1_Catch);
                } catch ($boundEx) {
                    return $Try_1_Catch($boundEx);
                }
            }, $Try_1_Catch);
        } catch (e) {
            $Try_1_Catch(e);
        }
    });
}

function noEmbed(opts) {
    if ( opts === void 0 ) opts = {};

    var defaultOptions = {
        id: id$3,
        regex: null,
        exclude: [],
        twttr: isBrowser$2 ? window.twttr : null,
        onLoad: function onLoad() {},
        template: function template(args, options, pluginOptions, ref) {
            var html = ref.html;

            return new Promise(function ($return, $error) { return $return(("<div class=\"ejs-embed\">" + html + "</div>")); });
        },
        _onLoadInternal: function _onLoadInternal(ref, ref$1) {
            var input = ref.input;
            var result = ref.result;
            var twttr = ref$1.twttr;
            var onLoad = ref$1.onLoad;

            if (isServicePresent("twitter", result) && twttr && isDom(input)) {
                twttr.widgets.load(input);
                twttr.events.bind("loaded", onLoad);
            }
        }
    };
    var pluginOptions = justExtend$6({}, defaultOptions, opts, {
        _process: _process$1
    });
    if (!opts.regex) {
        pluginOptions.regex = getRegexes(pluginOptions.exclude);
    }
    return base(pluginOptions);
}

noEmbed.id = id$3;

var justExtend$7 = extend$14;
function extend$14() {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    if (!result || typeof result != 'object' && typeof result != 'function') {
        throw new Error('extendee must be an object');
    }
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0;i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            var value = extender[key];
            if (deep && value && (typeof value == 'object' || typeof value == 'function')) {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend$14(true, result[key] || base, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

var rAmp = /&/g;
var rLt = /</g;
var rGt = />/g;
var rApos = /\'/g;
var rQuot = /\"/g;
var hChars = /[&<>\"\']/;
function coerceToString(val) {
    return String(val === null || val === undefined ? '' : val);
}

var htmlEscape = function (str) {
    str = coerceToString(str);
    return hChars.test(str) ? str.replace(rAmp, '&amp;').replace(rLt, '&lt;').replace(rGt, '&gt;').replace(rApos, '&#39;').replace(rQuot, '&quot;') : str;
};

var rLink = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;
var rEmail = /\b(([a-zA-Z0-9\-\_\.])+(\+[a-zA-Z0-9]*)?@[a-zA-Z\_\-]+?(\.[a-zA-Z]{2,6})+)/gim;
var htmlLinkify = function (text, options) {
    if (!options) 
        { options = {}; }
    var retval = "", cur = 0, match;
    var escapeFn = options.escape === false ? function (str) {
        return str;
    } : htmlEscape;
    while (match = rLink.exec(text)) {
        retval += escapeFn(text.slice(cur, match.index));
        retval += anchor(match[0], options.attributes);
        cur = rLink.lastIndex;
    }
    retval += escapeFn(text.slice(cur));
    retval = emails(retval, options.attributes);
    return retval;
};
function anchor(url, attrs) {
    var text = htmlEscape(url), href = url;
    if (!/^[a-zA-Z]{1,6}:/.test(href)) {
        href = 'http://' + href;
    }
    var attrsString = combine({
        href: href
    }, attrs);
    return "<a " + attrsString + ">" + text + "</a>";
}

function combine() {
    return Array.prototype.slice.call(arguments).map(attributes).filter(Boolean).join(" ");
}

function emails(text, attrs) {
    var attrsString = attributes(attrs);
    return text.replace(rEmail, function (match, email) {
        var elAttrs = attributes({
            href: "mailto:" + email
        });
        if (attrsString) {
            elAttrs += " " + attrsString;
        }
        return "<a " + elAttrs + ">" + htmlEscape(email) + "</a>";
    });
}

function attributes(attrs) {
    if (!attrs) 
        { return ""; }
    return Object.keys(attrs).map(function (name) {
        var value = attrs[name];
        return htmlEscape(name) + "=\"" + htmlEscape(value) + "\"";
    }).join(" ");
}

var id$4 = "url";
function url(opts) {
    var defaultOptions = {
        attributes: {},
        escape: false
    };
    var ref = justExtend$7({}, defaultOptions, opts);
    var attributes = ref.attributes;
    var escape = ref.escape;
    return {
        id: id$4,
        transform: function transform(options) {
            return new Promise(function ($return, $error) { return $return(justExtend$7({}, options, {
                result: htmlLinkify(options.result, {
                    attributes: attributes,
                    escape: escape
                })
            })); });
        }
    };
}

url.id = id$4;

var justExtend$8 = extend$16;
function extend$16() {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    if (!result || typeof result != 'object' && typeof result != 'function') {
        throw new Error('extendee must be an object');
    }
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0;i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            var value = extender[key];
            if (deep && value && (typeof value == 'object' || typeof value == 'function')) {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend$16(true, result[key] || base, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

var isDom$2 = isNode$1;
function isNode$1(val) {
    return !val || typeof val !== 'object' ? false : typeof window === 'object' && typeof window.Node === 'object' ? val instanceof window.Node : typeof val.nodeType === 'number' && typeof val.nodeName === 'string';
}

var youtubeRegex = function youtubeRegex() {
    var regex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/g;
    return regex;
};

var id$5 = "youtube";
var baseUrl = "https://www.youtube.com/";
function formatData(ref) {
    var snippet = ref.snippet;
    var id = ref.id;

    return {
        title: snippet.title,
        thumbnail: snippet.thumbnails.medium.url,
        description: snippet.description,
        url: (baseUrl + "watch?v=" + id),
        embedUrl: (baseUrl + "embed/" + id)
    };
}

function fetchDetails(id, fetch, gAuthKey) {
    return new Promise(function ($return, $error) {
        var res, data;
        var $Try_1_Post = function () {
            try {
                return $return();
            } catch ($boundEx) {
                return $error($boundEx);
            }
        };
        var $Try_1_Catch = function (e) {
            try {
                console.log(e);
                return $return({});
            } catch ($boundEx) {
                return $error($boundEx);
            }
        };
        try {
            return fetch(("https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + gAuthKey + "&part=snippet,statistics")).then(function ($await_2) {
                try {
                    res = $await_2;
                    return res.json().then(function ($await_3) {
                        try {
                            data = $await_3;
                            return $return(data.items[0]);
                        } catch ($boundEx) {
                            return $Try_1_Catch($boundEx);
                        }
                    }, $Try_1_Catch);
                } catch ($boundEx) {
                    return $Try_1_Catch($boundEx);
                }
            }, $Try_1_Catch);
        } catch (e) {
            $Try_1_Catch(e);
        }
    });
}

function onLoad(ref, ref$1) {
    var input = ref.input;
    var clickClass = ref$1.clickClass;
    var onVideoShow = ref$1.onVideoShow;
    var height = ref$1.height;

    if (!isDom$2(input)) {
        throw new Error("input should be a DOM Element.");
    }
    var classes = document.getElementsByClassName(clickClass);
    for (var i = 0;i < classes.length; i++) {
        classes[i].onclick = function () {
            var url = this.getAttribute("data-url");
            onVideoShow(url);
            url += "?autoplay=1";
            this.parentNode.innerHTML = withoutDetailsTemplate(url, height, id$5);
        };
    }
}

function _process$2(args, ref, ref$1) {
    var fetch = ref.fetch;
    var gAuthKey = ref$1.gAuthKey;
    var details = ref$1.details;

    return details ? fetchDetails(args[1], fetch, gAuthKey) : Promise.resolve();
}

function youtube(opts) {
    var defaultOptions = {
        id: id$5,
        regex: youtubeRegex(),
        gAuthKey: "",
        details: true,
        height: 300,
        clickClass: "ejs-video-thumb",
        onVideoShow: function onVideoShow() {},
        _onLoadInternal: function _onLoadInternal(options, pluginOptions) {
            onLoad(options, pluginOptions);
        },
        onLoad: function onLoad() {},
        template: function template(args, options, ref, data) {
            var details = ref.details;
            var height = ref.height;
            var clickClass = ref.clickClass;

            return new Promise(function ($return, $error) {
                var embedUrl = baseUrl + "embed/" + (args[1]);
                return $return(details ? withDetailsTemplate(formatData(data), clickClass, true) : withoutDetailsTemplate(embedUrl, height, id$5));
            });
        }
    };
    if (!opts.gAuthKey) {
        throw new Error("You need to pass google auth key.");
    }
    var pluginOptions = justExtend$8({}, defaultOptions, opts, {
        _process: _process$2
    });
    return base(pluginOptions);
}

youtube.id = id$5;

var justExtend$9 = extend$18;
function extend$18() {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    if (!result || typeof result != 'object' && typeof result != 'function') {
        throw new Error('extendee must be an object');
    }
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0;i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            var value = extender[key];
            if (deep && value && (typeof value == 'object' || typeof value == 'function')) {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend$18(true, result[key] || base, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

var id$6 = "facebook";
function facebook(opts) {
    var defaultOptions = {
        id: id$6,
        regex: /(https?:\/\/)?www\.facebook\.com\/(?:(videos|posts)\.php\?v=\d+|.*?\/(videos|posts)\/\d+\/?)/gi,
        height: 225,
        template: function template(args, options, ref) {
            var height = ref.height;

            var url = args[0];
            var type = url.indexOf("/videos/") < 0 ? "post" : "video";
            return withoutDetailsTemplate(("https://www.facebook.com/plugins/" + type + ".php?href=" + url), height, id$6);
        }
    };
    var pluginOptions = justExtend$9({}, defaultOptions, opts);
    return base(pluginOptions);
}

facebook.id = id$6;

var justExtend$10 = extend$20;
function extend$20() {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    if (!result || typeof result != 'object' && typeof result != 'function') {
        throw new Error('extendee must be an object');
    }
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0;i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            var value = extender[key];
            if (deep && value && (typeof value == 'object' || typeof value == 'function')) {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend$20(true, result[key] || base, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

var id$7 = "media";
var image = ["gif","jpg","jpeg","tiff","png","svg","webp"];
var video = ["ogv","webm","mp4"];
var audio = ["wav","mp3","ogg"];
function basicImage(opts) {
    var defaultOptions = {
        id: id$7,
        regex: new RegExp(("(?:https?)://\\S*\\.(?:" + (image.concat(video, audio).join("|")) + ")"), "gi"),
        template: function template(args) {
            var url = args[0];
            var ext = url.split(".").slice(-1)[0];
            if (image.indexOf(ext) >= 0) {
                return ("<img class=\"ejs-embed\" src=\"" + url + "\"/>");
            } else if (video.indexOf(ext) >= 0) {
                return ("<video src=\"" + url + "\" controls class=\"ejs-video\"></video>");
            } else if (audio.indexOf(ext) >= 0) {
                return ("<audio src=\"" + url + "\" controls class=\"ejs-audio\"></audio>");
            }
        }
    };
    var pluginOptions = justExtend$10({}, defaultOptions, opts);
    return base(pluginOptions);
}

basicImage.id = id$7;

var justExtend$11 = extend$22;
function extend$22() {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    if (!result || typeof result != 'object' && typeof result != 'function') {
        throw new Error('extendee must be an object');
    }
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0;i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            var value = extender[key];
            if (deep && value && (typeof value == 'object' || typeof value == 'function')) {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend$22(true, result[key] || base, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

var id$8 = "instagram";
function instagram(opts) {
    var defaultOptions = {
        id: id$8,
        height: 440,
        regex: /((https?:\/\/)(www\.)?instagram.com\/p\/[a-zA-Z0-9_\-\=]+)(\/\?[a-zA-Z0-9_\-\=]+)?/gi,
        template: function template(args, options, ref) {
            var width = ref.width;
            var height = ref.height;

            return ("<iframe class=\"ejs-embed ejs-instagram\" src=\"" + (args[1]) + "/embed\" height=\"" + height + "\"></iframe>");
        }
    };
    var pluginOptions = justExtend$11({}, defaultOptions, opts);
    return base(pluginOptions);
}

instagram.id = id$8;

var index = function (options) {
    var defaultOptions = {
        exclude: []
    };
    var presetOptions = justExtend({}, defaultOptions, options);
    var pluginNames = [url,emoji,github,noEmbed,youtube,facebook,highlight,basicImage,
        instagram];
    var plugins = pluginNames.map(function (plugin) {
        var id = plugin.id;
        var pluginOptions = presetOptions[id];
        if (presetOptions.exclude.indexOf(plugin.id) === -1) {
            if (id === "youtube" || id === "map") {
                return plugin(justExtend({}, {
                    gAuthKey: options.gAuthKey
                }, pluginOptions));
            } else if (id === "noEmbed") {
                return plugin(justExtend({}, pluginOptions, {
                    exclude: ["youtube"]
                }));
            }
            return plugin(pluginOptions);
        }
        return null;
    });
    return plugins.filter(function (plugin) { return !(!plugin); });
};

return index;

})));
//# sourceMappingURL=embed-preset-basic.js.map