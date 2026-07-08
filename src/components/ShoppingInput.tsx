interface ShoppingInputProps {
    onAddItem: (item: string) => void;
}

import { View, TextInput, Pressable, Text, Keyboard } from "react-native";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function ShoppingInput({ onAddItem }: ShoppingInputProps) {
    const [item, setItem] = useState("");
    const { colors } = useTheme();

    return (
        <View style={{
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            marginBottom: 20,
            flexDirection: "row",
            gap: 10,
            backgroundColor: colors.surface,
        }}>
            <TextInput
                style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.borderLight,
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    backgroundColor: colors.inputBg,
                    color: colors.text,
                }}
                placeholder="Enter an item"
                placeholderTextColor={colors.textMuted}
                value={item}
                onChangeText={setItem}
            />
            <Pressable
                style={({ pressed }) => ({
                    backgroundColor: pressed ? colors.accentPressed : colors.accent,
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 8,
                })}
                onPress={() => {
                    if (item.trim()) {
                        onAddItem(item);
                        setItem("");
                        Keyboard.dismiss();
                    }
                }}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>Add</Text>
            </Pressable>
        </View>
    );
}
