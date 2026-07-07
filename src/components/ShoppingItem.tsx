import {    Pressable, Text, StyleSheet } from "react-native";

interface ShoppingItemProps {
    item: string;
    onDelete: (item: string) => void;
}
    

export default function ShoppingItem({ item, onDelete }: ShoppingItemProps) {
    return (
         <Pressable
            style={styles.item}
            onPress={() => onDelete(item)}
        >
            <Text style={styles.text}>
                {item}
            </Text>
        </Pressable>
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
    },
    text: {
    fontSize: 18,
    }
});
