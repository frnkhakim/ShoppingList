interface ShoppingInputProps {
    onAddItem: (item: string) => void;
}

import { View, TextInput, Button } from "react-native";
import { useState } from "react";

export default function ShoppingInput({ onAddItem }: ShoppingInputProps) {
    const [item, setItem] = useState("");

    return (
        <View>
            <TextInput
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