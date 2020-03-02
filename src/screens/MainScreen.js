import React from 'react'
import {FlatList, Image, StyleSheet, View} from 'react-native'
import {AddTodo} from '../components/AddTodo';
import {Todo} from '../components/Todo';

export const MainScreen = ({addTodo, todos, removeTodo, openTodo}) => {

    let content = <FlatList
        keyExtractor={(item => item.id)}
        data={todos}
        renderItem={
            ({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={openTodo}/>
        }
    />;

    if (todos.length === 0) {
        content =
            <View style={styles.imageWrap}>
                <Image style={styles.image}
                       source={require('../../assets/lifeliner.jpg')}/>
            </View>;
    }

    return (
        <View>
            <AddTodo onSubmit={addTodo}/>
            {content}
        </View>
    )
};

const styles = StyleSheet.create({

    imageWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    image: {
        width: '100%',
        height: '100%',
    }
});