
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    btn: {
        marginRight: deviceWidth/4,
        marginTop: 20,
    },
}