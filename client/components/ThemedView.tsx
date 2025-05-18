import { useThemeColor } from "@/hooks/useThemeColor";
import { View, ViewProps } from "react-native";

const ThemedView = ({ children, style, type, ...rest }: ViewProps & { type?: 'card' }) => {

    const backgroundColor = useThemeColor({}, type === 'card' ? 'cardBackground' : 'background');

    return <View
        style={[
            { backgroundColor },
            style
        ]}
        {...rest}
    >
        {children}
    </View>
}

export default ThemedView;