import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class Button extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.container}>
                <Text>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
});
