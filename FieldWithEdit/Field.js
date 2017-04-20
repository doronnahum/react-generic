//import
    import React from 'react';
    import actions from 'logic/actions';
    import { connect } from 'react-redux';
    import {Row,Col,Table,Dropdown} from 'components';
    import qs from 'qs';
    import {DateField,StringField,NumberField,TelephoneField,ArrayField,FileField,PointerField,SpecialPointer} from './index.js'
    
//



class Field extends React.Component {

    constructor() {
        super();
        // this.state = Object.assign({}, this.state, {
            
        // });
        this.value = null;

    }

    componentWillmount(){
        this.value = this.props.value;
    }

    componentWillUnmount() {
        this.isFirstRender = false;
    }
    
    shouldComponentUpdate (nextProps, nextState) {
        if(this.value != nextProps.value){
            this.value = nextProps.value;
            return true
        }
        return false
    }

    //     componentWillReceiveProps(nextProps) {
    //     //console.log('string props', nextProps)
    // }




    handleonChange(value){
        alert(value)
    }

    checkEditable(config,name,defaultConfiguration){
        if(name == 'objectId' || name == 'createdAt' || name == 'updatedAt'){return false}
        else if(defaultConfiguration && defaultConfiguration.disabledEditable){return false}
        else if(config && config[name] && config[name].disabledEditable){return false}
        return true;
    }

    parseValue(value) {
        //console.log('render1', this.props)
        this.isFirstRender = true;
        let valueType = typeof value;
        let schemaType = this.props.type
        let objectId = this.props.row.objectId;
        let name = this.props.name;
        let field = this.props.field //important for Pointer targetclass
        let config =this.props.config;
        let defaultConfiguration = this.props.defaultConfiguration;
        let handlePointerClick =this.props.handlePointerClick || null;
        let getPointerOptions =this.props.getPointerOptions || null;
        let key= `${objectId}>${name}`;
        let editable = this.checkEditable(config,name,defaultConfiguration);
        let spacificType = config ?  config.type ? config.type : '' : '' ;
        let data = {
            value : value || '',
            objectId : objectId,
            row : this.props.row,
            type : this.props.type,
            name: name
        }
        //---Formate by spacific type ---//
        if(spacificType){
            if(spacificType == 'Telephone'){
                return ( <TelephoneField key={key} data={data}  editable={editable} type={schemaType}  handleSubmit={this.props.handleSubmit} config={config} defaultConfiguration={defaultConfiguration}/>  )
            }
            if(spacificType == 'SpecialPointer'){
                return ( <SpecialPointer key={key} data={data}  editable={editable} type={schemaType}  handleSubmit={this.props.handleSubmit} config={config} handlePointerClick={handlePointerClick} getPointerOptions={getPointerOptions} defaultConfiguration={defaultConfiguration} />   )
            }
            return <StringField key={key} data={data}  editable={editable} type={schemaType}  handleSubmit={this.props.handleSubmit} config={config} defaultConfiguration={defaultConfiguration} />  
        }
        //---Formate by global type---//
        //Date formater
        if(schemaType == 'Date' ){return ( 
            <DateField  key={key} data={data} editable={editable} type={schemaType}  format={'HH:MM m/d/yy'} handleSubmit={this.props.handleSubmit} config={config}  defaultConfiguration={defaultConfiguration}/>  )}
        //String,Number,Bollean Formmater
        
        else if (schemaType === 'String' ) {return ( 
            <StringField key={key} data={data}  editable={editable}  type={schemaType} handleSubmit={this.props.handleSubmit} config={config} defaultConfiguration={defaultConfiguration} />  )}

        else if (schemaType === 'Array' ) {return ( 
            <ArrayField key={key} data={data} defaultConfiguration={defaultConfiguration} type={schemaType} editable={editable}  handleSubmit={this.props.handleSubmit} config={config} />  
            )}

        else if (schemaType == 'Number') {return ( 
            <NumberField key={`${objectId}>${name}`} data={data}  editable={editable}  type={schemaType} handleSubmit={this.props.handleSubmit} config={config} defaultConfiguration={defaultConfiguration} />  )}
        
        else if (schemaType == 'File') {return ( 
            <FileField key={`${objectId}>${name}`} data={data}  editable={editable} type={schemaType}  handleSubmit={this.props.handleSubmit} config={config} defaultConfiguration={defaultConfiguration} />  )}

        else if ( schemaType == 'boolean') {
            return value
        }
        //PointerFormatter
        else if(schemaType == 'Pointer' ){
            return (<PointerField field={field} key={key} data={data} type={schemaType}  editable={editable}  handleSubmit={this.props.handleSubmit} config={config} handlePointerClick={handlePointerClick} getPointerOptions={getPointerOptions} defaultConfiguration={defaultConfiguration} /> ) }

        //Object,Array formmater
        else if (value) {
            //console.log('schemaType',this.props.name , schemaType  )
            //if(schemaType && schemaType == 'Date' ){ return ( dateformat('2017-03-20T22:33:04.582Z' , 'HH:MM m/d/yy') ) }
            //else{return qs.stringify(value)}
            return qs.stringify(value)
        }
        //Empty cell
        return '-'
    }

    printAllData(){
        //console.log('printAllData',this.props)
    }

    render() {
        return (
            <span>{this.parseValue(this.props.value)}</span>
        )
    }
}



export default Field;

