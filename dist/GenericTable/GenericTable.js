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

var GenericTable = (function (_React$Component) {
    _inherits(GenericTable, _React$Component);

    function GenericTable() {
        _classCallCheck(this, GenericTable);

        _get(Object.getPrototypeOf(GenericTable.prototype), 'constructor', this).call(this);
        this.state = {};
        this.isPrintReactTable = false;
        this.selectedRow = null;
    }

    _createClass(GenericTable, [{
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
        value: function buildColumns(schema, handleSubmitFromField, fieldsConfiguration, defaultConfiguration, handlePointerClick, getPointerOptions) {
            var _this = this;

            var columns = [];
            //console.log('render2',defaultConfiguration)
            schema.forEach(function (field, i) {
                columns.push({
                    id: field.name,
                    header: field.name,
                    minWidth: _this.getFieldWidth(fieldsConfiguration, field.name, defaultConfiguration, field.type),
                    accessor: field.name,
                    //render: props => Field(props,i,props.row,props.value,field.type,field.name,handleSubmitFromField,this.getFieldConfig(fieldsConfiguration,field.name),defaultConfiguration,handlePointerClick,getPointerOptions,field)
                    render: function render(props) {
                        return _react2['default'].createElement(_FieldWithEdit.Field, { key: i, row: props.row, value: props.value, type: field.type, name: field.name,
                            handleSubmit: handleSubmitFromField, config: _this.getFieldConfig(fieldsConfiguration, field.name),
                            defaultConfiguration: defaultConfiguration,
                            handlePointerClick: handlePointerClick,
                            getPointerOptions: getPointerOptions,
                            field: field
                        });
                    } // Custom cell components!
                });
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
        key: 'printReactTable',
        value: function printReactTable(data, dataClassName, fields, countResults, handleSubmitFromField, fieldsConfiguration, defaultConfiguration, handlePointerClick, getPointerOptions, defaultPageSize, loading, onRowSelectd) {
            var _this2 = this;

            this.isPrintReactTable = true;
            this.dataClassName = dataClassName;
            var rowId = defaultConfiguration ? defaultConfiguration[rowId] ? defaultConfiguration[rowId] : 'objectId' : 'objectId';
            return _react2['default'].createElement(_reactTable2['default'], {
                defaultPageSize: defaultPageSize,
                showFilters: false,
                loading: loading,
                //defaultFilterMethod={(filter) => (//console.log('filter',filter)) }
                getTrProps: function (state, rowInfo, column, instance) {
                    //On Row Click
                    if (rowInfo) {
                        var row = rowInfo.row;
                        return {
                            style: {
                                backgroundColor: row[rowId] == _this2.state.selectedRow ? '#303030' : 'initial'
                            },
                            onClick: function onClick(e) {
                                var row = rowInfo.row;
                                if (!row) {
                                    return;
                                }
                                if (row[rowId] == _this2.state.selectedRow) {
                                    _this2.setState({ selectedRow: null });
                                    if (onRowSelectd) {
                                        onRowSelectd(null);
                                    }
                                } else {
                                    _this2.setState({ selectedRow: row[rowId] });
                                    if (onRowSelectd) {
                                        onRowSelectd(row);
                                    }
                                }
                            }
                        };
                    }
                },
                data: data, columns: this.buildColumns.call(this, fields, handleSubmitFromField, fieldsConfiguration, defaultConfiguration, handlePointerClick, getPointerOptions) });
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

            //console.log('GenericTable, data',data)
            //console.log('GenericTable, dataClassName',dataClassName)
            //console.log('GenericTable, fields',fields)
            //console.log('GenericTable, countResults',countResults)
            var onlyShowField = this.getonlyShowField(fields, defaultConfiguration);
            return _react2['default'].createElement(
                _reactBootstrap.Row,
                { className: 'GenericTable' },
                _react2['default'].createElement(
                    _reactBootstrap.Col,
                    { lg: 12 },
                    this.printReactTable.call(this, data, dataClassName, onlyShowField, countResults, handleSubmitFromField, fieldsConfiguration, defaultConfiguration, handlePointerClick, getPointerOptions, defaultPageSize, loading, onRowSelectd)
                )
            );
        }
    }]);

    return GenericTable;
})(_react2['default'].Component);

exports['default'] = GenericTable;
module.exports = exports['default'];