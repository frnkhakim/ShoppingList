interface ShoppingListProps {
    items: { id: string; name: string }[];
    onDelete: (id: string) => void;
}

import { View, Text } from "react-native";
import ShoppingItem from "./ShoppingItem";
import { FlatList } from "react-native";
import { useShoppingList } from "../hooks/useShoppingList";

export default function ShoppingList({
    items,
    onDelete
}: ShoppingListProps) {

    console.log(items);

    return (
       <FlatList
            data={items}
            renderItem={({ item }) => <ShoppingItem {...item} onDelete={onDelete} onEdit={() => {}} />}
            keyExtractor={(item) => item.id}
        />
    );
}