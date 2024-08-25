import React from "react";
import { StyleSheet, View } from "react-native";

export default function Card(props) {

    const width = parseInt(props.width) || 300;
    return (
        <View style={[styles.card, { width: width }]}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: "rgba(255, 255, 255, 0.65)",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#111",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 15,
    },
}); 