import {    Pressable, Text, StyleSheet, View } from "react-native";
import type { ShoppingItem } from "../types/ShoppingItem";
import { useShoppingList } from "../hooks/useShoppingList";
interface ShoppingItemProps extends ShoppingItem {
    onDelete: (id: string) => void;
    onEdit: (item: ShoppingItem) => void;
}
    

export default function ShoppingItem({ id, name, onDelete, onEdit }: ShoppingItemProps) {
    const item = { id, name };

    return (
         <View style={styles.item}>

    <Text>
        {name}
    </Text>

    <Pressable onPress={() => onEdit(item)}>
    <Text>Edit</Text>
</Pressable>

    <Pressable onPress={() => onDelete(id)}>
        <Text style={styles.deleteText}>
            🗑️
        </Text>
    </Pressable>

</View>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        backgroundColor: "#f2f2f2",
        borderRadius: 8,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
    fontSize: 18,
    },
    deleteText: {
    fontSize: 20,
    }
});
