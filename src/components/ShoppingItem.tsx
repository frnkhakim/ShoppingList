import { Text, StyleSheet } from "react-native";

interface ShoppingItemProps {
    item: string;
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

export default function ShoppingItem({ item }: ShoppingItemProps) {
    return (
        <Text style={styles.item}>
            <Text style={styles.text}>
                {item}
            </Text>
        </Text>
    );
}