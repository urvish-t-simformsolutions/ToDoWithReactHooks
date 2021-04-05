import React, {useEffect} from 'react';
import {View, FlatList, Text, useColorScheme} from 'react-native';
import {ApplicationStyles, DarkTheme, LightTheme} from '../../theme';
import styles from './Styles/ToDosStyles';
import {CustomButton} from '../../components';
import {Strings} from '../../constants';
import {connect, useSelector} from 'react-redux';
import {getTodos, deleteTodo} from '../../redux/actions';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const RenderButton = ({navigation}) => (
  <CustomButton
    theme={Strings.primary}
    title={Strings.addTodo}
    containerStyle={styles.fullButton}
    onClick={() => navigation.navigate('AddEditTodoScreen')}
  />
);

const RenderItem = ({
  item,
  todoItems,
  // navigation,
  deleteTodoItem,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.row}>
      <Text style={styles.rowText}>{item}</Text>
      <View style={styles.buttonsBg}>
        <CustomButton
          theme={Strings.secondary}
          title={Strings.edit}
          containerStyle={styles.editButton}
          onClick={() =>
            navigation.navigate('AddEditTodoScreen', {
              todoValue: item,
              editMode: true,
            })
          }
        />
        <CustomButton
          theme={Strings.secondary}
          title={Strings.delete}
          containerStyle={styles.deleteButton}
          onClick={() => dispatch(deleteTodo(item, todoItems))}
        />
      </View>
    </View>
  );
};

const TodoList = ({navigation, getTodoItems, deleteTodoItem, todoItems}) => {
  const dispatch = useDispatch();
  const {todos} = useSelector((state) => state.todos);
  const colorScheme = useColorScheme();

  const appStyles =
    colorScheme === 'dark'
      ? ApplicationStyles(DarkTheme)
      : ApplicationStyles(LightTheme);
  useEffect(() => {
    dispatch(getTodos);
  }, [dispatch]);

  return (
    <View style={appStyles.container}>
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <RenderItem
            item={item}
            todoItems={todoItems}
            //   navigation={navigation}
            deleteTodoItem={deleteTodoItem}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => <RenderButton navigation={navigation} />}
      />
    </View>
  );
};

// const mapStateToProps = (state) => {
//   console.log('state', state);
//   return {
//     todoItems: state.todos.todos,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // getTodoItems: () => {
//     //   dispatch(getTodos);
//     // },
//     deleteTodoItem: (item, todoItems) => {
//       dispatch(deleteTodo(item, todoItems));
//     },
//   };
// };

export default TodoList;
