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

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

//

var PointerField = (function (_React$Component) {
    _inherits(PointerField, _React$Component);

    function PointerField() {
        _classCallCheck(this, PointerField);

        _get(Object.getPrototypeOf(PointerField.prototype), 'constructor', this).call(this);
        this.state = {
            editMode: false,
            value: ''
        };
    }

    _createClass(PointerField, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var dataClassName = this.props.field.targetClass;
            var fieldName = this.props.data.name;
            if (this.props.data.value) {
                var key = this.getTitleForPointer(dataClassName, fieldName) || 'objectId';
                //console.log('componentWillMount', this.props)
                var valueObj = {};
                valueObj.value = this.props.data.value;
                valueObj.label = this.props.data.value ? this.props.data.value[key] : '';
                this.defaultValue = valueObj;
                this.setState({ value: valueObj });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;

            var callback = function callback(nullValue, obj) {
                //console.log('this.getOptions=>callback', obj)
                _this.setState({ options: obj.options });
            };
            if (!this.state.options) {
                //console.log('this.getOptions')
                this.getOptions('input', callback);
            }
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            var data = this.props.data;
            var objectToSend = {
                value: this.state.value.value,
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
        key: 'handleChange',
        value: function handleChange(e) {
            //console.log('handleChange',e)
            this.setState({ value: e });
        }
    }, {
        key: 'getTitleForPointer',
        value: function getTitleForPointer(dataClassName, fieldName) {
            var globalConfig = this.props.defaultConfiguration;
            var fieldConfig = this.props.config;
            if (fieldConfig && fieldConfig.pointerTitle) {
                return fieldConfig.pointerTitle;
            } else if (globalConfig && globalConfig.setPointerTitleByPointerName && globalConfig.setPointerTitleByPointerName[dataClassName]) {
                return globalConfig.setPointerTitleByPointerName[dataClassName];
            }
            return 'objectId';
        }
    }, {
        key: 'getPointerTitle',
        value: function getPointerTitle(value, config) {
            //console.log('getPointerTitle',value)
            if (!value) {
                return '-';
            }
            if (config && config.pointerTitle) {
                var key = config.pointerTitle;
                var title = value[key] || value.objectId;
                return title;
            }
            return value.objectId;
        }
    }, {
        key: 'handlePointerClick',
        value: function handlePointerClick() {
            if (this.props.handlePointerClick) {
                this.props.handlePointerClick(this.props.data.value);
            }
        }
    }, {
        key: 'getOptions',
        value: function getOptions(input, callback) {
            var dataClassName = this.props.field.targetClass;
            var fieldName = this.props.data.name;
            ////console.log('getOptions',this)
            this.props.getPointerOptions(input, callback, dataClassName, fieldName);
        }
    }, {
        key: 'undoValue',
        value: function undoValue(value) {
            this.setState({ value: this.defaultValue });
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
        key: 'getTitleTextFromPointers',
        value: function getTitleTextFromPointers(value, pointerKeyForTitle) {
            var dataClassName = this.props.field.targetClass;
            var fieldName = this.props.data.name;
            var pointers = this.state.options;
            //console.log('getTitleTextFromPointers',pointers)
            if (!pointers && !value) {
                return '-';
            }
            if (!pointers && value) {
                return value.objectId;
            }
            var label = value.objectId;
            pointers.forEach(function (obj) {
                if (obj.value.objectId == value.objectId) {
                    label = obj.label;
                }
            });
            return label;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var value = this.props.data.value || '';
            var editable = this.props.editable || false;
            var editMode = this.state.editMode || false;
            var config = this.props.config;
            var getPointerOptions = this.props.getPointerOptions || null;
            var pointerKeyForTitle = this.getTitleForPointer(this.props.field.targetClass, this.props.data.name) || 'objectId';
            var pointerTitle = this.getTitleTextFromPointers(value, pointerKeyForTitle); //;value ? value[pointerKeyForTitle] : '';
            var type = this.props.type;
            var defaultConfiguration = this.props.defaultConfiguration;
            var editInLine = this.checkEditStyleConfig(defaultConfiguration, config, type);
            return _react2['default'].createElement(
                'div',
                null,
                (!editMode || !editInLine) && _react2['default'].createElement(
                    'span',
                    null,
                    pointerTitle && _react2['default'].createElement(
                        _reactBootstrap.Button,
                        { bsStyle: 'default', onClick: this.handlePointerClick.bind(this) },
                        pointerTitle
                    ),
                    !pointerTitle && '-'
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
                            _react2['default'].createElement(
                                'form',
                                null,
                                _react2['default'].createElement(
                                    _reactBootstrap.FormGroup,
                                    {
                                        controlId: this.props.data.objectId + '>' + this.props.data.name },
                                    _react2['default'].createElement(_reactSelect2['default'].Async, {
                                        name: 'form-field-name',
                                        value: this.state.value,
                                        loadOptions: function (input, callback) {
                                            _this2.getOptions.call(_this2, input, callback);
                                        },
                                        autosize: false,
                                        onChange: this.handleChange.bind(this)
                                    }),
                                    _react2['default'].createElement(_reactBootstrap.FormControl.Feedback, null)
                                )
                            ),
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
                                        { onClick: this.undoValue.bind(this) },
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

    return PointerField;
})(_react2['default'].Component);

exports['default'] = PointerField;
module.exports = exports['default'];
/*Not Edit Mode*/ /*editable show button*/ /*Edit Mode*/