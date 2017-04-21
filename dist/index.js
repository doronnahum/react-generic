'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _FieldWithEdit = require('./FieldWithEdit');

var _GenericForm = require('./GenericForm');

var _GenericForm2 = _interopRequireDefault(_GenericForm);

var _GenericTable = require('./GenericTable');

var _GenericTable2 = _interopRequireDefault(_GenericTable);

exports.Field = _FieldWithEdit.Field;
exports.DateField = _FieldWithEdit.DateField;
exports.StringField = _FieldWithEdit.StringField;
exports.NumberField = _FieldWithEdit.NumberField;
exports.TelephoneField = _FieldWithEdit.TelephoneField;
exports.ArrayField = _FieldWithEdit.ArrayField;
exports.FileField = _FieldWithEdit.FileField;
exports.PointerField = _FieldWithEdit.PointerField;
exports.SpecialPointer = _FieldWithEdit.SpecialPointer;
exports.GenericForm = _GenericForm2['default'];
exports.GenericTable = _GenericTable2['default'];