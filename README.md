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

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

Object | Row