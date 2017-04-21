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

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

//

var FileField = (function (_React$Component) {
    _inherits(FileField, _React$Component);

    function FileField() {
        _classCallCheck(this, FileField);

        _get(Object.getPrototypeOf(FileField.prototype), 'constructor', this).call(this);
        this.state = {
            editMode: false,
            value: {},
            files: null
        };
    }

    _createClass(FileField, [{
        key: 'onDrop',
        value: function onDrop(files) {
            //console.log('onDrop', files)
            //console.log('files',files)
            this.setState({
                files: files
            });
        }
    }, {
        key: 'onOpenClick',
        value: function onOpenClick() {
            this.refs.dropzone.open();
        }

        // handleChange(value) {
        //     this.setState({ value: value })
        // }

    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.value) {
                this.setState({ value: this.props.data.value });
            }
        }
    }, {
        key: 'convertPrivewFileToFileObj',
        value: function convertPrivewFileToFileObj(data) {
            var obj = {};
            obj['__type'] = 'File';
            obj['name'] = data.name;
            obj['url'] = data.preview || preview.url;
            return obj;
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit() {
            var data = this.props.data;
            var convert = undefined;
            var objectToSend = {
                value: this.convertPrivewFileToFileObj(this.state.files[0]),
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
        key: 'privewFile',
        value: function privewFile(file) {
            //console.log('privewFile',file)
            var fileType = file ? file.name.split('.').pop().toLowerCase() : '';
            //console.log('privewFileType',file)
            if (!fileType) {
                return '';
            } else if (['bmp', 'gif', 'jpeg', 'png', 'tiff', 'svg', 'bmp', 'ico', 'jpg'].indexOf(fileType) > -1) {
                return _react2['default'].createElement(
                    'div',
                    { className: 'imageInEditField' },
                    _react2['default'].createElement('img', { src: file.preview || file.url, alt: '' })
                );
            } else if (['mp4', 'ogg', 'WebM'].indexOf(fileType) > -1) {
                return _react2['default'].createElement(
                    'div',
                    { className: 'videoInTable' },
                    _react2['default'].createElement('video', { width: '400', controls: true, key: file.name, className: 'img-responsive', src: window.URL.createObjectURL(file) })
                );
            } else if (['mp3'].indexOf(fileType) > -1) {
                return _react2['default'].createElement(
                    'div',
                    { className: 'audioInTable' },
                    _react2['default'].createElement(
                        'audio',
                        { controls: true },
                        _react2['default'].createElement('source', { src: window.URL.createObjectURL(file), type: 'audio/ogg' })
                    )
                );
            } else {
                return _react2['default'].createElement(
                    'div',
                    { className: 'downloadFile text-center' },
                    _react2['default'].createElement(
                        'span',
                        { className: 'wrapper' },
                        _react2['default'].createElement(
                            'span',
                            { className: 'text' },
                            _react2['default'].createElement(
                                'span',
                                null,
                                file.name.substr(1, 10),
                                file.name.length > 10 ? '(...)' : ''
                            ),
                            '.',
                            fileType
                        ),
                        _react2['default'].createElement('a', { className: 'fa fa-fw fa-cloud-download icon', href: file.url, alt: '', download: true })
                    )
                );
            }
        }
    }, {
        key: 'undoValue',
        value: function undoValue() {
            this.onDrop([this.props.data.value]);
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

            var file = this.props.data.value || '';
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
                    this.privewFile(file)
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
                                _reactDropzone2['default'],
                                { ref: 'dropzone', onDrop: this.onDrop.bind(this), multiple: false, className: 'dropzoneFile' },
                                _react2['default'].createElement(
                                    'div',
                                    null,
                                    'dropping file here , or click to select file'
                                ),
                                this.state.files && _react2['default'].createElement(
                                    'div',
                                    null,
                                    this.state.files.map(function (file) {
                                        if (file) return _react2['default'].createElement(
                                            'div',
                                            { key: file.name },
                                            ' ',
                                            _this.privewFile(file),
                                            ' '
                                        );
                                    })
                                ),
                                !this.state.files && _react2['default'].createElement(
                                    'div',
                                    null,
                                    this.privewFile(file)
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

    return FileField;
})(_react2['default'].Component);

exports['default'] = FileField;
module.exports = exports['default'];
/*Not Edit Mode*/ /*editable show button*/ /*Edit Mode*/