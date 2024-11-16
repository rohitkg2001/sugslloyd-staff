import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { data } from "../utils/faker";
import { styles } from "../styles/components.styles";
import { H4, H5 } from "./text";
import ContainerComponent from "./ContainerComponent";
import { SCREEN_WIDTH, WARNING_COLOR } from "../styles/constant";

export default function CardGrid() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.iconCard}>
      <Ionicons name={item.icon} size={40} color={WARNING_COLOR} style={styles.iconCardIcon} />
      <H5 style={styles.iconCardText}>{item.title}</H5>
    </TouchableOpacity>
  )

  return (
    <ContainerComponent>
      <View style={styles.row}>
        <H4 style={styles.headerText}>Explore</H4>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>All</Text>
          <Ionicons name="chevron-down-outline" size={16} color="#333" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ justifyContent: 'space-between', width: SCREEN_WIDTH, marginRight: 200 }}
        numColumns={3}
      />
    </ContainerComponent>
  );
}
