//import
    import React from 'react';
    import {Form,FormGroup,HelpBlock,ControlLabel,ButtonToolbar,
     Button,ButtonGroup,FormControl,
    OverlayTrigger} from 'react-bootstrap';
    import Select from 'react-select';
    import Draggable from 'react-draggable';


//


class PointerField extends React.Component {

    constructor() {
        super();
        this.state =  {
            editMode: false,
            value: ''
        };
    }


    componentWillMount () {
        let dataClassName = this.props.field.targetClass;
        let fieldName = this.props.data.name;
        if(this.props.data.value){
            let key = this.getTitleForPointer(dataClassName , fieldName) || 'objectId'; 
            //console.log('componentWillMount', this.props)
            let valueObj ={};
            valueObj.value = this.props.data.value;
            valueObj.label =  this.props.data.value ?  this.props.data.value[key] : '';
            this.defaultValue =valueObj
            this.setState({ value: valueObj  })
        }

    }

    componentDidMount() {
        let callback = (nullValue, obj) => {
            //console.log('this.getOptions=>callback', obj)
            this.setState({ options: obj.options })
        }
        if (!this.state.options) {
            //console.log('this.getOptions')
            this.getOptions('input', callback)
        }
    }

    handleSubmit(){
        let data = this.props.data
        let objectToSend = {
            value : this.state.value.value,
            oldValue : data.value,
            objectId : data.objectId,
            name: data.name,
            type: data.type,
            row: data.row
        }
        this.props.handleSubmit(objectToSend)
        this.setState({editMode:false})
    }

    handleChange(e) {
        //console.log('handleChange',e)
        this.setState({ value: e })
    } 



    getTitleForPointer(dataClassName,fieldName){
        let globalConfig = this.props.defaultConfiguration;
        let fieldConfig  = this.props.config;
        if(fieldConfig && fieldConfig.pointerTitle){return fieldConfig.pointerTitle}
        else if(globalConfig && globalConfig.setPointerTitleByPointerName && globalConfig.setPointerTitleByPointerName[dataClassName] ){
            return globalConfig.setPointerTitleByPointerName[dataClassName]
        }
        return 'objectId'

    }

 
    getPointerTitle(value,config){
        //console.log('getPointerTitle',value)
        if(!value){return '-'}
        if(config && config.pointerTitle){
            let key = config.pointerTitle;
            let title = value[key] || value.objectId
            return title;
        }
        return value.objectId;
    }

    handlePointerClick(){
        if(this.props.handlePointerClick){
            this.props.handlePointerClick(this.props.data.value)
        }
    }

    getOptions(input, callback) {
        let dataClassName = this.props.field.targetClass  
        let fieldName = this.props.data.name;
        ////console.log('getOptions',this)
        this.props.getPointerOptions(input, callback,dataClassName,fieldName)
    };
    
        undoValue(value){
        this.setState({value : this.defaultValue})
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

    getTitleTextFromPointers(value,pointerKeyForTitle){
        let dataClassName = this.props.field.targetClass  
        let fieldName = this.props.data.name;
        let pointers = this.state.options
        //console.log('getTitleTextFromPointers',pointers)
        if(!pointers && !value ){return '-'}
        if(!pointers && value){return value.objectId}
        let label =  value.objectId ;
        pointers.forEach(obj=>{
            if(obj.value.objectId == value.objectId){
                label = obj.label
            }
        })
        return label;
    }

    render() {
        let value = this.props.data.value || ''; 
        let editable = this.props.editable || false;
        let editMode = this.state.editMode || false;
        let config = this.props.config;
        let getPointerOptions = this.props.getPointerOptions || null;
        let pointerKeyForTitle = this.getTitleForPointer(this.props.field.targetClass ,this.props.data.name) || 'objectId'
        let pointerTitle = this.getTitleTextFromPointers(value,pointerKeyForTitle ) //;value ? value[pointerKeyForTitle] : '';
        let type = this.props.type
        let defaultConfiguration = this.props.defaultConfiguration
        let editInLine = this.checkEditStyleConfig(defaultConfiguration , config ,type);
        return (
            <div>
            {/*Not Edit Mode*/}
            {(!editMode || !editInLine ) && 
                <span>
                    {pointerTitle && <Button bsStyle='default'  onClick={::this.handlePointerClick}>{pointerTitle}</Button>}
                    {(!pointerTitle) && '-'}
                </span>
            }
            {/*editable show button*/}
            {(editable && !editMode ) && <span className=" glyphicon glyphicon-edit  pointer floatRight editPencil" onClick={::this.switchEditMode}></span>}
            {/*Edit Mode*/}
            {editMode && 
                <Draggable disabled={editInLine}>
                    <div className={"Array " + (editInLine ? 'inLineEdit' : 'popoverEdit')} style={{ left: this.left, top: this.top }}>
                        <div className="wrapper">
                            <form>
                                <FormGroup
                                controlId={`${this.props.data.objectId}>${this.props.data.name}`}>
                                <Select.Async
                                name="form-field-name"
                                value={this.state.value}
                                loadOptions={(input, callback)=>{::this.getOptions(input, callback)}}
                                autosize={false}
                                onChange={::this.handleChange}
                                />
                                <FormControl.Feedback />
                                </FormGroup>
                            </form>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <Button onClick={::this.handleSubmit}><i className="fa  fa-save fa-fw"></i></Button>
                                    <Button onClick={::this.undoValue}><i className="fa fa-undo fa-fw"></i></Button>
                                    <Button onClick={::this.switchEditMode}><i className="fa fa-window-close-o" /></Button>
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



export default PointerField;
