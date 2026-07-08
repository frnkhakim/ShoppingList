import React from 'react';
import { View, StyleSheet, Modal, Text, Button, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import Title from "../components/Title";
import ShoppingInput from "../components/ShoppingInput";
import ShoppingList from "../components/ShoppingList";
import { useShoppingList } from "../hooks/useShoppingList";
import { useState, useMemo } from "react";
import type { ShoppingItem } from "../types/ShoppingItem";
import { useTheme } from "../context/ThemeContext";

/*
================================================================================
LESSON 30: Organizing Derived State with useMemo
================================================================================

KEY CONCEPTS:

1. MEMOIZATION: Caching computation results to avoid recalculation
   - "Memo" = short for memorization
   - React doesn't automatically remember calculated values
   - Without useMemo, calculations run on EVERY render

2. EXPENSIVE CALCULATIONS: Operations that take time/resources
   - Array filtering (.filter())
   - Array mapping (.map())
   - String operations (.toLowerCase(), .includes())
   - Object creation

3. DEPENDENCY ARRAYS: Tell React when to recalculate
   - useMemo only recalculates when dependencies change
   - Empty [] = memoize once, never recalculate
   - [a, b, c] = recalculate only if a, b, or c changes

4. WHEN TO USE useMemo:
   ✅ DO USE for:
      - Expensive array operations (filter, map, sort)
      - Complex object creation
      - When rendering many items
      - Search/filter logic
   
   ❌ DON'T USE for:
      - Simple calculations (a + b)
      - Single primitives
      - If dependency array is almost everything
      - Premature optimization (measure first!)

5. PERFORMANCE IMPACT:
   - Without useMemo: Recalculate counts on EVERY state change
   - With useMemo: Only recalculate when actual data changes
   - Example: Typing in search → only filteredItems updates, not all counts

REAL WORLD EXAMPLE:
When you type 1 letter in search → React re-renders
Without useMemo → ALL counts recalculate (wasteful!)
With useMemo → Only search-related values recalculate (efficient!)

VISUAL PERFORMANCE COMPARISON:

WITHOUT useMemo (inefficient ❌):
┌─ User types 'a' in search ─────────────────────┐
│ Render 1: recalculate filteredItems            │
│ Render 1: recalculate all counts                │
│ Render 1: recalculate search.toLowerCase()     │
│ Render 1: recalculate hasActiveSearch          │
│                                                 │
│ Render 2: recalculate all counts (again!)      │
│ Render 2: recalculate search.toLowerCase()     │
│ Render 2: recalculate hasActiveSearch          │
│ Total: MANY unnecessary recalculations ❌      │
└─────────────────────────────────────────────────┘

WITH useMemo (efficient ✅):
┌─ User types 'a' in search ─────────────────────┐
│ Render 1: recalculate filteredItems (needed)   │
│ Render 1: counts MEMOIZED (no calc)            │
│ Render 1: search.toLowerCase() MEMOIZED        │
│                                                 │
│ Render 2: filteredItems from CACHE             │
│ Render 2: counts from CACHE                    │
│ Render 2: search.toLowerCase() from CACHE      │
│ Total: MINIMAL recalculation ✅               │
└─────────────────────────────────────────────────┘

HOW TO ENABLE PERFORMANCE MONITORING:
Uncomment the console.log statements to see when React recalculates:
- Line 28: 'Recalculating filteredItems...'
- Line 51: 'Recalculating counts...'
- Line 64: 'Memoizing search term...'
- Line 70: 'Checking if search is active...'

Try editing an item without changing search → counts don't recalculate!

================================================================================
*/

export default function HomeScreen() {

    const { colors } = useTheme();

    const {
        shoppingItems,
        addItem,
        deleteItem,
        updateItem,
        toggleComplete,
    } = useShoppingList();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
    const [editText, setEditText] = useState("");
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [searchText, setSearchText] = useState("");

    // LESSON 30: Deriving and Memoizing Calculated Values
    // =====================================================
    
    // Step 1: Memoize the main filtered items
    // This prevents recalculation when unrelated state changes
    const filteredItems = useMemo(() => {
        // console.log('🔄 Recalculating filteredItems...')
        return shoppingItems
            .filter(item => {
                if (filter === 'active') return !item.completed;
                if (filter === 'completed') return item.completed;
                return true;
            })
            .filter(item => {
                if (!searchText.trim()) return true;
                return item.name.toLowerCase().includes(searchText.toLowerCase());
            });
    }, [shoppingItems, filter, searchText]);

    // Step 2: Memoize individual counts
    // Instead of recalculating these every render, they only update when items change
    const counts = useMemo(() => {
        // console.log('📊 Recalculating counts...')
        const allCount = shoppingItems.length;
        const activeCount = shoppingItems.filter(i => !i.completed).length;
        const completedCount = shoppingItems.filter(i => i.completed).length;
        const activeSearchCount = filteredItems.filter(i => !i.completed).length;
        const completedSearchCount = filteredItems.filter(i => i.completed).length;

        return {
            allCount,
            activeCount,
            completedCount,
            activeSearchCount,
            completedSearchCount,
        };
    }, [shoppingItems, filteredItems]);

    // Step 3: Memoize search-related computations
    // This prevents text operations on every render
    const searchLowercase = useMemo(() => {
        // console.log('🔍 Memoizing search term...')
        return searchText.toLowerCase();
    }, [searchText]);

    const hasActiveSearch = useMemo(() => {
        // console.log('✓ Checking if search is active...')
        return searchText.trim().length > 0;
    }, [searchText]);

    const closeModal = () => {
        setIsModalVisible(false);
        setEditingItem(null);
        setEditText("");
    };

    const openEditModal = (item: ShoppingItem) => {
        setEditingItem(item);
        setEditText(item.name);
        setIsModalVisible(true);
    };

    const saveEdit = () => {
        if (editingItem && editText.trim()) {
            updateItem(editingItem.id, editText.trim());
        }
        closeModal();
    };

    // CLEAR FUNCTIONS
    // ===============
    const clearAll = () => {
        Alert.alert(
            'Clear All Items',
            'Are you sure you want to delete all items?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear All', style: 'destructive', onPress: () => shoppingItems.forEach(item => deleteItem(item.id)) },
            ]
        );
    };

    const clearActive = () => {
        Alert.alert(
            'Clear Active Items',
            'Are you sure you want to delete all active (incomplete) items?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear Active', style: 'destructive', onPress: () => shoppingItems.filter(item => !item.completed).forEach(item => deleteItem(item.id)) },
            ]
        );
    };

    const clearCompleted = () => {
        Alert.alert(
            'Clear Done Items',
            'Are you sure you want to delete all completed items?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear Done', style: 'destructive', onPress: () => shoppingItems.filter(item => item.completed).forEach(item => deleteItem(item.id)) },
            ]
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: 20 }}>
            <Title text="My Shopping List" />

            <View style={{ paddingHorizontal: 12, paddingVertical: 12, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border }}>
                <TextInput
                    style={{ borderWidth: 1, borderColor: colors.borderLight, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10, fontSize: 16, backgroundColor: colors.inputBg, color: colors.text }}
                    placeholder="🔍 Search items..."
                    placeholderTextColor={colors.textMuted}
                    value={searchText}
                    onChangeText={setSearchText}
                    clearButtonMode="while-editing"
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, paddingHorizontal: 10, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border }}>
                <Pressable
                    style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: filter === 'all' ? colors.accent : colors.filterButtonBg }}
                    onPress={() => setFilter('all')}
                >
                    <Text style={{ fontSize: 12, fontWeight: filter === 'all' ? '600' : '500', color: filter === 'all' ? 'white' : colors.textSecondary }}>
                        All ({counts.allCount}{hasActiveSearch && ` / ${filteredItems.length}`})
                    </Text>
                </Pressable>
                <Pressable
                    style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: filter === 'active' ? colors.accent : colors.filterButtonBg }}
                    onPress={() => setFilter('active')}
                >
                    <Text style={{ fontSize: 12, fontWeight: filter === 'active' ? '600' : '500', color: filter === 'active' ? 'white' : colors.textSecondary }}>
                        Active ({counts.activeCount}{hasActiveSearch && ` / ${counts.activeSearchCount}`})
                    </Text>
                </Pressable>
                <Pressable
                    style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: filter === 'completed' ? colors.accent : colors.filterButtonBg }}
                    onPress={() => setFilter('completed')}
                >
                    <Text style={{ fontSize: 12, fontWeight: filter === 'completed' ? '600' : '500', color: filter === 'completed' ? 'white' : colors.textSecondary }}>
                        Done ({counts.completedCount}{hasActiveSearch && ` / ${counts.completedSearchCount}`})
                    </Text>
                </Pressable>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 8, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border, gap: 8 }}>
                <Pressable
                    style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, alignItems: 'center', backgroundColor: colors.clearDanger }}
                    onPress={clearAll}
                    disabled={counts.allCount === 0}
                >
                    <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text }}>🗑️ Clear All</Text>
                </Pressable>
                <Pressable
                    style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, alignItems: 'center', backgroundColor: colors.clearWarning }}
                    onPress={clearActive}
                    disabled={counts.activeCount === 0}
                >
                    <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text }}>✓ Clear Active</Text>
                </Pressable>
                <Pressable
                    style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, alignItems: 'center', backgroundColor: colors.clearWarning }}
                    onPress={clearCompleted}
                    disabled={counts.completedCount === 0}
                >
                    <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text }}>✕ Clear Done</Text>
                </Pressable>
            </View>

            <ShoppingInput
                onAddItem={addItem}
            />
            <ShoppingList
                items={filteredItems}
                onEdit={openEditModal}
                onDelete={deleteItem}
                onToggle={toggleComplete}
            />
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ margin: 20, backgroundColor: colors.modalBg, borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, width: '80%' }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: colors.text }}>Edit Item</Text>
                        <TextInput
                            style={{ borderWidth: 2, borderColor: colors.accent, padding: 12, marginBottom: 20, width: '100%', borderRadius: 8, fontSize: 16, color: colors.text, backgroundColor: colors.inputBg }}
                            value={editText}
                            onChangeText={setEditText}
                            placeholder="Edit item name"
                            placeholderTextColor={colors.textMuted}
                        />
                        <View style={{ width: '100%', marginBottom: 12, borderRadius: 8, overflow: 'hidden' }}>
                            <Button title="Save" onPress={saveEdit} color="#4CAF50" />
                        </View>
                        <View style={{ width: '100%', marginBottom: 12, borderRadius: 8, overflow: 'hidden' }}>
                            <Button title="Cancel" onPress={closeModal} color="#f44336" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
