interface ShoppingInputProps {
    onAddItem: (item: string) => void;
}

import { View, TextInput, Button, StyleSheet } from "react-native";
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
            <Button
             
                title="Add"
                onPress={() => {
                    if (item.trim()) {
                        onAddItem(item);
                        setItem("");
                    }
                }}
            />
        </View>
    );
}