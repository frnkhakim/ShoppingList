import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface AboutScreenProps {
    onBack: () => void;
}

const FEATURES = [
    { icon: "✅", title: "Track your shopping", desc: "Add items and check them off as you go." },
    { icon: "🔍", title: "Search & filter", desc: "Quickly find items or view only active or completed ones." },
    { icon: "✏️", title: "Edit on the fly", desc: "Tap the edit button to rename any item instantly." },
    { icon: "🗑️", title: "Bulk clear", desc: "Remove all items, just active ones, or just completed ones." },
    { icon: "🌙", title: "Dark mode", desc: "Easy on the eyes, day or night." },
];

export default function AboutScreen({ onBack }: AboutScreenProps) {
    const { colors } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            {/* Header */}
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 14,
                backgroundColor: colors.surface,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            }}>
                <Pressable onPress={onBack} style={{ marginRight: 12, padding: 4 }}>
                    <Text style={{ fontSize: 22, color: colors.accent }}>‹</Text>
                </Pressable>
                <Text style={{ fontSize: 18, fontWeight: "700", color: colors.text }}>About</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 24, alignItems: "center" }}>
                {/* App icon + name */}
                <Image
                    source={require("../../assets/ic_launcher.png")}
                    style={{ width: 100, height: 100, borderRadius: 22, marginBottom: 16 }}
                />
                <Text style={{ fontSize: 28, fontWeight: "800", color: colors.text, marginBottom: 4 }}>
                    My Shopping List
                </Text>
                <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: 32 }}>
                    Version 1.0.0
                </Text>

                {/* Tagline */}
                <View style={{
                    backgroundColor: colors.surface,
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 28,
                    width: "100%",
                    borderWidth: 1,
                    borderColor: colors.border,
                }}>
                    <Text style={{ fontSize: 15, color: colors.textSecondary, textAlign: "center", lineHeight: 22 }}>
                        A simple, fast shopping list that keeps you organized at the store — no fuss, no account needed.
                    </Text>
                </View>

                {/* Features */}
                <Text style={{ fontSize: 16, fontWeight: "700", color: colors.text, alignSelf: "flex-start", marginBottom: 14 }}>
                    Features
                </Text>
                {FEATURES.map((f) => (
                    <View key={f.title} style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        backgroundColor: colors.surface,
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 10,
                        width: "100%",
                        borderWidth: 1,
                        borderColor: colors.border,
                    }}>
                        <Text style={{ fontSize: 22, marginRight: 14, marginTop: 1 }}>{f.icon}</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 14, fontWeight: "700", color: colors.text, marginBottom: 2 }}>{f.title}</Text>
                            <Text style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 19 }}>{f.desc}</Text>
                        </View>
                    </View>
                ))}

                <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 24 }}>
                    Made with ❤️ using React Native & Expo
                </Text>
            </ScrollView>
        </View>
    );
}
