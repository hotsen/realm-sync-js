'use strict';
var styles = require('../styles/styles');
var React = require('react-native');
var ToDoList = require('./ToDoList');
var ToDoEdit = require('./ToDoEdit');
var FileSystemTests = require('./FileSystemTests');
var RealmDbTests = require('./RealmDbTests');
var RemoteDbTests = require('./RemoteDbTests');
var { Text, View, ListView, TouchableHighlight, AlertIOS } = React;
const Realm = require('realm');


class ToDoContainer extends React.Component {
    constructor() {
        super();
          //  let realm = new Realm(
           // {
           //   schema: [{name: 'Dog', properties: {name: 'string'}}]
           // });

           // realm.write(() => {
           //   realm.create('Dog', {name: 'Rex'});
           // }
          //  );

        this.state = {
            items: [
                {txt: 'Learn react native', complete: false},
                {txt: 'Make a to-do app', complete: true}
            ],
            realmPath: Realm.defaultPath
        };
        this.alertMenu = this.alertMenu.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.openItem = this.openItem.bind(this);

    }

    alertMenu(rowData, rowID) {
        AlertIOS.alert(
            'Quick Menu',
            null,
            [
                {text: 'Delete', onPress: () => this.deleteItem(rowID)},
                {text: 'Edit', onPress: () => this.openItem(rowData, rowID)},
                {text: 'Cancel'}
            ]
        )
    }

    deleteItem(index) {
        var items = this.state.items;
        items.splice(index, 1);
        this.setState({items: items})
    }

    updateItem(item, index) {
        var items = this.state.items;
        if (index) {
            items[index] = item;
        }
        else {
            items.push(item)
        }
        this.setState({items: items});
        this.props.navigator.pop();
    }

    openItem(rowData, rowID) {
        this.props.navigator.push({
            title: rowData && rowData.txt || 'New Item',
            component: ToDoEdit,
            passProps: {item: rowData, id: rowID, update: this.updateItem}
        });
    }

    openFileSystemTests() {
        this.props.navigator.push({
            title: 'Testing File System',
            component: FileSystemTests,
            passProps: {realmPath: this.state.realmPath}
        });
    }

    openRealmDbTests() {
        this.props.navigator.push({
            title: 'Testing Realm DB',
            component: RealmDbTests,
            passProps: {realmPath: this.state.realmPath}
        });
    }

    openRemoteDbTests() {
        this.props.navigator.push({
            title: 'Testing Remote DB',
            component: RemoteDbTests,
            passProps: {realmPath: this.state.realmPath}
        });
    }

    render() {
        return (
            <View style={{flex:1}}>
                <ToDoList
                    items={this.state.items}
                    onPressItem={this.openItem}
                    onLongPressItem={this.alertMenu}/>

                <TouchableHighlight
                    style={[styles.button, styles.newButton]}
                    underlayColor='#99d9f4'
                    onPress={this.openRemoteDbTests.bind(this)}>
                    <Text style={styles.buttonText}>Test remote DB</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.button, styles.newButton]}
                    underlayColor='#99d9f4'
                    onPress={this.openRealmDbTests.bind(this)}>
                    <Text style={styles.buttonText}>Test realm DB</Text>
                </TouchableHighlight>


                <TouchableHighlight
                    style={[styles.button, styles.newButton]}
                    underlayColor='#99d9f4'
                    onPress={this.openFileSystemTests.bind(this)}>
                    <Text style={styles.buttonText}>Test filesystem</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.button, styles.newButton]}
                    underlayColor='#99d9f4'
                    onPress={this.openItem}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = ToDoContainer;