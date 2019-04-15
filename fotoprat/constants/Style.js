import { StyleSheet } from 'react-native';

import Colors from './Colors.js';

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

  roundButtonContainer: {
    alignItems: 'center',
    position: 'relative',
    bottom: 30,
  },

  rectButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },

  // BUTTON STYLES

  roundButton: {
    backgroundColor: Colors.purpleColor,
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
    backgroundColor: Colors.purpleColor,
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
    backgroundColor: Colors.purpleColor,
    width: 135,
    height: 35,
    borderRadius: 5,
    elevation: 3,
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
    paddingTop: '7%',
    color: Colors.whiteColor,
    fontWeight: 'bold'
  },

  // ETC

  divider: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignSelf: 'center',
    marginBottom: 20
  }
});