
import { Chip } from 'react-native-paper';
import { styles } from '../../styles/components.styles';
import { PRIMARY_COLOR } from '../../styles/constant';

export default function MyChipSelector({ icon, title, id, onPressed }) {
    return (
        <Chip
            icon={icon}
            style={styles.chipButton}
            selectedColor={PRIMARY_COLOR}

            onPress={() => onPressed(id)}>{title}</Chip>
    );
}

