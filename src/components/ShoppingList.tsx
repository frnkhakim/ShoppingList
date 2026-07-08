interface ShoppingListProps {
    items: { id: string; name: string; completed: boolean }[];
    onDelete: (id: string) => void;
    onEdit: (item: { id: string; name: string; completed: boolean }) => void;
    onToggle: (id: string) => void;
}

import { View, Text } from "react-native";
import ShoppingItem from "./ShoppingItem";
import { FlatList } from "react-native";
import { useShoppingList } from "../hooks/useShoppingList";

export default function ShoppingList({
    items,
    onDelete,
    onEdit,
    onToggle
}: ShoppingListProps) {

    console.log(items);

    return (
       <FlatList
            style={{ flex: 1 }}
            data={items}
            renderItem={({ item }) => <ShoppingItem {...item} onDelete={onDelete} onEdit={() => onEdit(item)} onToggle={onToggle} />}
            keyExtractor={(item) => item.id}
        />
    );
}