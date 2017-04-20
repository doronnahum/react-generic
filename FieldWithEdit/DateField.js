//import
    import React from 'react';
    import {Button,ButtonGroup,ButtonToolbar} from 'react-bootstrap';
    import dateformat from 'dateformat';
    import DatePicker from 'react-datepicker';
    import moment from 'moment';
    import Draggable from 'react-draggable';


//

class DateField extends React.Component {

    constructor() {
        super();
        this.state =  {
            editMode: false,
            currentDate: moment()
        };
    }
    handleChange(value){
        if(!value){
            this.setState({ currentDate:'' })
        }
        else{this.setState({ currentDate:moment(value) }) }
    }

    componentWillMount () {
        if(this.props.data.value){this.setState({ currentDate:moment(this.getDateValueFromStringAndParseObj(this.props.data.value)) })}
    }

    handleSubmit(){
        let data = this.props.data
        let objectToSend = {
            value : this.state.currentDate,
            oldValue : data.value,
            objectId : data.objectId,
            name: data.name,
            type: data.type,
            row: data.row
        }
        this.props.handleSubmit(objectToSend)
        this.setState({editMode:false})
    }

    getDateValueFromStringAndParseObj(value) {
        if (typeof value == 'string') {
            return value
        }
        else if (value && value.iso) {
            return value.iso
        }
        return null

    }

    undoValue(value){
        this.handleChange(value)
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
        let value = this.getDateValueFromStringAndParseObj(this.props.data.value)  || '';
        let format = this.props.dateformat || 'HH:MM m/d/yy';
        let editable = this.props.editable || false;
        let currentDate = this.state.currentDate
        let editMode = this.state.editMode || false;
        let config = this.props.config;
        let type = this.props.type
        let defaultConfiguration = this.props.defaultConfiguration
        let editInLine = this.checkEditStyleConfig(defaultConfiguration , config ,type);
        
        //console.log('date1', this.props)
        return (
            <div>
            {/*Not Edit Mode*/}
            {(!editMode || !editInLine ) && <span>{dateformat(value,format)}</span>}
            {/*editable show button*/}
            {(editable && !editMode ) && <span className=" glyphicon glyphicon-edit  pointer floatRight editPencil" onClick={::this.switchEditMode}></span>}
            {/*Edit Mode*/}
            {editMode && 
                <Draggable disabled={editInLine}>
                    <div className={"Array " + (editInLine ? 'inLineEdit' : 'popoverEdit')} style={{ left: this.left, top: this.top }}>
                        <div className="wrapper">
                            <DatePicker onChange={(value) => {::this.handleChange(value)}} selected={this.state.currentDate} isClearable={true}  />&nbsp;
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



export default DateField;
