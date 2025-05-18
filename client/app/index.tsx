import Chat from "@/components/Chat";
import ThemedView from "@/components/ThemedView";

export default function Index() {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Chat />
    </ThemedView>
  );
}
