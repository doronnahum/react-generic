//import
    import React from 'react';
    import ReactTable from 'react-table';
    import {Row,Col} from 'react-bootstrap';
    import {Field} from '../FieldWithEdit';
//




class GenericForm extends React.Component {

    constructor() {
        super();
        this.state = {}
        this.isPrintReactTable = false;
         this.selectedRow = null;

    }

    getFieldWidth(fieldsConfiguration , name , defaultConfiguration ,type ){
        let defaultWidth = defaultConfiguration ? (defaultConfiguration.fieldsWidth || 200 ) : 200;
        if(defaultConfiguration && defaultConfiguration.fieldsWidthByName && defaultConfiguration.fieldsWidthByName[name] ) {return defaultConfiguration.fieldsWidthByName[name] }
        if(defaultConfiguration && defaultConfiguration.fieldsWidthByType && defaultConfiguration.fieldsWidthByType[type] ) {return defaultConfiguration.fieldsWidthByType[type] }
        let fieldConfig = fieldsConfiguration?  fieldsConfiguration[name] ? fieldsConfiguration[name] : '' : '';
        if(fieldConfig && fieldConfig.width) {return fieldConfig.width }
        return defaultWidth
    }

    getFieldConfig(fieldsConfiguration,name){
        if(fieldsConfiguration && fieldsConfiguration[name]){return fieldsConfiguration[name] }
        return null
    }

    buildColumns(schema,handleSubmitFromField,fieldsConfiguration,defaultConfiguration,handlePointerClick,getPointerOptions,data){
        let columns = [];
        //console.log('render2',defaultConfiguration)
        
        schema.forEach((field , i)=>{
            let row =  data ? data[0] : {};
            let value = row ? row[field.name] : null;
            columns.push(
                <div className="fieldRow" key={i}> 
                <div className="fieldLabel">{field.name}</div>
                <Field key={i} row={row} value={value} type={field.type} name={field.name} 
                handleSubmit={handleSubmitFromField} config={this.getFieldConfig(fieldsConfiguration,field.name)} 
                defaultConfiguration={defaultConfiguration} 
                handlePointerClick={handlePointerClick}
                getPointerOptions={getPointerOptions}
                field={field}
                />
                </div>
            )
        })
        return columns
    } 

    shouldComponentUpdate (nextProps, nextState) {
         if(this.isPrintReactTable && this.dataClassName == nextState.dataClassName ){
             return false
         }
         else{
             return true
         }
    }
    


    printForm(data,dataClassName,fields,countResults,handleSubmitFromField,fieldsConfiguration,defaultConfiguration,handlePointerClick,getPointerOptions,defaultPageSize,loading,onRowSelectd){
        this.isPrintReactTable = true;
        this.dataClassName = dataClassName;
        let rowId = defaultConfiguration ? defaultConfiguration[rowId] ? defaultConfiguration[rowId] : 'objectId' :'objectId';
        return (
            <div>{this.buildColumns(fields,handleSubmitFromField,fieldsConfiguration,defaultConfiguration,handlePointerClick,getPointerOptions,data)}</div>
        )
    }
    
    getonlyShowField(fields,defaultConfiguration){
        if(defaultConfiguration && defaultConfiguration.fieldToHide && fields ){
            let filterField = []
            let fieldToHide = defaultConfiguration.fieldToHide
            fields.forEach(obj=>{
                if(fieldToHide.indexOf(obj.name) == -1){
                    filterField.push(obj)
                }
            }) 
            return filterField;
        }
        return fields
    }

    render() {

        let {data,dataClassName,fields,countResults,handleSubmitFromField,fieldsConfiguration,defaultConfiguration,handlePointerClick,getPointerOptions,defaultPageSize,loading,onRowSelectd} = this.props
        //console.log('GenericForm, data',data)
        //console.log('GenericForm, dataClassName',dataClassName)
        //console.log('GenericForm, fields',fields)
        //console.log('GenericForm, countResults',countResults)
         let onlyShowField = this.getonlyShowField(fields,defaultConfiguration)
        return (
            <Row className="GenericForm">
                <Col lg={12}>
                    {::this.printForm(data,dataClassName,onlyShowField,countResults,handleSubmitFromField,fieldsConfiguration,defaultConfiguration,handlePointerClick,getPointerOptions,defaultPageSize,loading,onRowSelectd)}
                </Col>
            </Row>
        );
    }

    
}

export default GenericForm;
