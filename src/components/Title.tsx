import { Text, View, Pressable } from "react-native";
import { useTheme } from "../context/ThemeContext";

type TitleProps = {
  text: string;
};

export default function Title({ text }: TitleProps) {
  const { isDark, colors, toggleTheme } = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8 }}>
      <Text style={{ fontSize: 38, fontWeight: 'bold', color: colors.text }}>{text}</Text>
      <Pressable
        onPress={toggleTheme}
        style={{ padding: 8, borderRadius: 20, backgroundColor: colors.filterButtonBg }}
      >
        <Text style={{ fontSize: 20 }}>{isDark ? '☀️' : '🌙'}</Text>
      </Pressable>
    </View>
  );
}
