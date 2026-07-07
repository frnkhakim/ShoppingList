interface ShoppingInputProps {
    onAddItem: (item: string) => void;
}

import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";
import { useState } from "react";
    
const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 20,
        flexDirection: "row",
        gap: 10,
    },
    input: {
     flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    },
    button: {
        backgroundColor: "#2196F3",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },  
    buttonText: {
    color: "white",
    fontWeight: "bold",
},
    buttonPressed: {
        backgroundColor: "#1976D2",
    }
});

export default function ShoppingInput({ onAddItem }: ShoppingInputProps) {
    const [item, setItem] = useState("");

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter an item"
                value={item}
                onChangeText={setItem}
            />
            <Pressable
            
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                ]}
                onPress={() => {
                    if (item.trim()) {
                        onAddItem(item);
                        setItem("");
                    }
                }}
            >
                <Text style={styles.buttonText}>Add</Text>
            </Pressable>
        </View>
    );
}