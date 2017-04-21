# react-generic
With react-generic you can print quickly a -<br />
1. GenericField- Input Field With Edit Mode InLine/Popup for numbers of fields Type: <br />
    1.1 String - With Validate.<br />
    1.2 Number- With Validate.<br />
    1.3 Array- With Validate, Tags Mode, JSON Mode, autocomplete.<br />
    1.4 Date- Select Date From Calendar .<br />
    1.5 Pointer- Get Data To Drop Down From API.<br />
    1.6 Telephone - With Auto autocomplete , flagsImage.<br />
Each field with OnSave CallBack.
2.GenericTable- - Pass Data props + Schema Props and get beautiful react-table with all field in EditMode by One Click<br />
3.GenericForm - Pass Data props + Schema Props and get beautiful Form with all field in EditMode by One Click<br />

How To Start
----------------------------------------------------------------------------------------------------------------------------------<br />
1. install with npm, run in the command line: npm install generic-table --save<br />
2. import The package to your page:  import {GenericTable , GenericForm , Field } from 'react-generic';  <br />
3. import the Style.css to your app.css: @import '~react-generic/style.css';<br />

pictures:
![alt tag](https://raw.githubusercontent.com/doronnahum/react-generic/pic/table.JPG)

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

| Props                                                                                                                                               | Type                                    | Default value |                                                                                                                                       |
|-----------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Row                                                                                                                                                 | Object                                  |               |                                                                                                                                       |
| Value                                                                                                                                               | String ,Array, Pointer, Boolean ,Number | String        |                                                                                                                                       |
| Name                                                                                                                                                | String                                  |               |                                                                                                                                       |
| handleSubmit                                                                                                                                        | function                                |               | On Save button click this function run with object of data:                                                                           |
|                                                                                                                                                     |                                         |               | {name: 'fieldName',                                                                                                                   |
|                                                                                                                                                     |                                         |               | objectId: 'objectId',                                                                                                                 |
|                                                                                                                                                     |                                         |               | Value: 'the new value',                                                                                                               |
|                                                                                                                                                     |                                         |               | oldValue: 'oldValue ',                                                                                                                |
|                                                                                                                                                     |                                         |               | row :'Row Data'                                                                                                                       |
|                                                                                                                                                     |                                         |               | }                                                                                                                                     |
| config                                                                                                                                              | object                                  |               | The options for each type are different, look at Field Configuration by type , this is the place to set specific option for the field |
| defaultConfiguration                                                                                                                                | object                                  |               | Use this for config your all field by type                                                                                            |
| handlePointerClick                                                                                                                                  | function                                |               | When user click on the pointer button this function run with pointer value                                                            |
| getPointerOptions                                                                                                                                   | function                                |               | When user open the pointer drop down this function need to return call back like this:                                                |
|                                                                                                                                                     |                                         |               | return   callback(null, {                                                                                                             |
|                                                                                                                                                     |                                         |               | options: [                                                                                                                            |
|                                                                                                                                                     |                                         |               | { value:{__type :"Pointer",className: dataClassName,objectId: obj.objectId}                                                           |
|                                                                                                                                                     |                                         |               | label: 'the text that show in the drop box'                                                                                           |
|                                                                                                                                                     |                                         |               | }                                                                                                                                     |
|                                                                                                                                                     |                                         |               | ],                                                                                                                                    |
|                                                                                                                                                     |                                         |               | complete: true                                                                                                                        |
|                                                                                                                                                     |                                         |               | });                                                                                                                                   |
|                                                                                                                                                     |                                         |               |                                                                                                                                       |
| Field(the schema object of this field, for pointer is require, from this object the pointer take the 'targetClass' value for the pointers options ) | object                                  |               | {name:"pointerfieldsName",                                                                                                            |
|                                                                                                                                                     |                                         |               | targetClass:"Categories",                                                                                                             |
|                                                                                                                                                     |                                         |               | type:"Pointer",                                                                                                                       |
|                                                                                                                                                     |                                         |               | }                                                                                                                                     |
|                                                                                                                                                     |                                         |               |                                                                                                                                       |

*You can use Field and Set The Type or, Use directly with the specific type by import Specific Type:
import {DateField,StringField,NumberField,TelephoneField,ArrayField,FileField,PointerField,SpecialPointer} from 'react-generic'