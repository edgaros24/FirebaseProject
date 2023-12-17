import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  bigTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  smallButton: {
    backgroundColor: 'black',
    marginBottom: 10,
    width: 160,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  smallButtonText: {
    fontSize: 16,
    color: 'white',
  },
  adDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  verticalSpace: {
    marginVertical: 5,
  },
  input: {
    fontSize: 16,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});