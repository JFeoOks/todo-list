import React from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import {THEME} from '../theme';
import {AppTextBold} from "./ui/AppTextBold";

export const Navbar = ({title}) => {
    return (
        <View style={{
            ...styles.navbar, ...Platform.select(
                {
                    ios: styles.navbarIOS,
                    android: styles.navbarAndroid
                }
            )
        }}>
            <AppTextBold style={styles.text}>{title}</AppTextBold>
        </View>
    )
};

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    navbarAndroid: {
        backgroundColor: THEME.MAIN_COLOR
    },
    navbarIOS: {
        backgroundColor: THEME.MAIN_COLOR,
        borderBottomWidth: 1
    },
    text: {
        color: Platform.OS==='ios'? THEME.MAIN_COLOR: 'white',
        fontSize: 20
    }
});