        this.fieldsConfiguration = {<br />
            //String Example<br />
            stringField : {<br />
                width : 250,<br />
                validation: {<br />
                    minLength : 6,<br />
                    minLengthMsg: 'the minimum length is 6',<br />
                    maxLength: 20,<br />
                    maxLengthMsg: 'the maximum length is 20',<br />
                },<br />
                placeHolder: 'please fill me',<br />
                canBeEmpty : true,<br />
                label: 'You can Set label',<br />
                disabledEditable: true,<br />
                disableEditInline : true<br />
            },<br />
            //Number Example<br />
            numberField : {<br />
                width : 80,<br />
                validation: {<br />
                    min : 14,<br />
                    minMsg: 'The minimum number is 14',<br />
                    max: 60,<br />
                    maxMsg: 'The maximum number is 60',<br />
                },<br />
                placeHolder: 'please fill me',<br />
                canBeEmpty : true,<br />
                label: 'You can Set label'<br />
            },<br />
            //Phone(String) example - return +972-05-4323-1113(the diffrent is from the Schema or from numberField==true)<br />
            TelephoneField:{<br />
                type : 'Telephone',<br />
                defaultCountry: 'il',<br />
                //TurnOffautoFormat : true,<br />
                //On Number Field thie TurnOffautoFormat is automat<br />
                validation: { <br />
                    minLength : 13 <br />
                },<br />
                //numberField : true<br />
                disableEditInline : true<br />
<br />
            },<br />
            //Phone(Number) example - return 0543231113 <br />
            telephoneNumberField:{<br />
                type : 'Telephone',<br />
                defaultCountry: 'il',<br />
                //TurnOffautoFormat : true,<br />
                //On Number Field thie TurnOffautoFormat is automat<br />
                validation: { <br />
                    minLength : 13 <br />
                }<br />
            },<br />
            //Phone(Number) example - return 0543231113 <br />
            arrayfield:{<br />
                //TurnOffautoFormat : true,<br />
                //On Number Field thie TurnOffautoFormat is automat<br />
                disableOnlyUnique : true,<br />
                //placeholder : 'this is a placeholder',<br />
                autocomplete : [{abbr: 'AL', name: 'Alabama'},{abbr: 'AK', name: 'Alaska'}], //Pass any array of object, key 'name' is require<br />
                //useOnlyValueFromAutoComlete : true, // autocomplete is require for this optionsnpm<br />
                validation: { <br />
                    minItems : 2,<br />
                    //minItemsMsg: 'sorry, minimum items is 13',<br />
                    maxItems : 5,<br />
                    //maxItemsMsg: 'sorry, maximum items is 13'<br />
                    //validationRegex : /^\d+$/, //use any Regex for filter only number set /^\d+$/ <br />
                }<br />
            },<br />
            //PointerExample<br />
            pointerfields:{<br />
                pointerTitle : 'name' //Title to show on the field, default is objectId<br />
            },<br />
            //Pointer Araay Example<br />
            pointerArrayField:{<br />
                type: 'SpecialPointer',<br />
                subType : 'ArrayOfTitleFromPointers', //options: ArrayOfPointers , ArrayOfTitleFromPointers , TitleFromPointers , LikePointer<br />
                pointerTitle : 'name', //Title to show on the field, default is objectId<br />
                targetClass :'Companies' //--Require--//<br />
                <br />
            },<br />
            //Pointer Araay Example 2<br />
            titleFromPointer:{<br />
                type: 'SpecialPointer',<br />
                subType : 'TitleFromPointers', //options: ArrayOfPointers , ArrayOfTitleFromPointers , TitleFromPointers , LikePointer<br />
                pointerTitle : 'name', //Title to show on the field, default is objectId<br />
                targetClass :'Companies' //--Require--//<br />
                <br />
            }<br />
        }<br />