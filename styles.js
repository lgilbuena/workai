import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF9FF'
  },
  topLeftButton: {
    position: 'absolute',
    top: '3%',
    left: '3%',
    zIndex: 1,
  },
  logo:{
    top: '4%'
  },
  topRightButton: {
    position: 'absolute',
    top: '3%',
    right: '3%',
    zIndex: 1,
  },
  returnButton: {
    position: 'absolute',
    top: '3%',
    right: '3%',
    zIndex: 1,
  },
  navBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '60%',
    backgroundColor: '#343A40',
    padding: 20,
    zIndex: 1,
    paddingLeft: '10%',
    paddingRight: '5%',
    paddingTop: '5%'
  },
  navBarText: {
    color: '#ffffff',
    marginBottom: '2%',
    alignContent: 'center',
    alignSelf: 'center',
    adjustFontSizeToFit: 'true',
    
  },
  navBarItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  navBarItemLast: {
    borderBottomWidth: 0,
  },
  navBarItemText: {
    color: '#ffffff',
    textDecorationLine: 'none',
    
  },
  navBarItemTextHover: {
    backgroundColor: '#495057',
    paddingLeft: 10,
  },
  
  input:{
    width: '70%',
    height: '25%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center' 
  },
  slider:{
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: '5%',
  },
  picker:{
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: '4%',
    paddingBottom: '0%',
  },
  dropdown_picker:{
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 2
  },
  submitButton:{
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  errorText:{
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'red',
    
  },
  content_text:{
    height:'100%',
    flex: 1,
    flexWrap: 'wrap',
    fontSize: '2%',
    textAlign: 'center',
    
    overflow: 'scroll',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  content_load:{
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: '8%',
    height: '85%',
    overflow: 'scroll',
    marginBottom: '1%'
  },
});

export default styles;
