'usr strict';
var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function (child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key)) {
                child[key] = parent[key];
            }
        };
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    };

Dashing.MongoStat = (function (_super) {

    __extends(MongoStat, _super);

    function MongoStat() {
        _ref = MongoStat.__super__.constructor.apply(this, arguments);
        this.testing = 'this is just a test';
        return _ref;
    }

    MongoStat.prototype.ready = function () {
        return $(this.node).append($('<div>hello world!!</div>'));
    };

    MongoStat.prototype.onData = function(data) {
        console.log('i got data!', data);
    };


    return MongoStat;

})(Dashing.Widget);
