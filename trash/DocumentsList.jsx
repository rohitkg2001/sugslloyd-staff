import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { H5, H4 } from "../components/text";
import { styles } from "../styles/components.styles";
import MyFlatList from "./utility/MyFlatList";

const DocumentsList = ({ documentData }) => {
  return (
    <MyFlatList
      data={documentData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.documentRow}>
          <Icon name={item.icon} size={24} color="#2b87b0" />
          <H4 style={styles.documentName}>{item.name}</H4>
          <Icon name="download" size={24} color="#54B4D3" />
        </TouchableOpacity>
      )}
    />
  );
};

export default DocumentsList;
