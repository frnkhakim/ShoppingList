import { Pressable, Text, StyleSheet, View } from "react-native";
import type { ShoppingItem } from "../types/ShoppingItem";

interface ShoppingItemProps extends ShoppingItem {
    onDelete: (id: string) => void;
    onEdit: () => void;
    onToggle: (id: string) => void;
}

export default function ShoppingItem({ id, name, completed, onDelete, onEdit, onToggle }: ShoppingItemProps) {
    return (
        <View style={[styles.item, completed && styles.itemCompleted]}>
            <Pressable onPress={() => onToggle(id)} style={styles.checkbox}>
                <Text style={styles.checkboxText}>{completed ? '☑️' : '☐'}</Text>
            </Pressable>

            <Text style={[styles.text, completed && styles.textCompleted]}>
                {name}
            </Text>

            <Pressable onPress={onEdit}>
                <Text style={styles.editText}>✏️</Text>
            </Pressable>

            <Pressable onPress={() => onDelete(id)}>
                <Text style={styles.deleteText}>🗑️</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginBottom: 8,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    itemCompleted: {
        opacity: 0.6,
        backgroundColor: '#f9f9f9',
    },
    checkbox: {
        paddingRight: 12,
    },
    checkboxText: {
        fontSize: 20,
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    textCompleted: {
        textDecorationLine: 'line-through',
        color: '#999',
        fontWeight: '400',
    },
    editText: {
        fontSize: 18,
        marginHorizontal: 8,
    },
    deleteText: {
        fontSize: 18,
        marginHorizontal: 8,
    },
});
