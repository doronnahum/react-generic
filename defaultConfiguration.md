        this.defaultConfiguration = {
            fieldsWidth: 200,
            //disabledEditable : true,
            fieldsWidthByType: {
                'Date': 150,
                'Pointer': 150,
            },
            fieldsWidthByName: { //Name Is Stronger
                'objectId': 80
            },
            //onArrayDisableOnlyUniqueIsAuto : true
            setPointerTitleByPointerName: {
                Categories: 'name'
            },
            rowId: 'objectId', //default is objectId,
            disableEditInline: true, //Default is true
            disableEditInlineByType: {
                'Date': true,
            },
            fieldToHide: ['ACL']

        }