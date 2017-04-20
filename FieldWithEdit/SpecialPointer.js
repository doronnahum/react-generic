//import
    import React from 'react';
    import {Form,FormGroup,HelpBlock,ControlLabel,ButtonToolbar,
     Button,ButtonGroup,FormControl,
    OverlayTrigger} from 'react-bootstrap';
    import qs from 'qs';
    import Select from 'react-select';
    import Draggable from 'react-draggable';


//


class SpecialPointer extends React.Component {

    constructor() {
        super();
        this.state = {
            editMode: false,
            value: null
        };
        this.config = {};
    }


    componentWillMount () {
        let dataClassName = this.props.config.targetClass;
        let fieldName = this.props.data.name;
        let key = this.getTitleForPointer(dataClassName , fieldName) || 'objectId'; 
        //console.log('componentWillMount', this.props)
        this.setFieldConfig(this.props.config.subType)
        let valueObj ={};
        if(this.props.data.value){
            valueObj.value = this.props.data.value;
            valueObj.label =  this.props.data.value ?  this.props.data.value[key] : '';
            if(this.config.valueType == 'Pointer'){
                if(this.config.multi){
                    this.setState({ value: [valueObj]  })
                    this.defaultValue = [valueObj] 
                }
                else{
                    this.setState({ value: valueObj  })
                    this.defaultValue = valueObj 
                }
            }

        }
        

    }

    setFieldConfig(subType = 'ArrayOfPointers'){
        if(subType == 'ArrayOfPointers'){
            this.config.multi = true;
            this.config.valueType = 'Pointer'
        }
        else if(subType == 'ArrayOfTitleFromPointers'){
            this.config.multi = true;
            this.config.valueType = 'title'
        }
        else if(subType == 'TitleFromPointers'){
            this.config.multi = false;
            this.config.valueType = 'title'
        }
        else if(subType == 'LikePointer'){
            this.config.multi = false;
            this.config.valueType = 'Pointer'
        }
    }
    componentDidMount(){
        let callback = (nullValue, obj) => {
            //console.log('this.getOptions=>callback', obj)
            this.setState({options : obj.options})
        }
        if(!this.state.options){
            //console.log('this.getOptions')
            this.getOptions('input', callback)
        }
    }
    componentDidUpdate(){
        if(this.config.valueType == 'title'){
            this.setDefaultValueInTitleSubType()
        }
    }

    setDefaultValueInTitleSubType(){
        if(this.props.data.value && this.state.options && !this.state.value){
            let options = this.state.options;
            let value = this.props.data.value;
            let key = this.getTitleForPointer(this.props.config.targetClass,this.props.data.name) || 'objectId'
            if(this.config.valueType == 'title'){
                if(this.config.multi){
                    let selectedOptions = [];
                    options.forEach(obj=>{
                        if(value.indexOf(obj['label']) != -1){
                            selectedOptions.push(obj)
                        }
                    })
                    this.setState({ value: selectedOptions  })
                }
                else{
                    let selectedOptions = {};
                    options.forEach(obj=>{
                        if(value == obj['label']){
                            selectedOptions = obj
                        }
                    })
                    this.setState({ value: selectedOptions  })
                }
            }

        }
    }

    getTitlesFromPointer(){
        if(!this.state.value){return null}
        //return array of title from pointer
        if(this.config.multi){
            let arr = [];
            this.state.value.forEach(pointer=>{
                arr.push(pointer.label)
            })
            return arr
        }
        else{
            let string = this.state.value.label
            return string
        }
    }
    getPointers(){
        if(!this.state.value){return null}
        let dataClassName = this.props.config.targetClass;
        let fieldName = this.props.data.name;
        //return array of  pointer
        if(this.config.multi){
            let arr = [];
            this.state.value.forEach(pointer=>{
                let obj = {};
                obj['__type'] = "Pointer";
                obj['className'] = dataClassName;
                obj['objectId'] = pointer.value.objectId;
                arr.push(obj)
            })
            return arr
        }
        else{
                let obj = {};
                obj['__type'] = "Pointer";
                obj['className'] = dataClassName;
                obj['objectId'] = this.state.value.value.objectId;
                return obj
        }
    }


    handleSubmit(){
        let data = this.props.data
        let objectToSend = {
            value : this.config.valueType == 'title' ? this.getTitlesFromPointer() : this.getPointers(),
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
        this.setState({ value: e  })
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
        let dataClassName = this.props.config.targetClass 
        let fieldName = this.props.data.name;
        ////console.log('getOptions',this)
        this.props.getPointerOptions(input, callback,dataClassName,fieldName)
    };

    printStringFromArray(value = []){
        let string = '';
        if(!value){return ''}
        value.forEach((val , i) =>{
            let comma = i < (value.length -1) ? ',' : '';
            let type = typeof val;
            let valToString = (type == 'string' || type == 'number'  || type == 'boolean' ) ? val  : `{${qs.stringify(val)}}`
            string = string + `[ ${valToString} ] ${comma} `
        })
        return string
    }

    printFieldViewBySubType(value,config,keyToShow){
            if(!value){return '-'}
            else if(config.subType == 'LikePointer'){
                return (<Button bsStyle='default'  onClick={::this.handlePointerClick}>{value[keyToShow] || value['objectId'] }</Button>)
            }
            else if(config.subType == 'TitleFromPointers'){
                return value
            }
            else if(config.subType == 'ArrayOfPointers'){
                return value.map((obj,i)=>{
                    return (<span><Button key={i} bsStyle='default'  onClick={::this.handlePointerClick}>{obj[keyToShow] || obj['objectId'] }</Button>&nbsp;</span>)
                })
            }
            else if(config.subType == 'ArrayOfTitleFromPointers'){
                return this.printStringFromArray(value)
            }
    }
    

    undoValue(){
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

    render() {
        let value = this.props.data.value || ''; 
        let editable = this.props.editable || false;
        let editMode = this.state.editMode || false;
        let config = this.props.config;
        let getPointerOptions = this.props.getPointerOptions || null;
        let pointerKeyForTitle = this.getTitleForPointer(this.props.config.targetClass,this.props.data.name) || 'objectId'
        let type = this.props.type
        let defaultConfiguration = this.props.defaultConfiguration
        let editInLine = this.checkEditStyleConfig(defaultConfiguration , config ,type);
        //let pointerTitle = value ? value[pointerKeyForTitle] : '';

        return (
            <div>
            {/*Not Edit Mode*/}
            {(!editMode || !editInLine ) && 
            <span>
                {::this.printFieldViewBySubType(value,config,pointerKeyForTitle)}
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
                                <Select
                                name="form-field-name"
                                value={this.state.value}
                                options={this.state.options}
                                autosize={true}
                                onChange={::this.handleChange}
                                multi={this.config.multi}
                                searchable={true}
                                openOnFocus={true}
                                isLoading={!this.state.options}
                                />
                                <FormControl.Feedback />
                                </FormGroup>
                            </form>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <Button onClick={::this.handleSubmit}><i className="fa  fa-save fa-fw"></i></Button>
                                    <Button onClick={::this.undoValue}><i className="fa fa-undo fa-fw"></i></Button>
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



export default SpecialPointer;
