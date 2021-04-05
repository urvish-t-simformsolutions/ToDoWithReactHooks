import {StyleSheet} from 'react-native';
import Colors from './Colors';

const ApplicationStyles = ({colors}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.container,
    },
  });

export default ApplicationStyles;
