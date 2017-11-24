import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers/index.js';
import {StackNavigator} from 'react-navigation';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import Entry from './containers/Entry';
import Map from './containers/Map';

const store = createStore(allReducers, applyMiddleware(thunk));

const AppRouter = StackNavigator({
    Entry: {screen: Entry},
    Map: {screen: Map},
}, {
    headerMode: 'none',
});

const {width, height} = Dimensions.get('window');

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <AppRouter/>
                </View>
            </Provider>);
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
    },
});