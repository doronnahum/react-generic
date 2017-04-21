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

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _indexJs = require('./index.js');

//

var Field = (function (_React$Component) {
    _inherits(Field, _React$Component);

    function Field() {
        _classCallCheck(this, Field);

        _get(Object.getPrototypeOf(Field.prototype), 'constructor', this).call(this);
        // this.state = Object.assign({}, this.state, {

        // });
        this.value = null;
    }

    _createClass(Field, [{
        key: 'componentWillmount',
        value: function componentWillmount() {
            this.value = this.props.value;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.isFirstRender = false;
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (this.value != nextProps.value) {
                this.value = nextProps.value;
                return true;
            }
            return false;
        }

        //     componentWillReceiveProps(nextProps) {
        //     //console.log('string props', nextProps)
        // }

    }, {
        key: 'handleonChange',
        value: function handleonChange(value) {
            alert(value);
        }
    }, {
        key: 'checkEditable',
        value: function checkEditable(config, name, defaultConfiguration) {
            if (name == 'objectId' || name == 'createdAt' || name == 'updatedAt') {
                return false;
            } else if (defaultConfiguration && defaultConfiguration.disabledEditable) {
                return false;
            } else if (config && config[name] && config[name].disabledEditable) {
                return false;
            }
            return true;
        }
    }, {
        key: 'parseValue',
        value: function parseValue(value) {
            //console.log('render1', this.props)
            this.isFirstRender = true;
            var valueType = typeof value;
            var schemaType = this.props.type;
            var objectId = this.props.row.objectId;
            var name = this.props.name;
            var field = this.props.field; //important for Pointer targetclass
            var config = this.props.config;
            var defaultConfiguration = this.props.defaultConfiguration;
            var handlePointerClick = this.props.handlePointerClick || null;
            var getPointerOptions = this.props.getPointerOptions || null;
            var key = objectId + '>' + name;
            var editable = this.checkEditable(config, name, defaultConfiguration);
            var spacificType = config ? config.type ? config.type : '' : '';
            var data = {
                value: value || '',
                objectId: objectId,
                row: this.props.row,
                type: this.props.type,
                name: name
            };
            //---Formate by spacific type ---//
            if (spacificType) {
                if (spacificType == 'Telephone') {
                    return _react2['default'].createElement(_indexJs.TelephoneField, { key: key, data: data, editable: editable, type: schemaType, handleSubmit: this.props.handleSubmit, config: config, defaultConfiguration: defaultConfiguration });
                }
                if (spacificType == 'SpecialPointer') {
                    return _react2['default'].createElement(_indexJs.SpecialPointer, { key: key, data: data, editable: editable, type: schemaType, handleSubmit: this.props.handleSubmit, config: config, handlePointerClick: handlePointerClick, getPointerOptions: getPointerOptions, defaultConfiguration: defaultConfiguration });
                }
                return _react2['default'].createElement(_indexJs.StringField, { key: key, data: data, editable: editable, type: schemaType, handleSubmit: this.props.handleSubmit, config: config, defaultConfiguration: defaultConfiguration });
            }
            //---Formate by global type---//
            //Date formater
            if (schemaType == 'Date') {
                return _react2['default'].createElement(_indexJs.DateField, { key: key, data: data, editable: editable, type: schemaType, format: 'HH:MM m/d/yy', handleSubmit: this.props.handleSubmit, config: config, defaultConfiguration: defaultConfiguration });
            }
            //String,Number,Bollean Formmater

            else if (schemaType === 'String') {
                    return _react2['default'].createElement(_indexJs.StringField, { key: key, data: data, editable: editable, type: schemaType, handleSubmit: this.props.handleSubmit, config: config, defaultConfiguration: defaultConfiguration });
                } else if (schemaType === 'Array') {
                    return _react2['default'].createElement(_indexJs.ArrayField, { key: key, data: data, defaultConfiguration: defaultConfiguration, type: schemaType, editable: editable, handleSubmit: this.props.handleSubmit, config: config });
                } else if (schemaType == 'Number') {
                    return _react2['default'].createElement(_indexJs.NumberField, { key: objectId + '>' + name, data: data, editable: editable, type: schemaType, handleSubmit: this.props.handleSubmit, config: config, defaultConfiguration: defaultConfiguration });
                } else if (schemaType == 'File') {
                    return _react2['default'].createElement(_indexJs.FileField, { key: objectId + '>' + name, data: data, editable: editable, type: schemaType, handleSubmit: this.props.handleSubmit, config: config, defaultConfiguration: defaultConfiguration });
                } else if (schemaType == 'boolean') {
                    return value;
                }
                //PointerFormatter
                else if (schemaType == 'Pointer') {
                        return _react2['default'].createElement(_indexJs.PointerField, { field: field, key: key, data: data, type: schemaType, editable: editable, handleSubmit: this.props.handleSubmit, config: config, handlePointerClick: handlePointerClick, getPointerOptions: getPointerOptions, defaultConfiguration: defaultConfiguration });
                    }

                    //Object,Array formmater
                    else if (value) {
                            //console.log('schemaType',this.props.name , schemaType  )
                            //if(schemaType && schemaType == 'Date' ){ return ( dateformat('2017-03-20T22:33:04.582Z' , 'HH:MM m/d/yy') ) }
                            //else{return qs.stringify(value)}
                            return _qs2['default'].stringify(value);
                        }
            //Empty cell
            return '-';
        }
    }, {
        key: 'printAllData',
        value: function printAllData() {
            //console.log('printAllData',this.props)
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'span',
                null,
                this.parseValue(this.props.value)
            );
        }
    }]);

    return Field;
})(_react2['default'].Component);

exports['default'] = Field;
module.exports = exports['default'];