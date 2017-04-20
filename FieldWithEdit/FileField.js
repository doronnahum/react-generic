//import
import React from 'react';
import {ButtonToolbar,Button, ButtonGroup} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import Draggable from 'react-draggable';
//




class FileField extends React.Component {

    constructor() {
        super();
        this.state =  {
            editMode: false,
            value: {},
            files: null
        };
    }

    onDrop(files) {
        //console.log('onDrop', files)
        //console.log('files',files)
        this.setState({
            files: files
        });
    }

    onOpenClick() {
        this.refs.dropzone.open();
    }

    // handleChange(value) {
    //     this.setState({ value: value })
    // }

    componentWillMount() {
        if (this.props.value) { this.setState({ value: this.props.data.value }) }
    }

    convertPrivewFileToFileObj(data){
        let obj = {}
        obj['__type'] = 'File'
        obj['name'] = data.name;
        obj['url'] = data.preview || preview.url
        return obj
    }

    handleSubmit() {
        let data = this.props.data
        let convert
        let objectToSend = {
            value: this.convertPrivewFileToFileObj(this.state.files[0]),
            oldValue: data.value,
            objectId: data.objectId,
            name: data.name,
            type: data.type,
            row: data.row
        }
        this.props.handleSubmit(objectToSend)
        this.setState({ editMode: false })
    }

    privewFile(file){
        //console.log('privewFile',file)
        let fileType = file? file.name.split('.').pop().toLowerCase() : ''
        //console.log('privewFileType',file)
        if (!fileType) { return '' }

        else if (['bmp', 'gif', 'jpeg', 'png', 'tiff', 'svg', 'bmp', 'ico', 'jpg'].indexOf(fileType) > -1) {
            return (
                <div className="imageInEditField">
                    <img src={file.preview || file.url} alt="" />
                </div>
            )
        }
        else if (['mp4', 'ogg', 'WebM'].indexOf(fileType) > -1) {
            return (
                <div className="videoInTable">
                     <video width="400" controls key={file.name}  className='img-responsive' src={window.URL.createObjectURL(file)}></video>
                </div>
            )
        }
        else if (['mp3'].indexOf(fileType) > -1) {
            return (
                <div className="audioInTable">
                    <audio controls>
                        <source src={window.URL.createObjectURL(file)} type="audio/ogg" />
                    </audio>
                </div>
            )
        }
        else {
            return (
                <div className="downloadFile text-center">
                    <span className="wrapper">
                        <span className="text"><span>{file.name.substr(1, 10)}{file.name.length > 10 ? '(...)' : ''}</span>.{fileType}</span>
                        <a className="fa fa-fw fa-cloud-download icon" href={file.url} alt="" download />
                    </span>
                </div>
            )
        }

    }
    undoValue(){
        this.onDrop([this.props.data.value])
    }

    switchEditMode(e){
        let x = e.target;
        this.left = e.nativeEvent.clientX - e.nativeEvent.screenY
        this.top = e.nativeEvent.clientY 
        //console.log('target',e.nativeEvent,e)
        if(this.state.editMode){
            this.setState({ editMode: false})
            return
        }
        this.setState({ editMode: true})
    }

    checkEditStyleConfig(defaultConfiguration , config ,type){
        if(config && config['disableEditInline']){ return false}
        else if(defaultConfiguration && defaultConfiguration['disableEditInlineByType'] &&  defaultConfiguration['disableEditInlineByType'][type]){ return false }
        else if(defaultConfiguration && defaultConfiguration['disableEditInline']){ return false}
         return true
    }

    render() {
        let file = this.props.data.value  || '';
        let editable = this.props.editable || false;
        let editMode = this.state.editMode || false;
        let config = this.props.config;
        let type = this.props.type
        let defaultConfiguration = this.props.defaultConfiguration
        let editInLine = this.checkEditStyleConfig(defaultConfiguration , config ,type);
        return (
            <div>
            {/*Not Edit Mode*/}
            {(!editMode || !editInLine ) && <span>{this.privewFile(file)}</span>}
            {/*editable show button*/}
            {(editable && !editMode ) && <span className=" glyphicon glyphicon-edit  pointer floatRight editPencil" onClick={::this.switchEditMode}></span>}
            {/*Edit Mode*/}
            {editMode && 
                <Draggable disabled={editInLine}>
                    <div className={"Array " + (editInLine ? 'inLineEdit' : 'popoverEdit')} style={{ left: this.left, top: this.top }}>
                        <div className="wrapper">
                            <Dropzone ref="dropzone" onDrop={::this.onDrop} multiple={false} className='dropzoneFile' >
                            <div >dropping file here , or click to select file</div>
                            {this.state.files && <div>{this.state.files.map((file) => { if (file) return (<div key={file.name} > {this.privewFile(file)} </div>) })}</div>}
                            {!this.state.files && <div>{this.privewFile(file)}</div>}
                            </Dropzone>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <Button onClick={::this.handleSubmit}><i className="fa  fa-save fa-fw"></i></Button>
                                    <Button onClick={(value) => {::this.undoValue(value)}}><i className="fa fa-undo fa-fw"></i></Button>
                                    <Button onClick={::this.switchEditMode}><i className="fa fa-window-close-o"></i></Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </div>
                    </div>
                </Draggable>    
            }
            </div>
        )
    }

}



export default FileField;
