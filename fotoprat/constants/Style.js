import { StyleSheet, Dimensions } from 'react-native';

import Colors from './Colors.js';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({

  // CONTAINERS

  container: {
    flex: 1,
    height: '100%'
  },

  headerContainer: {
    flex: 1,
    width: '100%',
  },

  onboardingContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: Colors.orangeColor
  },

  roundButtonContainer: {
    alignItems: 'center',
    position: 'relative',
    bottom: 30,
  },

  rectButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30
  },

  camContainer: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
},

  captureButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20
  },

  modalContainer: {
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    flexDirection: 'row'
  },

  transparentModalContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.whiteColor,
    opacity: .8,
    alignItems: 'center',
    justifyContent: 'center'
  },

  // BUTTON STYLES

  cameraButton: {
    backgroundColor: Colors.orangeColor,
    height: 109,
    width: 109,
    borderRadius: 50,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignItems: 'center'
  },

  roundButton: {
    backgroundColor: Colors.orangeColor,
    borderRadius: 50,
    height: 63,
    width: 63,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignItems: 'center',
    paddingTop: 13,
    paddingLeft: 5
  },
  roundPause: {
    backgroundColor: Colors.orangeColor,
    borderRadius: 50,
    height: 63,
    width: 63,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignItems: 'center',
    paddingTop: 13,
    paddingLeft: 2
  },

  rectangularButton: {
    width: 147,
    height: 36,
    marginTop: 20,
    borderRadius: 5,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },

  buttonText: {
    textAlign: 'center',
    paddingTop: '6%',
    color: Colors.whiteColor,
    fontWeight: 'bold'
  },

  smallCircle: {
    backgroundColor: 'white',
    width: 45,
    height: 45,
    borderRadius: 50,
    position: 'relative',
    bottom: 4,
    right: 2
  },

  // TEXT

  whiteText: {
    color: 'white',
    paddingBottom: 5
  },

  recordText: {
    position: 'absolute',
    top: 20,
    left: 80,
    fontSize: 16
  },

  registerText: {
    textAlign: 'center',
    color: Colors.whiteColor,
    fontWeight: 'bold'
  },

  errorText: {
    color: 'red',
    padding: 5,
    fontStyle: 'italic'
  },

  // ETC

  divider: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignSelf: 'center',
    marginBottom: 20
  },

  verticalDivider: {
    height: 400,
    width: 2,
    backgroundColor: Colors.whiteColor,
    marginBottom: 10
  },

  onboardInput: {
    height: 40,
    width: '90%',
    borderBottomColor: Colors.darkOrangeColor,
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginVertical: 20,
    color: Colors.whiteColor
  },

});