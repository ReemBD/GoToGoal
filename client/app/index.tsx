import Chat from "@/components/Chat";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1c1c1d',
      }}
    >
      <Chat />
    </View>
  );
}
