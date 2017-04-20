//import
    import React from 'react';
    import {Row,Form,FormGroup,HelpBlock,ControlLabel,
     Button,ButtonGroup,FormControl,ButtonToolbar} from 'react-bootstrap';
    import qs from 'qs';
    import TagsInput from 'react-tagsinput'
    import Autosuggest from 'react-autosuggest'
    import { JsonEditor } from './react-json-edit'; //Fix bug on unique key
    import Draggable from 'react-draggable';

//


class ArrayField extends React.Component {

    constructor() {
        super();
        this.state = {
            editMode: false,
            value: []
        };

    }

    shouldComponentUpdate(nextProps, nextState) {
        //console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        return true
    }

    
    componentWillMount () {
        let string =JSON.stringify(this.props.data.value)
        let value = JSON.parse(string);
        if(value){
            this.setState({ value: value })
        }
        
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

    handleChange(tags) {
        let config = this.props.config;
        let useOnlyValueFromAutoComlete = config ? config.useOnlyValueFromAutoComlete : '';
        let autocomplete = config? config.autocomplete : []
        let tagsLength = tags.length || 0;
        if(useOnlyValueFromAutoComlete && autocomplete){
            //Work only on add tag, not remove
            let options = [];
            autocomplete.forEach(obj=>{options.push(obj.name)})
            if(tags.length > this.state.value.length ){
                if(options.indexOf(tags[tagsLength - 1] ) == -1 ){
                    this.setState({ value: this.state.value })
                }
                else{
                    this.setState({ value: tags })
                }
            }
            else{
                this.setState({ value: tags })
            }

        }
        else{
           this.setState({ value: tags })
        }
    } 

    getValidationState(config){
        const length = this.state.value.length;
        let validConfig = config? config.validation : ''
        if(!validConfig  || (!validConfig.minItems && !validConfig.maxItems ) ){
            return 'success'
        }
        else{
            let min = validConfig.minItems;
            let max = validConfig.maxItems;
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
    checkMinmaxItems(config,type){
        const length = this.state.value.length;
        let validConfig = config? config.validation : ''
        if(!validConfig  || (!validConfig.minItems && !validConfig.maxItems ) ){
            return true
        }
        else{
            let min = validConfig.minItems;
            let max = validConfig.maxItems;
            if(type == 'min' && min){
                if(length >= min){return true } 
                return false
            }
            if(type == 'max' && max){
                if(length <= max){return true } 
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
           let minItemsMsg = validConfig.minItems ? validConfig.minItemsMsg ? validConfig.minItemsMsg : `The minimum items is ${validConfig.minItems} ` : '';
           let maxItemsMsg = validConfig.maxItems ? validConfig.maxItemsMsg ? validConfig.maxItemsMsg : `The maximum items is ${validConfig.maxItems} ` : '';
           if(type == 'min' && minItemsMsg && this.getValidationState(config) != 'success' && !this.checkMinmaxItems(config,'min')  ){elements.push(<HelpBlock key={1}>{minItemsMsg}</HelpBlock>)}
           if(type == 'max' && maxItemsMsg && this.getValidationState(config) != 'success' && !this.checkMinmaxItems(config,'max')  ){elements.push(<HelpBlock key={2}>{maxItemsMsg}</HelpBlock>)}
           return elements;
        }
    }

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

    returnOnlyUnique(defaultConfiguration = {},config ={}){
        if(defaultConfiguration && defaultConfiguration['onArrayDisableOnlyUniqueIsAuto']){return true}
        else if(config && config['disableOnlyUnique']){return true}
        return false
    }
    
    //Return flase if array contain obj or array
        IsBasicArray(value){
            let status = true;
            if(!value){return status}
            if(value && value.length > 0){
                value.forEach(val =>{
                    let type = typeof val;
                    //console.log('type',type)
                    if( !(type == 'string' || type == 'number'  || type == 'boolean'  || type == 'undefined') ){
                        status = false;
                    }
                })
            }
            return status;
        }
    
    undoValue(){
        this.handleChange(this.props.data.value)
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
        let value = this.props.data.value || [];
        //console.log('look for string, is array?',this.IsBasicArray(value), value)
        let editable = this.props.editable || false;
        let editMode = this.state.editMode || false;
        let config = this.props.config;
        let disableOnlyUnique = this.returnOnlyUnique(this.props.defaultConfiguration,config)
        let placeholder = config ? config.placeholder : 'add a tags..'
        let validationRegex = config? config.validation? config.validation.validationRegex ? config.validation.validationRegex : /.*/ : /.*/ :/.*/ ;
        let autocompleteOptions = config ? config.autocomplete : [];
        let type = this.props.type
        let defaultConfiguration = this.props.defaultConfiguration
        let editInLine = this.checkEditStyleConfig(defaultConfiguration , config ,type);

    function autocompleteRenderInput ({addTag, ...props}) {
      const handleOnChange = (e, {newValue, method}) => {
        if (method === 'enter') {
          e.preventDefault()
        } else {
          props.onChange(e)
        }
      }

      const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
      const inputLength = inputValue.length

      let suggestions = autocompleteOptions.filter((state) => {
        return state.name.toLowerCase().slice(0, inputLength) === inputValue
      })

      //let isBasicArray = this.IsBasicArray(value) || false ;
      //let isBasicArray = false;
      return (
        <Autosuggest
          ref={props.ref}
          suggestions={suggestions}
          shouldRenderSuggestions={(value) => value && value.trim().length > 0}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
          inputProps={{...props, onChange: handleOnChange}}
          onSuggestionSelected={(e, {suggestion}) => {
            addTag(suggestion.name)
          }}
          onSuggestionsClearRequested={() => {}}
          onSuggestionsFetchRequested={() => {}}
        />
      )
    }

        return (
            <div>
            {/*Not Edit Mode*/}
            {(!editMode || !editInLine ) && <span>{::this.printStringFromArray(value)}</span>}
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
                                            {(this.IsBasicArray(value) && !this.state.useJsonEditor) &&
                                        <div className="tagsEditorStyle">
                                            <TagsInput renderInput={autocompleteRenderInput} validationRegex={validationRegex} inputProps={{ placeholder }} value={this.state.value} onChange={::this.handleChange} onlyUnique={disableOnlyUnique} />
                                                <Button className="replace" onClick={() => { this.setState({ useJsonEditor: true }) }}><i className="fa fa=fw fa-file-code-o" /></Button>
                                        </div>
                                    }
                                    {(!this.IsBasicArray(value) || this.state.useJsonEditor) &&
                                        <div className="jsonEditorStyle">
                                            <JsonEditor value={this.state.value} propagateChanges={::this.handleChange}/>
                                                </div>
                                    }
                                    <FormControl.Feedback />
                                    {(!this.checkMinmaxItems(config, 'min')) &&   ::this.getHelpBlock(config,'min')}
                                            {(!this.checkMinmaxItems(config, 'max')) &&   ::this.getHelpBlock(config,'max')}
                                            </FormGroup>
                            </form>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <Button onClick={::this.handleSubmit} ><i className="fa  fa-save fa-fw"></i></Button>
                                     <Button onClick={() => {::this.undoValue(value)}} ><i className="fa fa-undo fa-fw"></i></Button>
                                     <Button onClick={::this.switchEditMode} ><i className="fa fa-window-close-o"></i></Button>
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



export default ArrayField;
