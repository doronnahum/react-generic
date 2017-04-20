# reactgeneric
Use it for easy field with edit mode for String, Number, Array , Date , Telephone , File UpLoad , Pointer , Array of Pointers and more, and for Fast Table/Form With edit mode InLine/PopUp

1) field - Use Field for show Input text with edit mode for different type of fields: String, Number, Object, Date, Pointer, File, and Array of Pointers 
2) GenericTable - Pass data and schema and get table with edit mode for each column  
3) GenericForm - Pass data and schema and get form with edit mode for each field  

Generic field
-----------------
Use Field for show Input text with edit mode for different type of fields: String, Number, Object, Date, Pointer, and Array of Pointers 

import {Field} from 'components';

<Field 
row={row} //All Row Data 
value={value} 
type={field.type}
name={field.name} 
handleSubmit={handleSubmitFromField} 
config={this.getFieldConfig(fieldsConfiguration,field.name)} 
defaultConfiguration={defaultConfiguration} 
handlePointerClick={handlePointerClick}
>

| Props  | Type | Default value  | explain |
| ------------- | ------------- | ------------- | ------------- |
| Row  | Object  | String  |   |
| Value  | String ,Array, Pointer, Boolean ,Number   |   |   |
| Name  | String  |   |  |
| handleSubmit  | function  |  | On Save button click this function run with object of data:
{name: 'fieldName',
objectId: 'objectId',
Value: 'the new value',
oldValue: 'oldValue ',
row :'Row Data'
}
  |
| config  | object  |  | The options for each type are different, look at Field Configuration by type , this is the place to set specific option for the field  |
| defaultConfiguration  | object  |   | Use this for config your all field by type  |
| handlePointerClick  | function  |   | When user click on the pointer button this function run with pointer value  |
| getPointerOptions  | function  |  | When user open the pointer drop down this function need to return call back like this:
              return   callback(null, {
                options: [
                { value:{__type :"Pointer",className: dataClassName,objectId: obj.objectId}
                  label: 'the text that show in the drop box'  
                }
                ],
                complete: true
            });
  |
| Field(the schema object of this field, for pointer is require, from this object the pointer take the 'targetClass' value for the pointers options )  | object  |   | {name:"pointerfieldsName",
targetClass:"Categories",
type:"Pointer",
}
  |


Object | Row