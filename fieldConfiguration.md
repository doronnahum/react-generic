        this.fieldsConfiguration = {
            //String Example
            stringField : {
                width : 250,
                validation: {
                    minLength : 6,
                    minLengthMsg: 'the minimum length is 6',
                    maxLength: 20,
                    maxLengthMsg: 'the maximum length is 20',
                },
                placeHolder: 'please fill me',
                canBeEmpty : true,
                label: 'You can Set label',
                disabledEditable: true,
                disableEditInline : true
            },
            //Number Example
            numberField : {
                width : 80,
                validation: {
                    min : 14,
                    minMsg: 'The minimum number is 14',
                    max: 60,
                    maxMsg: 'The maximum number is 60',
                },
                placeHolder: 'please fill me',
                canBeEmpty : true,
                label: 'You can Set label'
            },
            //Phone(String) example - return +972-05-4323-1113(the diffrent is from the Schema or from numberField==true)
            TelephoneField:{
                type : 'Telephone',
                defaultCountry: 'il',
                //TurnOffautoFormat : true,
                //On Number Field thie TurnOffautoFormat is automat
                validation: { 
                    minLength : 13 
                },
                //numberField : true
                disableEditInline : true

            },
            //Phone(Number) example - return 0543231113 
            telephoneNumberField:{
                type : 'Telephone',
                defaultCountry: 'il',
                //TurnOffautoFormat : true,
                //On Number Field thie TurnOffautoFormat is automat
                validation: { 
                    minLength : 13 
                }
            },
            //Phone(Number) example - return 0543231113 
            arrayfield:{
                //TurnOffautoFormat : true,
                //On Number Field thie TurnOffautoFormat is automat
                disableOnlyUnique : true,
                //placeholder : 'this is a placeholder',
                autocomplete : [{abbr: 'AL', name: 'Alabama'},{abbr: 'AK', name: 'Alaska'}], //Pass any array of object, key 'name' is require
                //useOnlyValueFromAutoComlete : true, // autocomplete is require for this optionsnpm
                validation: { 
                    minItems : 2,
                    //minItemsMsg: 'sorry, minimum items is 13',
                    maxItems : 5,
                    //maxItemsMsg: 'sorry, maximum items is 13'
                    //validationRegex : /^\d+$/, //use any Regex for filter only number set /^\d+$/ 
                }
            },
            //PointerExample
            pointerfields:{
                pointerTitle : 'name' //Title to show on the field, default is objectId
            },
            //Pointer Araay Example
            pointerArrayField:{
                type: 'SpecialPointer',
                subType : 'ArrayOfTitleFromPointers', //options: ArrayOfPointers , ArrayOfTitleFromPointers , TitleFromPointers , LikePointer
                pointerTitle : 'name', //Title to show on the field, default is objectId
                targetClass :'Companies' //--Require--//
                
            },
            //Pointer Araay Example 2
            titleFromPointer:{
                type: 'SpecialPointer',
                subType : 'TitleFromPointers', //options: ArrayOfPointers , ArrayOfTitleFromPointers , TitleFromPointers , LikePointer
                pointerTitle : 'name', //Title to show on the field, default is objectId
                targetClass :'Companies' //--Require--//
                
            }
        }