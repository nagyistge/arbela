Ext.define('Arbela.view.db.main.DashboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dbdashboard',

    columnIdx: 0,

    onToolbarAddcard: function(tb, btn, e, eOpts, eventOptions) {
        //TODO: move this to a common util as it is used for Datasource as well as Card/Blade
        var classes = Ext.ClassManager.classes;
        var dses = [];

        for (var key in classes) {
            if (classes.hasOwnProperty(key)) {
                if (Ext.String.startsWith(key, 'Arbela.view.blades')) {
                    var arr = key.split('.');
                    dses.push({
                        klass: key, 
                        name: arr[arr.length - 1]
                    });
                }
            }
        }

        console.log('DATA: ', dses);

        var me = this;

        if (this.columnIdx >= this.getView().getMaxColumns()) {
            this.columnIdx = 0;
        }

        Ext.create('Arbela.view.db.card.NewCard', {
            y: 0,
            typeData: dses,
            // values: data,
            listeners: {
                addcard: me.handleAddCardEvent,
                scope: me
            }
        });
    },

    handleAddCardEvent: function(win, values) {
        var me = this;

        // console.log('View Template:', values.typeObj.getViewTemplate());
        console.log('Adding to column: ' + me.columnIdx);

        var blades = values.blades;
        var l = blades.length;
        var items = [];

        //initialize the height based on showTitle value
        //36px for the card header if we need to show it
        //NOTE: this may need to be modified based on the theme being used
        var height = values.showTitle ? 36 : 0; 


        for (var i = 0; i < l; i++) {
            var vt = blades[i].typeObj; //.getViewTemplate();
            items.push(vt);
            height += vt.height;
        }

        me.getView().on('add', function(ct, cmp, idx) {
            console.log('ARGUMENTS: ', arguments);

            cmp.add(items);
            
        }, this, {single: true});

        var card = me.getView().addView({
            title: values.name,
            // header: values.showTitle ? true : false, 
            type: 'card',
            columnIndex: me.columnIdx,
            height: height,
        }, 0);

        me.columnIdx++;
    },

    onToolbarClonedashboard: function(tb, btn, e, eOpts, eventOptions) {
        alert('Clone Dashboard');
    }

});
