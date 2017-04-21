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

var _reactTelephoneInput = require('react-telephone-input');

var _reactTelephoneInput2 = _interopRequireDefault(_reactTelephoneInput);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

//

var TelephoneField = (function (_React$Component) {
    _inherits(TelephoneField, _React$Component);

    function TelephoneField() {
        _classCallCheck(this, TelephoneField);

        _get(Object.getPrototypeOf(TelephoneField.prototype), 'constructor', this).call(this);
        this.state = {
            editMode: false,
            value: ''
        };
        this.isNumberField = false;
    }

    _createClass(TelephoneField, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ value: this.props.data.value });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            var data = this.props.data;
            var value = this.state.value;
            //parseToNumber
            //console.log('isNumberField', this.isNumberField)
            if (this.isNumberField == true) {
                value = parseInt(this.state.value.replace(/[^0-9\.]/g, ''), 10);
            }
            var objectToSend = {
                value: value,
                telephone: this.state.telephone,
                spacificType: 'Telephone',
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
        value: function handleChange(telNumber, selectedCountry) {
            this.setState({ value: telNumber, telephone: selectedCountry });
        }
    }, {
        key: 'getValidationState',
        value: function getValidationState(config) {
            var length = this.state.value.length;
            var validConfig = config ? config.validation : '';
            if (!validConfig || !validConfig.minLength && !validConfig.maxLength) {
                return 'success';
            } else {
                var min = validConfig.minLength;
                var max = validConfig.maxLength;
                if (min && max) {
                    if (length > min && length < max) {
                        return 'success';
                    } else if (length < min || length > max) {
                        return 'warning';
                    } else if (length == 0) {
                        return 'error';
                    }
                } else if (min && !max) {
                    if (length > min) {
                        return 'success';
                    } else if (length < min) {
                        return 'warning';
                    } else if (length == 0) {
                        return 'error';
                    }
                } else if (!min && max) {
                    if (length < max) {
                        return 'success';
                    } else if (length > max) {
                        return 'warning';
                    } else if (length == 0) {
                        return 'error';
                    }
                }
            }
        }
    }, {
        key: 'checkMinMaxlength',
        value: function checkMinMaxlength(config, type) {
            var length = this.state.value.length;
            var validConfig = config ? config.validation : '';
            if (!validConfig || !validConfig.minLength && !validConfig.maxLength) {
                return true;
            } else {
                var min = validConfig.minLength;
                var max = validConfig.maxLength;
                if (type == 'min' && min) {
                    if (length > min) {
                        return true;
                    }
                    return false;
                }
                if (type == 'max' && max) {
                    if (length < max) {
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
            //console.log('config1',config)
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
                var minLengthMsg = validConfig.minLength ? validConfig.minLengthMsg ? validConfig.minLengthMsg : 'The minimum character is ' + validConfig.minLength + ' ' : '';
                var maxLengthMsg = validConfig.maxLength ? validConfig.maxLengthMsg ? validConfig.maxLengthMsg : 'The maximum character is ' + validConfig.maxLength + ' ' : '';
                if (type == 'min' && minLengthMsg && this.getValidationState(config) != 'success' && !this.checkMinMaxlength(config, 'min')) {
                    elements.push(_react2['default'].createElement(
                        _reactBootstrap.HelpBlock,
                        { key: 1 },
                        minLengthMsg
                    ));
                }
                if (type == 'max' && maxLengthMsg && this.getValidationState(config) != 'success' && !this.checkMinMaxlength(config, 'max')) {
                    elements.push(_react2['default'].createElement(
                        _reactBootstrap.HelpBlock,
                        { key: 2 },
                        maxLengthMsg
                    ));
                }
                return elements;
            }
        }
    }, {
        key: 'checkForFormat',
        value: function checkForFormat(type, TurnOffautoFormat, numberField) {
            if (type == 'Number' || numberField) {
                this.isNumberField = true;
                return false;
            } else if (TurnOffautoFormat) {
                return false;
            }
            return true;
        }
    }, {
        key: 'undoValue',
        value: function undoValue() {
            this.handleChange(this.props.data.value);
            var count = this.state.defaultNumber || 0;
            this.setState({ defaultNumber: count + 1 });
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
            var sefl = this;
            var value = this.props.data.value || '';
            var editable = this.props.editable || false;
            var editMode = this.state.editMode || false;
            var config = this.props.config;
            var defaultCountry = this.props.config.defaultCountry || 'il';
            var numberField = this.props.config.numberField;
            var autoFormat = this.checkForFormat(this.props.data.type, this.props.config.TurnOffautoFormat, numberField);
            var type = this.props.type;
            var defaultConfiguration = this.props.defaultConfiguration;
            var editInLine = this.checkEditStyleConfig(defaultConfiguration, config, type);
            var defaultNumber = this.state.defaultNumber;
            //console.log('tel',this.state)
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
                                        validationState: this.getValidationState(config)
                                    },
                                    this.getLabel.call(this, config),
                                    !defaultNumber && _react2['default'].createElement(_reactTelephoneInput2['default'], { defaultCountry: defaultCountry, initialValue: this.state.value, flagsImagePath: '/flags.png', onChange: this.handleChange.bind(this), autoFormat: autoFormat }),
                                    defaultNumber == 1 && _react2['default'].createElement(_reactTelephoneInput2['default'], { defaultCountry: defaultCountry, initialValue: this.state.value, flagsImagePath: '/flags.png', onChange: this.handleChange.bind(this), autoFormat: autoFormat }),
                                    defaultNumber == 2 && _react2['default'].createElement(_reactTelephoneInput2['default'], { defaultCountry: defaultCountry, initialValue: this.state.value, flagsImagePath: '/flags.png', onChange: this.handleChange.bind(this), autoFormat: autoFormat }),
                                    defaultNumber == 3 && _react2['default'].createElement(_reactTelephoneInput2['default'], { defaultCountry: defaultCountry, initialValue: this.state.value, flagsImagePath: '/flags.png', onChange: this.handleChange.bind(this), autoFormat: autoFormat }),
                                    defaultNumber == 4 && _react2['default'].createElement(_reactTelephoneInput2['default'], { defaultCountry: defaultCountry, initialValue: this.state.value, flagsImagePath: '/flags.png', onChange: this.handleChange.bind(this), autoFormat: autoFormat }),
                                    _react2['default'].createElement(_reactBootstrap.FormControl.Feedback, null),
                                    !this.checkMinMaxlength(config, 'min') && this.getHelpBlock.call(this, config, 'min'),
                                    !this.checkMinMaxlength(config, 'max') && this.getHelpBlock.call(this, config, 'max')
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
                                    (!defaultNumber || defaultNumber < 4) && _react2['default'].createElement(
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

    return TelephoneField;
})(_react2['default'].Component);

exports['default'] = TelephoneField;
module.exports = exports['default'];
/*Not Edit Mode*/ /*editable show button*/ /*Edit Mode*/ /* USE 'defaultNumber' - tempery answer to bug with undo value in ReactTelInput */