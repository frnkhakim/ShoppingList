import { Text } from "react-native";

interface ShoppingItemProps {
    item: string;
}

export default function ShoppingItem({ item }: ShoppingItemProps) {
    return (
        <Text>
            {item}
        </Text>
    );
}