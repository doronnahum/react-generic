//import
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

//

var SpecialPointer = (function (_React$Component) {
    _inherits(SpecialPointer, _React$Component);

    function SpecialPointer() {
        _classCallCheck(this, SpecialPointer);

        _get(Object.getPrototypeOf(SpecialPointer.prototype), 'constructor', this).call(this);
        this.state = {
            editMode: false,
            value: null
        };
        this.config = {};
    }

    _createClass(SpecialPointer, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var dataClassName = this.props.config.targetClass;
            var fieldName = this.props.data.name;
            var key = this.getTitleForPointer(dataClassName, fieldName) || 'objectId';
            //console.log('componentWillMount', this.props)
            this.setFieldConfig(this.props.config.subType);
            var valueObj = {};
            if (this.props.data.value) {
                valueObj.value = this.props.data.value;
                valueObj.label = this.props.data.value ? this.props.data.value[key] : '';
                if (this.config.valueType == 'Pointer') {
                    if (this.config.multi) {
                        this.setState({ value: [valueObj] });
                        this.defaultValue = [valueObj];
                    } else {
                        this.setState({ value: valueObj });
                        this.defaultValue = valueObj;
                    }
                }
            }
        }
    }, {
        key: 'setFieldConfig',
        value: function setFieldConfig() {
            var subType = arguments.length <= 0 || arguments[0] === undefined ? 'ArrayOfPointers' : arguments[0];

            if (subType == 'ArrayOfPointers') {
                this.config.multi = true;
                this.config.valueType = 'Pointer';
            } else if (subType == 'ArrayOfTitleFromPointers') {
                this.config.multi = true;
                this.config.valueType = 'title';
            } else if (subType == 'TitleFromPointers') {
                this.config.multi = false;
                this.config.valueType = 'title';
            } else if (subType == 'LikePointer') {
                this.config.multi = false;
                this.config.valueType = 'Pointer';
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
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.config.valueType == 'title') {
                this.setDefaultValueInTitleSubType();
            }
        }
    }, {
        key: 'setDefaultValueInTitleSubType',
        value: function setDefaultValueInTitleSubType() {
            var _this2 = this;

            if (this.props.data.value && this.state.options && !this.state.value) {
                (function () {
                    var options = _this2.state.options;
                    var value = _this2.props.data.value;
                    var key = _this2.getTitleForPointer(_this2.props.config.targetClass, _this2.props.data.name) || 'objectId';
                    if (_this2.config.valueType == 'title') {
                        if (_this2.config.multi) {
                            (function () {
                                var selectedOptions = [];
                                options.forEach(function (obj) {
                                    if (value.indexOf(obj['label']) != -1) {
                                        selectedOptions.push(obj);
                                    }
                                });
                                _this2.setState({ value: selectedOptions });
                            })();
                        } else {
                            var selectedOptions = {};
                            options.forEach(function (obj) {
                                if (value == obj['label']) {
                                    selectedOptions = obj;
                                }
                            });
                            _this2.setState({ value: selectedOptions });
                        }
                    }
                })();
            }
        }
    }, {
        key: 'getTitlesFromPointer',
        value: function getTitlesFromPointer() {
            var _this3 = this;

            if (!this.state.value) {
                return null;
            }
            //return array of title from pointer
            if (this.config.multi) {
                var _ret3 = (function () {
                    var arr = [];
                    _this3.state.value.forEach(function (pointer) {
                        arr.push(pointer.label);
                    });
                    return {
                        v: arr
                    };
                })();

                if (typeof _ret3 === 'object') return _ret3.v;
            } else {
                var string = this.state.value.label;
                return string;
            }
        }
    }, {
        key: 'getPointers',
        value: function getPointers() {
            var _this4 = this;

            if (!this.state.value) {
                return null;
            }
            var dataClassName = this.props.config.targetClass;
            var fieldName = this.props.data.name;
            //return array of  pointer
            if (this.config.multi) {
                var _ret4 = (function () {
                    var arr = [];
                    _this4.state.value.forEach(function (pointer) {
                        var obj = {};
                        obj['__type'] = "Pointer";
                        obj['className'] = dataClassName;
                        obj['objectId'] = pointer.value.objectId;
                        arr.push(obj);
                    });
                    return {
                        v: arr
                    };
                })();

                if (typeof _ret4 === 'object') return _ret4.v;
            } else {
                var obj = {};
                obj['__type'] = "Pointer";
                obj['className'] = dataClassName;
                obj['objectId'] = this.state.value.value.objectId;
                return obj;
            }
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            var data = this.props.data;
            var objectToSend = {
                value: this.config.valueType == 'title' ? this.getTitlesFromPointer() : this.getPointers(),
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
            var dataClassName = this.props.config.targetClass;
            var fieldName = this.props.data.name;
            ////console.log('getOptions',this)
            this.props.getPointerOptions(input, callback, dataClassName, fieldName);
        }
    }, {
        key: 'printStringFromArray',
        value: function printStringFromArray() {
            var value = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            var string = '';
            if (!value) {
                return '';
            }
            value.forEach(function (val, i) {
                var comma = i < value.length - 1 ? ',' : '';
                var type = typeof val;
                var valToString = type == 'string' || type == 'number' || type == 'boolean' ? val : '{' + _qs2['default'].stringify(val) + '}';
                string = string + ('[ ' + valToString + ' ] ' + comma + ' ');
            });
            return string;
        }
    }, {
        key: 'printFieldViewBySubType',
        value: function printFieldViewBySubType(value, config, keyToShow) {
            var _this5 = this;

            if (!value) {
                return '-';
            } else if (config.subType == 'LikePointer') {
                return _react2['default'].createElement(
                    _reactBootstrap.Button,
                    { bsStyle: 'default', onClick: this.handlePointerClick.bind(this) },
                    value[keyToShow] || value['objectId']
                );
            } else if (config.subType == 'TitleFromPointers') {
                return value;
            } else if (config.subType == 'ArrayOfPointers') {
                return value.map(function (obj, i) {
                    return _react2['default'].createElement(
                        'span',
                        null,
                        _react2['default'].createElement(
                            _reactBootstrap.Button,
                            { key: i, bsStyle: 'default', onClick: _this5.handlePointerClick.bind(_this5) },
                            obj[keyToShow] || obj['objectId']
                        ),
                        ' '
                    );
                });
            } else if (config.subType == 'ArrayOfTitleFromPointers') {
                return this.printStringFromArray(value);
            }
        }
    }, {
        key: 'undoValue',
        value: function undoValue() {
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
        key: 'render',
        value: function render() {
            var value = this.props.data.value || '';
            var editable = this.props.editable || false;
            var editMode = this.state.editMode || false;
            var config = this.props.config;
            var getPointerOptions = this.props.getPointerOptions || null;
            var pointerKeyForTitle = this.getTitleForPointer(this.props.config.targetClass, this.props.data.name) || 'objectId';
            var type = this.props.type;
            var defaultConfiguration = this.props.defaultConfiguration;
            var editInLine = this.checkEditStyleConfig(defaultConfiguration, config, type);
            //let pointerTitle = value ? value[pointerKeyForTitle] : '';

            return _react2['default'].createElement(
                'div',
                null,
                (!editMode || !editInLine) && _react2['default'].createElement(
                    'span',
                    null,
                    this.printFieldViewBySubType.call(this, value, config, pointerKeyForTitle)
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
                                    _react2['default'].createElement(_reactSelect2['default'], {
                                        name: 'form-field-name',
                                        value: this.state.value,
                                        options: this.state.options,
                                        autosize: true,
                                        onChange: this.handleChange.bind(this),
                                        multi: this.config.multi,
                                        searchable: true,
                                        openOnFocus: true,
                                        isLoading: !this.state.options
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

    return SpecialPointer;
})(_react2['default'].Component);

exports['default'] = SpecialPointer;
module.exports = exports['default'];
/*Not Edit Mode*/ /*editable show button*/ /*Edit Mode*/