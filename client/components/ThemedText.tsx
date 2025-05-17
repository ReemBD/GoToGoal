import { Text } from "@react-navigation/elements"
import { TextProps } from "react-native"

const ThemedText = ({ children, style, ...rest }: TextProps) => {
    return <Text style={[
        { color: '#fff' },
        style
    ]}>
        {children}
    </Text>
}

export default ThemedText