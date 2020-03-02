import React, {useState} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {THEME} from "../theme";
import {AppCard} from "../components/ui/AppCard";
import {EditModal} from "../components/ui/EditModal";

export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {

    const [model, setModal] = useState(false);

    const saveHandler = title => {
        onSave(todo.id, title);
        setModal(false)
    };

    return (
        <View>
            <EditModal
                value={todo.title}
                visible={model}
                onCancel={() => setModal(false)}
                onSave={saveHandler}
            />
            <AppCard style={styles.card}>
                <Text style={styles.title}>{todo.title}</Text>
                <Button title="Ред." onPress={() => setModal(true)}/>
            </AppCard>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button title="Назад" onPress={goBack} color={THEME.GREY_COLOR}/>
                </View>
                <View style={styles.button}>
                    <Button
                        title="Удалить"
                        color={THEME.DANGER_COLOR}
                        onPress={() => {
                            onRemove(todo.id)
                        }}
                    />
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
        width: "40%"
    },
    title: {
        fontSize: 20
    },
    card: {
        marginBottom: 20,
        padding: 15
    }
});
