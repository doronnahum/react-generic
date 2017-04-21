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

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

//

var NumberField = (function (_React$Component) {
    _inherits(NumberField, _React$Component);

    function NumberField() {
        _classCallCheck(this, NumberField);

        _get(Object.getPrototypeOf(NumberField.prototype), 'constructor', this).call(this);
        this.state = {
            editMode: false,
            value: ''
        };
    }

    _createClass(NumberField, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ value: this.props.data.value });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            var data = this.props.data;
            var objectToSend = {
                value: parseFloat(this.state.value),
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
            this.setState({ value: e.target.value });
        }
    }, {
        key: 'getValidationState',
        value: function getValidationState(config) {
            var value = this.state.value;
            var validConfig = config ? config.validation : '';
            if (!validConfig || !validConfig.min && !validConfig.max) {
                return 'success';
            } else {
                var min = validConfig.min;
                var max = validConfig.max;
                if (min && max) {
                    if (value > min && value < max) {
                        return 'success';
                    } else if (value < min || value > max) {
                        return 'warning';
                    } else if (value == 0) {
                        return 'error';
                    }
                } else if (min && !max) {
                    if (value > min) {
                        return 'success';
                    } else if (value < min) {
                        return 'warning';
                    } else if (value == 0) {
                        return 'error';
                    }
                } else if (!min && max) {
                    if (value < max) {
                        return 'success';
                    } else if (value > max) {
                        return 'warning';
                    } else if (value == 0) {
                        return 'error';
                    }
                }
            }
            return 'success';
        }
    }, {
        key: 'checkMinMax',
        value: function checkMinMax(config, type) {
            var value = this.state.value;
            var validConfig = config ? config.validation : '';
            if (!validConfig || !validConfig.min && !validConfig.max) {
                return true;
            } else {
                var min = validConfig.min;
                var max = validConfig.max;
                if (type == 'min' && min) {
                    if (value > min) {
                        return true;
                    }
                    return false;
                }
                if (type == 'max' && max) {
                    if (value < max) {
                        return true;
                    }
                    return false;
                }
                return true;
            }
        }
    }, {
        key: 'getLabel',
        value: function getLabel(config) {
            if (config && config.label) {
                return _react2['default'].createElement(
                    _reactBootstrap.ControlLabel,
                    null,
                    config.label
                );
            }
            return null;
        }
    }, {
        key: 'getHelpBlock',
        value: function getHelpBlock(config, type) {
            var validConfig = config ? config.validation : '';
            if (!validConfig) {
                return null;
            } else {
                var elements = [];
                var minMsg = validConfig.min ? validConfig.minMsg ? validConfig.minMsg : 'The minimum character is ' + validConfig.min + ' ' : '';
                var maxMsg = validConfig.max ? validConfig.maxMsg ? validConfig.maxMsg : 'The maximum character is ' + validConfig.max + ' ' : '';
                if (type == 'min' && minMsg && this.getValidationState(config) != 'success' && !this.checkMinMax(config, 'min')) {
                    elements.push(_react2['default'].createElement(
                        _reactBootstrap.HelpBlock,
                        { key: 1 },
                        minMsg
                    ));
                }
                if (type == 'max' && maxMsg && this.getValidationState(config) != 'success' && !this.checkMinMax(config, 'max')) {
                    elements.push(_react2['default'].createElement(
                        _reactBootstrap.HelpBlock,
                        { key: 2 },
                        maxMsg
                    ));
                }
                return elements;
            }
        }
    }, {
        key: 'undoValue',
        value: function undoValue() {
            this.setState({ value: this.props.data.value });
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
            var type = this.props.type;
            var defaultConfiguration = this.props.defaultConfiguration;
            var editInLine = this.checkEditStyleConfig(defaultConfiguration, config, type);
            return _react2['default'].createElement(
                'div',
                null,
                (!editMode || !editInLine) && _react2['default'].createElement(
                    'span',
                    null,
                    value
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
                                        controlId: this.props.data.objectId + '>' + this.props.data.name,
                                        validationState: this.getValidationState(config)
                                    },
                                    this.getLabel.call(this, config),
                                    _react2['default'].createElement(_reactBootstrap.FormControl, {
                                        type: 'number',
                                        value: this.state.value,
                                        placeholder: this.props.placeholder,
                                        onChange: this.handleChange.bind(this)
                                    }),
                                    _react2['default'].createElement(_reactBootstrap.FormControl.Feedback, null),
                                    !this.checkMinMax(config, 'min') && this.getHelpBlock.call(this, config, 'min'),
                                    !this.checkMinMax(config, 'max') && this.getHelpBlock.call(this, config, 'max')
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

    return NumberField;
})(_react2['default'].Component);

exports['default'] = NumberField;
module.exports = exports['default'];
/*Not Edit Mode*/ /*editable show button*/ /*Edit Mode*/