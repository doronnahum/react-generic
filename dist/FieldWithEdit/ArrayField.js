//import
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _reactTagsinput = require('react-tagsinput');

var _reactTagsinput2 = _interopRequireDefault(_reactTagsinput);

var _reactAutosuggest = require('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _reactJsonEdit = require('./react-json-edit');

//Fix bug on unique key

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

//

var ArrayField = (function (_React$Component) {
    _inherits(ArrayField, _React$Component);

    function ArrayField() {
        _classCallCheck(this, ArrayField);

        _get(Object.getPrototypeOf(ArrayField.prototype), 'constructor', this).call(this);
        this.state = {
            editMode: false,
            value: []
        };
    }

    _createClass(ArrayField, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            //console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
            return true;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var string = JSON.stringify(this.props.data.value);
            var value = JSON.parse(string);
            if (value) {
                this.setState({ value: value });
            }
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            var data = this.props.data;
            var objectToSend = {
                value: this.state.value,
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
        value: function handleChange(tags) {
            var _this = this;

            var config = this.props.config;
            var useOnlyValueFromAutoComlete = config ? config.useOnlyValueFromAutoComlete : '';
            var autocomplete = config ? config.autocomplete : [];
            var tagsLength = tags.length || 0;
            if (useOnlyValueFromAutoComlete && autocomplete) {
                (function () {
                    //Work only on add tag, not remove
                    var options = [];
                    autocomplete.forEach(function (obj) {
                        options.push(obj.name);
                    });
                    if (tags.length > _this.state.value.length) {
                        if (options.indexOf(tags[tagsLength - 1]) == -1) {
                            _this.setState({ value: _this.state.value });
                        } else {
                            _this.setState({ value: tags });
                        }
                    } else {
                        _this.setState({ value: tags });
                    }
                })();
            } else {
                this.setState({ value: tags });
            }
        }
    }, {
        key: 'getValidationState',
        value: function getValidationState(config) {
            var length = this.state.value.length;
            var validConfig = config ? config.validation : '';
            if (!validConfig || !validConfig.minItems && !validConfig.maxItems) {
                return 'success';
            } else {
                var min = validConfig.minItems;
                var max = validConfig.maxItems;
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
        key: 'checkMinmaxItems',
        value: function checkMinmaxItems(config, type) {
            var length = this.state.value.length;
            var validConfig = config ? config.validation : '';
            if (!validConfig || !validConfig.minItems && !validConfig.maxItems) {
                return true;
            } else {
                var min = validConfig.minItems;
                var max = validConfig.maxItems;
                if (type == 'min' && min) {
                    if (length >= min) {
                        return true;
                    }
                    return false;
                }
                if (type == 'max' && max) {
                    if (length <= max) {
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
                var minItemsMsg = validConfig.minItems ? validConfig.minItemsMsg ? validConfig.minItemsMsg : 'The minimum items is ' + validConfig.minItems + ' ' : '';
                var maxItemsMsg = validConfig.maxItems ? validConfig.maxItemsMsg ? validConfig.maxItemsMsg : 'The maximum items is ' + validConfig.maxItems + ' ' : '';
                if (type == 'min' && minItemsMsg && this.getValidationState(config) != 'success' && !this.checkMinmaxItems(config, 'min')) {
                    elements.push(_react2['default'].createElement(
                        _reactBootstrap.HelpBlock,
                        { key: 1 },
                        minItemsMsg
                    ));
                }
                if (type == 'max' && maxItemsMsg && this.getValidationState(config) != 'success' && !this.checkMinmaxItems(config, 'max')) {
                    elements.push(_react2['default'].createElement(
                        _reactBootstrap.HelpBlock,
                        { key: 2 },
                        maxItemsMsg
                    ));
                }
                return elements;
            }
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
        key: 'returnOnlyUnique',
        value: function returnOnlyUnique() {
            var defaultConfiguration = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            if (defaultConfiguration && defaultConfiguration['onArrayDisableOnlyUniqueIsAuto']) {
                return true;
            } else if (config && config['disableOnlyUnique']) {
                return true;
            }
            return false;
        }

        //Return flase if array contain obj or array
    }, {
        key: 'IsBasicArray',
        value: function IsBasicArray(value) {
            var status = true;
            if (!value) {
                return status;
            }
            if (value && value.length > 0) {
                value.forEach(function (val) {
                    var type = typeof val;
                    //console.log('type',type)
                    if (!(type == 'string' || type == 'number' || type == 'boolean' || type == 'undefined')) {
                        status = false;
                    }
                });
            }
            return status;
        }
    }, {
        key: 'undoValue',
        value: function undoValue() {
            this.handleChange(this.props.data.value);
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
            var _this2 = this;

            var value = this.props.data.value || [];
            //console.log('look for string, is array?',this.IsBasicArray(value), value)
            var editable = this.props.editable || false;
            var editMode = this.state.editMode || false;
            var config = this.props.config;
            var disableOnlyUnique = this.returnOnlyUnique(this.props.defaultConfiguration, config);
            var placeholder = config ? config.placeholder : 'add a tags..';
            var validationRegex = config ? config.validation ? config.validation.validationRegex ? config.validation.validationRegex : /.*/ : /.*/ : /.*/;
            var autocompleteOptions = config ? config.autocomplete : [];
            var type = this.props.type;
            var defaultConfiguration = this.props.defaultConfiguration;
            var editInLine = this.checkEditStyleConfig(defaultConfiguration, config, type);

            function autocompleteRenderInput(_ref) {
                var addTag = _ref.addTag;

                var props = _objectWithoutProperties(_ref, ['addTag']);

                var handleOnChange = function handleOnChange(e, _ref2) {
                    var newValue = _ref2.newValue;
                    var method = _ref2.method;

                    if (method === 'enter') {
                        e.preventDefault();
                    } else {
                        props.onChange(e);
                    }
                };

                var inputValue = props.value && props.value.trim().toLowerCase() || '';
                var inputLength = inputValue.length;

                var suggestions = autocompleteOptions.filter(function (state) {
                    return state.name.toLowerCase().slice(0, inputLength) === inputValue;
                });

                //let isBasicArray = this.IsBasicArray(value) || false ;
                //let isBasicArray = false;
                return _react2['default'].createElement(_reactAutosuggest2['default'], {
                    ref: props.ref,
                    suggestions: suggestions,
                    shouldRenderSuggestions: function (value) {
                        return value && value.trim().length > 0;
                    },
                    getSuggestionValue: function (suggestion) {
                        return suggestion.name;
                    },
                    renderSuggestion: function (suggestion) {
                        return _react2['default'].createElement(
                            'span',
                            null,
                            suggestion.name
                        );
                    },
                    inputProps: _extends({}, props, { onChange: handleOnChange }),
                    onSuggestionSelected: function (e, _ref3) {
                        var suggestion = _ref3.suggestion;

                        addTag(suggestion.name);
                    },
                    onSuggestionsClearRequested: function () {},
                    onSuggestionsFetchRequested: function () {}
                });
            }

            return _react2['default'].createElement(
                'div',
                null,
                (!editMode || !editInLine) && _react2['default'].createElement(
                    'span',
                    null,
                    this.printStringFromArray.call(this, value)
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
                                    this.IsBasicArray(value) && !this.state.useJsonEditor && _react2['default'].createElement(
                                        'div',
                                        { className: 'tagsEditorStyle' },
                                        _react2['default'].createElement(_reactTagsinput2['default'], { renderInput: autocompleteRenderInput, validationRegex: validationRegex, inputProps: { placeholder: placeholder }, value: this.state.value, onChange: this.handleChange.bind(this), onlyUnique: disableOnlyUnique }),
                                        _react2['default'].createElement(
                                            _reactBootstrap.Button,
                                            { className: 'replace', onClick: function () {
                                                    _this2.setState({ useJsonEditor: true });
                                                } },
                                            _react2['default'].createElement('i', { className: 'fa fa=fw fa-file-code-o' })
                                        )
                                    ),
                                    (!this.IsBasicArray(value) || this.state.useJsonEditor) && _react2['default'].createElement(
                                        'div',
                                        { className: 'jsonEditorStyle' },
                                        _react2['default'].createElement(_reactJsonEdit.JsonEditor, { value: this.state.value, propagateChanges: this.handleChange.bind(this) })
                                    ),
                                    _react2['default'].createElement(_reactBootstrap.FormControl.Feedback, null),
                                    !this.checkMinmaxItems(config, 'min') && this.getHelpBlock.call(this, config, 'min'),
                                    !this.checkMinmaxItems(config, 'max') && this.getHelpBlock.call(this, config, 'max')
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
                                        { onClick: function () {
                                                _this2.undoValue.call(_this2, value);
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

    return ArrayField;
})(_react2['default'].Component);

exports['default'] = ArrayField;
module.exports = exports['default'];
/*Not Edit Mode*/ /*editable show button*/ /*Edit Mode*/