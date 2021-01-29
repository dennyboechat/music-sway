import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { ImageBackground, StyleSheet } from 'react-native';

const SettingsScreen = props => {

    const { settings, setSettings } = props;

    return (
        <Layout style={{ flex: 1 }}>
            <ImageBackground
                style={[props.style, styles.header]}
                source={require('../assets/icon.png')}
            />
            <Text>{settings.theme}</Text>
        </Layout>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 128,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default SettingsScreen;