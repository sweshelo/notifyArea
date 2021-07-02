var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Important(props) {
    var e = [];
    props.NotifyObj.forEach(function (data) {
        e.push(React.createElement(
            "li",
            null,
            React.createElement(
                "a",
                { href: data.url },
                data.title
            )
        ));
    });
    return React.createElement(
        "p",
        null,
        e
    );
}

function Normal(props) {
    var e = [];
    console.log(props.NotifyObj);
    props.NotifyObj.forEach(function (data) {
        e.push(React.createElement(
            "li",
            null,
            data.date
        ));
        data.contents.forEach(function (c) {
            e.push(React.createElement(
                "p",
                { className: "NotifyDescription" },
                React.createElement(
                    "a",
                    { href: c.url },
                    c.title
                )
            ));
        });
    });
    return React.createElement(
        "p",
        null,
        e
    );
}

var Notify = function (_React$Component) {
    _inherits(Notify, _React$Component);

    function Notify(props) {
        _classCallCheck(this, Notify);

        var _this = _possibleConstructorReturn(this, (Notify.__proto__ || Object.getPrototypeOf(Notify)).call(this, props));

        _this.state = {
            importantNotifyContents: [],
            normalNotifyContents: []
        };
        return _this;
    }

    _createClass(Notify, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            fetch(this.props.notifyStreamUrl).then(function (res) {
                return res.json();
            }).then(function (data) {
                _this2.setState({
                    importantNotifyContents: data["important"],
                    normalNotifyContents: data["normal"]
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "notify" },
                React.createElement(Important, { NotifyObj: this.state.importantNotifyContents }),
                React.createElement(Normal, { NotifyObj: this.state.normalNotifyContents })
            );
        }
    }]);

    return Notify;
}(React.Component);

var root = document.getElementById('app');
var element = React.createElement(Notify, { notifyStreamUrl: "https://home.sweshelo.jp/notify.json" });
ReactDOM.render(element, root);