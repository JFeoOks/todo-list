import React, {useEffect, useState, useContext} from 'react'
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native'
import {AddTodo} from '../components/AddTodo';
import {Todo} from '../components/Todo';
import {THEME} from "../theme";
import {TodoContext} from "../context/todo/TodoContext";
import {ScreenContext} from "../context/screen/screenContext";

export const MainScreen = () => {

    const {addTodo, removeTodo, todos} = useContext(TodoContext);
    const {changeScreen} = useContext(ScreenContext)

    const [deviceWidth, setDeviceWidth] =
        useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

    useEffect(() => {
        const update = () => {
            const newWidth = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
            setDeviceWidth(newWidth)
        };
        Dimensions.addEventListener('change', update)

        return () => {
            Dimensions.removeEventListener('change', update)
        }
    });

    let content =
        <View style={{width: deviceWidth}}>
            <FlatList
                keyExtractor={(item => item.id)}
                data={todos}
                renderItem={
                    ({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/>
                }
            />
        </View>;

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