import { Pressable, Text, View } from "react-native";
import type { ShoppingItem } from "../types/ShoppingItem";
import { useTheme } from "../context/ThemeContext";

interface ShoppingItemProps extends ShoppingItem {
    onDelete: (id: string) => void;
    onEdit: () => void;
    onToggle: (id: string) => void;
}

export default function ShoppingItem({ id, name, completed, onDelete, onEdit, onToggle }: ShoppingItemProps) {
    const { colors } = useTheme();

    return (
        <View style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            width: '100%',
            backgroundColor: completed ? colors.itemCompletedBg : colors.itemBg,
            borderRadius: 8,
            marginBottom: 8,
            marginHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
            opacity: completed ? 0.7 : 1,
        }}>
            <Pressable onPress={() => onToggle(id)} style={{ paddingRight: 12 }}>
                <Text style={{ fontSize: 20 }}>{completed ? '☑️' : '☐'}</Text>
            </Pressable>

            <Text style={{
                flex: 1,
                fontSize: 16,
                color: completed ? colors.textMuted : colors.text,
                fontWeight: completed ? '400' : '500',
                textDecorationLine: completed ? 'line-through' : 'none',
            }}>
                {name}
            </Text>

            <Pressable onPress={onEdit}>
                <Text style={{ fontSize: 18, marginHorizontal: 8 }}>✏️</Text>
            </Pressable>

            <Pressable onPress={() => onDelete(id)}>
                <Text style={{ fontSize: 18, marginHorizontal: 8 }}>🗑️</Text>
            </Pressable>
        </View>
    );
}
