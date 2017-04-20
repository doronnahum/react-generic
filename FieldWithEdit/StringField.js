//import
    import React from 'react';
    import {Form,FormGroup,HelpBlock,ControlLabel,ButtonToolbar,
     Button,ButtonGroup,FormControl,
    OverlayTrigger} from 'react-bootstrap';
    import Draggable from 'react-draggable';

//


class StringField extends React.Component {

    constructor() {
        super();
        this.state =  {
            editMode: false,
            value: ''
        };
    }


    

    componentWillMount () {
        this.setState({ value: this.props.data.value })
    }

    handleSubmit(){
        let data = this.props.data
        let objectToSend = {
            value : this.state.value,
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
        this.setState({ value: e.target.value })
    } 

    getValidationState(config){
        const length = this.state.value.length;
        let validConfig = config? config.validation : ''
        if(!validConfig  || (!validConfig.minLength && !validConfig.maxLength ) ){
            return 'success'
        }
        else{
            let min = validConfig.minLength;
            let max = validConfig.maxLength;
            if(min && max){
                if(length > min && length < max){return 'success' } 
                else if(length < min || length > max){return 'warning' } 
                else if(length == 0 ){return 'error'}
            }
            else if(min && !max){
                if(length > min){return 'success' }
                else if(length < min ){return 'warning' }
                else if(length == 0 ){return 'error'}
            }
            else if(!min && max){
                if(length < max){return 'success' }
                else if(length > max ){return 'warning' }
                else if(length == 0 ){return 'error'}
            }
        }
    }
    checkMinMaxlength(config,type){
        const length = this.state.value.length;
        let validConfig = config? config.validation : ''
        if(!validConfig  || (!validConfig.minLength && !validConfig.maxLength ) ){
            return true
        }
        else{
            let min = validConfig.minLength;
            let max = validConfig.maxLength;
            if(type == 'min' && min){
                if(length > min){return true } 
                return false
            }
            if(type == 'max' && max){
                if(length < max){return true } 
                return false
            }
            return true
        }
    }

    getLabel(config){
        //console.log('config1',config)
        if(config && config.label){
            return <ControlLabel>{config.label}</ControlLabel>
        }
        return null
    }
    getHelpBlock(config , type){
        let validConfig = config? config.validation : '';
        if(!validConfig){return null}
        else{
         let elements = [] 
           let minLengthMsg = validConfig.minLength ? validConfig.minLengthMsg ? validConfig.minLengthMsg : `The minimum character is ${validConfig.minLength} ` : '';
           let maxLengthMsg = validConfig.maxLength ? validConfig.maxLengthMsg ? validConfig.maxLengthMsg : `The maximum character is ${validConfig.maxLength} ` : '';
           if(type == 'min' && minLengthMsg && this.getValidationState(config) != 'success' && !this.checkMinMaxlength(config,'min')  ){elements.push(<HelpBlock key={1}>{minLengthMsg}</HelpBlock>)}
           if(type == 'max' && maxLengthMsg && this.getValidationState(config) != 'success' && !this.checkMinMaxlength(config,'max')  ){elements.push(<HelpBlock key={2}>{maxLengthMsg}</HelpBlock>)}
           return elements;
        }
    }

        undoValue(){
            this.setState({ value: this.props.data.value })
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
        let type = this.props.type
        let defaultConfiguration = this.props.defaultConfiguration
        let editInLine = this.checkEditStyleConfig(defaultConfiguration , config ,type);
        return (
            <div>
            {/*Not Edit Mode*/}
            {(!editMode || !editInLine ) && <span>{value}</span>}
            {/*editable show button*/}
            {(editable && !editMode ) && <span className=" glyphicon glyphicon-edit  pointer floatRight editPencil" onClick={::this.switchEditMode}></span>}
            {/*Edit Mode*/}
            {editMode && 
                <Draggable disabled={editInLine}>
                    <div className={"Array " + (editInLine ? 'inLineEdit' : 'popoverEdit')} style={{ left: this.left, top: this.top }}>
                        <div className="wrapper">
                            <form>
                                <FormGroup
                                controlId={`${this.props.data.objectId}>${this.props.data.name}`}
                                validationState={this.getValidationState(config)}
                                >
                                {::this.getLabel(config)}
                                <FormControl
                                    type="text"
                                    value={this.state.value}
                                    placeholder={this.props.placeholder}
                                    onChange={::this.handleChange}
                                />
                                <FormControl.Feedback />
                                {(!this.checkMinMaxlength(config,'min') ) &&   ::this.getHelpBlock(config,'min')}
                                {(!this.checkMinMaxlength(config,'max') ) &&   ::this.getHelpBlock(config,'max')}
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



export default StringField;
