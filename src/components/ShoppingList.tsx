interface ShoppingListProps {
    items: string[];
}

import { View, Text } from "react-native";
import ShoppingItem from "./ShoppingItem";

export default function ShoppingList({
    items,
}: ShoppingListProps) {

    console.log(items);

    return (
        <View>
            {items.map((item, index) => (
                <ShoppingItem
                    key={index}
                    item={item}
                />
            ))}
        </View>
    );
}