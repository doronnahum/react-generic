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

var _reactTable = require('react-table');

var _reactTable2 = _interopRequireDefault(_reactTable);

var _reactBootstrap = require('react-bootstrap');

var _FieldWithEdit = require('../FieldWithEdit');

//

var GenericForm = (function (_React$Component) {
    _inherits(GenericForm, _React$Component);

    function GenericForm() {
        _classCallCheck(this, GenericForm);

        _get(Object.getPrototypeOf(GenericForm.prototype), 'constructor', this).call(this);
        this.state = {};
        this.isPrintReactTable = false;
        this.selectedRow = null;
    }

    _createClass(GenericForm, [{
        key: 'getFieldWidth',
        value: function getFieldWidth(fieldsConfiguration, name, defaultConfiguration, type) {
            var defaultWidth = defaultConfiguration ? defaultConfiguration.fieldsWidth || 200 : 200;
            if (defaultConfiguration && defaultConfiguration.fieldsWidthByName && defaultConfiguration.fieldsWidthByName[name]) {
                return defaultConfiguration.fieldsWidthByName[name];
            }
            if (defaultConfiguration && defaultConfiguration.fieldsWidthByType && defaultConfiguration.fieldsWidthByType[type]) {
                return defaultConfiguration.fieldsWidthByType[type];
            }
            var fieldConfig = fieldsConfiguration ? fieldsConfiguration[name] ? fieldsConfiguration[name] : '' : '';
            if (fieldConfig && fieldConfig.width) {
                return fieldConfig.width;
            }
            return defaultWidth;
        }
    }, {
        key: 'getFieldConfig',
        value: function getFieldConfig(fieldsConfiguration, name) {
            if (fieldsConfiguration && fieldsConfiguration[name]) {
                return fieldsConfiguration[name];
            }
            return null;
        }
    }, {
        key: 'buildColumns',
        value: function buildColumns(schema, handleSubmitFromField, fieldsConfiguration, defaultConfiguration, handlePointerClick, getPointerOptions, data) {
            var _this = this;

            var columns = [];
            //console.log('render2',defaultConfiguration)

            schema.forEach(function (field, i) {
                var row = data ? data[0] : {};
                var value = row ? row[field.name] : null;
                columns.push(_react2['default'].createElement(
                    'div',
                    { className: 'fieldRow', key: i },
                    _react2['default'].createElement(
                        'div',
                        { className: 'fieldLabel' },
                        field.name
                    ),
                    _react2['default'].createElement(_FieldWithEdit.Field, { key: i, row: row, value: value, type: field.type, name: field.name,
                        handleSubmit: handleSubmitFromField, config: _this.getFieldConfig(fieldsConfiguration, field.name),
                        defaultConfiguration: defaultConfiguration,
                        handlePointerClick: handlePointerClick,
                        getPointerOptions: getPointerOptions,
                        field: field
                    })
                ));
            });
            return columns;
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (this.isPrintReactTable && this.dataClassName == nextState.dataClassName) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'printForm',
        value: function printForm(data, dataClassName, fields, countResults, handleSubmitFromField, fieldsConfiguration, defaultConfiguration, handlePointerClick, getPointerOptions, defaultPageSize, loading, onRowSelectd) {
            this.isPrintReactTable = true;
            this.dataClassName = dataClassName;
            var rowId = defaultConfiguration ? defaultConfiguration[rowId] ? defaultConfiguration[rowId] : 'objectId' : 'objectId';
            return _react2['default'].createElement(
                'div',
                null,
                this.buildColumns(fields, handleSubmitFromField, fieldsConfiguration, defaultConfiguration, handlePointerClick, getPointerOptions, data)
            );
        }
    }, {
        key: 'getonlyShowField',
        value: function getonlyShowField(fields, defaultConfiguration) {
            if (defaultConfiguration && defaultConfiguration.fieldToHide && fields) {
                var _ret = (function () {
                    var filterField = [];
                    var fieldToHide = defaultConfiguration.fieldToHide;
                    fields.forEach(function (obj) {
                        if (fieldToHide.indexOf(obj.name) == -1) {
                            filterField.push(obj);
                        }
                    });
                    return {
                        v: filterField
                    };
                })();

                if (typeof _ret === 'object') return _ret.v;
            }
            return fields;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var data = _props.data;
            var dataClassName = _props.dataClassName;
            var fields = _props.fields;
            var countResults = _props.countResults;
            var handleSubmitFromField = _props.handleSubmitFromField;
            var fieldsConfiguration = _props.fieldsConfiguration;
            var defaultConfiguration = _props.defaultConfiguration;
            var handlePointerClick = _props.handlePointerClick;
            var getPointerOptions = _props.getPointerOptions;
            var defaultPageSize = _props.defaultPageSize;
            var loading = _props.loading;
            var onRowSelectd = _props.onRowSelectd;

            //console.log('GenericForm, data',data)
            //console.log('GenericForm, dataClassName',dataClassName)
            //console.log('GenericForm, fields',fields)
            //console.log('GenericForm, countResults',countResults)
            var onlyShowField = this.getonlyShowField(fields, defaultConfiguration);
            return _react2['default'].createElement(
                _reactBootstrap.Row,
                { className: 'GenericForm' },
                _react2['default'].createElement(
                    _reactBootstrap.Col,
                    { lg: 12 },
                    this.printForm.call(this, data, dataClassName, onlyShowField, countResults, handleSubmitFromField, fieldsConfiguration, defaultConfiguration, handlePointerClick, getPointerOptions, defaultPageSize, loading, onRowSelectd)
                )
            );
        }
    }]);

    return GenericForm;
})(_react2['default'].Component);

exports['default'] = GenericForm;
module.exports = exports['default'];