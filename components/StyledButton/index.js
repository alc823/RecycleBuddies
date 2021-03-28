import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import styles from './style';

const StyledButton = (props) => {
    return (
        <View>
            <Pressable
                style={styles.button}
                onPress={() => {
                    console.warn('Settings') //Route
                }}
            >
                
                <Image
                    style={styles.imageButton}
                    source={require('./settings-Icon.png')}
                />
            </Pressable>

            <Pressable
                style={styles.button1}
                onPress={() => {
                    console.warn('Submitted') //Route
                }}
            >
                
                <Text style={styles.text1}>Submit</Text>
            </Pressable>

            <Pressable
                style={styles.button2}
                onPress={() => {
                    console.warn('More Info') //Route
                }}
            >
                
                <Text style={styles.text2}>More Info</Text>
            </Pressable>

            
        </View>

        
    );
};

export default StyledButton;