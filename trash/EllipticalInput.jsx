import { TextInput } from 'react-native'
import { styles, PRIMARY_COLOR, spacing, layouts } from '../../styles'


export default function EllipticalInput({ placeholder, value, onChangeText }) {
    return (
        <TextInput
            style={[styles.border, styles.bgPrimaryTransParent, spacing.pl5, layouts.flex1, spacing.mh1, spacing.br4, { height: 48, fontSize: 16 }]}
            placeholder={placeholder}
            value={value}
            cursorColor={PRIMARY_COLOR}
            onChangeText={onChangeText}
            multiline={true}
        />
    )
}