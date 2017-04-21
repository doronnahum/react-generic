//import
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _dateformat = require('dateformat');

var _dateformat2 = _interopRequireDefault(_dateformat);

var _reactDatepicker = require('react-datepicker');

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

//

var DateField = (function (_React$Component) {
    _inherits(DateField, _React$Component);

    function DateField() {
        _classCallCheck(this, DateField);

        _get(Object.getPrototypeOf(DateField.prototype), 'constructor', this).call(this);
        this.state = {
            editMode: false,
            currentDate: (0, _moment2['default'])()
        };
    }

    _createClass(DateField, [{
        key: 'handleChange',
        value: function handleChange(value) {
            if (!value) {
                this.setState({ currentDate: '' });
            } else {
                this.setState({ currentDate: (0, _moment2['default'])(value) });
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.data.value) {
                this.setState({ currentDate: (0, _moment2['default'])(this.getDateValueFromStringAndParseObj(this.props.data.value)) });
            }
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            var data = this.props.data;
            var objectToSend = {
                value: this.state.currentDate,
                oldValue: data.value,
                objectId: data.objectId,
                name: data.name,
                type: data.type,
                row: data.row
            };
            this.props.handleSubmit(objectToSend);
            this.setState({ editMode: false });
        }
    }, {
        key: 'getDateValueFromStringAndParseObj',
        value: function getDateValueFromStringAndParseObj(value) {
            if (typeof value == 'string') {
                return value;
            } else if (value && value.iso) {
                return value.iso;
            }
            return null;
        }
    }, {
        key: 'undoValue',
        value: function undoValue(value) {
            this.handleChange(value);
        }
    }, {
        key: 'switchEditMode',
        value: function switchEditMode(e) {
            var x = e.target;
            this.left = e.nativeEvent.clientX - e.nativeEvent.screenY;
            this.top = e.nativeEvent.clientY;
            //console.log('target',e.nativeEvent,e)
            if (this.state.editMode) {
                this.setState({ editMode: false });
                return;
            }
            this.setState({ editMode: true });
        }
    }, {
        key: 'checkEditStyleConfig',
        value: function checkEditStyleConfig(defaultConfiguration, config, type) {
            if (config && config['disableEditInline']) {
                return false;
            } else if (defaultConfiguration && defaultConfiguration['disableEditInlineByType'] && defaultConfiguration['disableEditInlineByType'][type]) {
                return false;
            } else if (defaultConfiguration && defaultConfiguration['disableEditInline']) {
                return false;
            }
            return true;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            var value = this.getDateValueFromStringAndParseObj(this.props.data.value) || '';
            var format = this.props.dateformat || 'HH:MM m/d/yy';
            var editable = this.props.editable || false;
            var currentDate = this.state.currentDate;
            var editMode = this.state.editMode || false;
            var config = this.props.config;
            var type = this.props.type;
            var defaultConfiguration = this.props.defaultConfiguration;
            var editInLine = this.checkEditStyleConfig(defaultConfiguration, config, type);

            //console.log('date1', this.props)
            return _react2['default'].createElement(
                'div',
                null,
                (!editMode || !editInLine) && _react2['default'].createElement(
                    'span',
                    null,
                    (0, _dateformat2['default'])(value, format)
                ),
                editable && !editMode && _react2['default'].createElement('span', { className: ' glyphicon glyphicon-edit  pointer floatRight editPencil', onClick: this.switchEditMode.bind(this) }),
                editMode && _react2['default'].createElement(
                    _reactDraggable2['default'],
                    { disabled: editInLine },
                    _react2['default'].createElement(
                        'div',
                        { className: "Array " + (editInLine ? 'inLineEdit' : 'popoverEdit'), style: { left: this.left, top: this.top } },
                        _react2['default'].createElement(
                            'div',
                            { className: 'wrapper' },
                            _react2['default'].createElement(_reactDatepicker2['default'], { onChange: function (value) {
                                    _this.handleChange.call(_this, value);
                                }, selected: this.state.currentDate, isClearable: true }),
                            ' ',
                            _react2['default'].createElement(
                                _reactBootstrap.ButtonToolbar,
                                null,
                                _react2['default'].createElement(
                                    _reactBootstrap.ButtonGroup,
                                    null,
                                    _react2['default'].createElement(
                                        _reactBootstrap.Button,
                                        { onClick: this.handleSubmit.bind(this) },
                                        _react2['default'].createElement('i', { className: 'fa  fa-save fa-fw' })
                                    ),
                                    _react2['default'].createElement(
                                        _reactBootstrap.Button,
                                        { onClick: function (value) {
                                                _this.undoValue.call(_this, value);
                                            } },
                                        _react2['default'].createElement('i', { className: 'fa fa-undo fa-fw' })
                                    ),
                                    _react2['default'].createElement(
                                        _reactBootstrap.Button,
                                        { onClick: this.switchEditMode.bind(this) },
                                        _react2['default'].createElement('i', { className: 'fa fa-window-close-o' })
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return DateField;
})(_react2['default'].Component);

exports['default'] = DateField;
module.exports = exports['default'];
/*Not Edit Mode*/ /*editable show button*/ /*Edit Mode*/