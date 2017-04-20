//import
    import React from 'react';
    import ReactTable from 'react-table';
    import {Row,Col} from 'react-bootstrap';
    import {Field} from '../FieldWithEdit';
//




class GenericTable extends React.Component {

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

    buildColumns(schema,handleSubmitFromField,fieldsConfiguration,defaultConfiguration,handlePointerClick,getPointerOptions){
        let columns = [];
        //console.log('render2',defaultConfiguration)
        schema.forEach((field , i)=>{
            columns.push({
                id : field.name,
                header: field.name,
                minWidth: this.getFieldWidth(fieldsConfiguration , field.name , defaultConfiguration , field.type ),
                accessor: field.name,
                //render: props => Field(props,i,props.row,props.value,field.type,field.name,handleSubmitFromField,this.getFieldConfig(fieldsConfiguration,field.name),defaultConfiguration,handlePointerClick,getPointerOptions,field)
                render: props => <Field key={i} row={props.row} value={props.value} type={field.type} name={field.name} 
                handleSubmit={handleSubmitFromField} config={this.getFieldConfig(fieldsConfiguration,field.name)} 
                defaultConfiguration={defaultConfiguration} 
                handlePointerClick={handlePointerClick}
                getPointerOptions={getPointerOptions}
                field={field}
                /> // Custom cell components!
            })
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
    


    printReactTable(data,dataClassName,fields,countResults,handleSubmitFromField,fieldsConfiguration,defaultConfiguration,handlePointerClick,getPointerOptions,defaultPageSize,loading,onRowSelectd){
        this.isPrintReactTable = true;
        this.dataClassName = dataClassName;
        let rowId = defaultConfiguration ? defaultConfiguration[rowId] ? defaultConfiguration[rowId] : 'objectId' :'objectId';
        return (<ReactTable 
        defaultPageSize={defaultPageSize} 
        showFilters={false}
        loading={loading}
        //defaultFilterMethod={(filter) => (//console.log('filter',filter)) }
        getTrProps={(state, rowInfo, column,instance) => { //On Row Click
                 let row = rowInfo.row;
                 return {
                     style: {
                         backgroundColor: row[rowId] == this.state.selectedRow ? '#303030' : 'initial'
                     },
                onClick: e => {
                    let row = rowInfo.row;
                    if(!row){return}
                    if(row[rowId] ==  this.state.selectedRow){
                        this.setState({selectedRow : null})
                        if(onRowSelectd){onRowSelectd(null)}

                    }
                    else{
                        this.setState({selectedRow : row[rowId]})
                        if(onRowSelectd){onRowSelectd(row)}
                    }

                }
            }
        }}
        data={data} columns={::this.buildColumns(fields,handleSubmitFromField,fieldsConfiguration,defaultConfiguration,handlePointerClick,getPointerOptions)} />)
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
        //console.log('GenericTable, data',data)
        //console.log('GenericTable, dataClassName',dataClassName)
        //console.log('GenericTable, fields',fields)
        //console.log('GenericTable, countResults',countResults)
        let onlyShowField = this.getonlyShowField(fields,defaultConfiguration)
        return (
            <Row className="GenericTable">
                <Col lg={12}>
                    {::this.printReactTable(data,dataClassName,onlyShowField,countResults,handleSubmitFromField,fieldsConfiguration,defaultConfiguration,handlePointerClick,getPointerOptions,defaultPageSize,loading,onRowSelectd)}
                </Col>
            </Row>
        );
    }

    
}

export default GenericTable;
