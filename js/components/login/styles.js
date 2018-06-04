
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 2,
    paddingLeft: 10,
    paddingRight: 10,
    bottom: 0,
  },
  buttons: {
    flexDirection: 'row',
    marginLeft: 40,
    marginRight: 40
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginRight: deviceWidth/4,
    marginTop: 20,
  },
};
