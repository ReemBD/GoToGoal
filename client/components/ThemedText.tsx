import { useThemeColor } from "@/hooks/useThemeColor";
import { Text } from "@react-navigation/elements";
import { TextProps } from "react-native";

const ThemedText = ({ children, style, ...rest }: TextProps) => {

    const color = useThemeColor({}, 'text');

    return <Text
        style={[
            { color },
            style
        ]}
        {...rest}>
        {children}
    </Text>
}

export default ThemedText