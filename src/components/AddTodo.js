import React, {useState} from "react";
import {Alert, StyleSheet, TextInput, View, Keyboard} from "react-native";

import {THEME} from "../theme";
import {AppButton} from "./ui/AppButton";

export const AddTodo = ({onSubmit}) => {
  const [value, setValue] = useState("");

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Название дела не может быть пустым");
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Введите названия дела..."
        autoCorrect={false}
        autoCapitalize="none"
      />
      <AppButton  onPress={pressHandler}>
        Добавить
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  input: {
    width: "60%",
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR
  }
});
