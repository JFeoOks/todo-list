import React, {useState, useContext} from "react";
import {StyleSheet, View, Dimensions} from "react-native";
import {THEME} from "../theme";
import {AppCard} from "../components/ui/AppCard";
import {EditModal} from "../components/ui/EditModal";
import {AppTextBold} from "../components/ui/AppTextBold";
import {AppButton} from "../components/ui/AppButton";
import {FontAwesome, AntDesign} from "@expo/vector-icons";
import {TodoContext} from "../context/todo/TodoContext";
import {ScreenContext} from "../context/screen/screenContext";

export const TodoScreen = ({goBack}) => {

    const [model, setModal] = useState(false);
    const {todos, updateTodo, removeTodo} = useContext(TodoContext);
    const {todoId, changeScreen} = useContext(ScreenContext);

    const saveHandler = title => {
        updateTodo(todo.id, title);
        setModal(false)
    };

    const todo = todos.find(t => t.id === todoId);

    return (
        <View>
            <EditModal
                value={todo.title}
                visible={model}
                onCancel={() => setModal(false)}
                onSave={saveHandler}
            />
            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name ='edit' size={20}/>
                </AppButton>
            </AppCard>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton onPress={() => changeScreen(null)} color={THEME.GREY_COLOR}>
                        <AntDesign name='back' color="#fff" size={20} />
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton
                        color={THEME.DANGER_COLOR}
                        onPress={() => {
                            removeTodo(todo.id)
                        }}>
                        <FontAwesome name='remove' size={20} color='#fff'/>
                    </AppButton>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        width: Dimensions.get('window').width / 3
    },
    title: {
        fontSize: 20
    },
    card: {
        marginBottom: 20,
        padding: 15
    }
});
