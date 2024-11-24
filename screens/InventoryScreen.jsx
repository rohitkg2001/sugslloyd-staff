import { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { inventoryData } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, ICON_LARGE, ICON_MEDIUM, LIGHT, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Filter from "../components/filters";
import Button from "../components/buttons/Button";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";

const InventoryScreen = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const menuOptions = [
    { label: "Search", onPress: () => console.log("Search clicked") },
    { label: "Sort", onPress: () => console.log("Sort clicked") },
    { label: "Filter", onPress: () => console.log("Filter clicked") },
  ];

  return (
    <ContainerComponent>

      <MyHeader title="Stock Management" isBack={true} hasIcon={true} />

      <MyFlatList
        data={inventoryData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image
              source={{ uri: item.url }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                marginRight: 16,
              }}
            />
            <View style={{ flex: 1 }}>
              <H5>{item.name}</H5>
              <P>{item.description}</P>
              <View style={styles.quantityContainer}>
                <P style={styles.productQuantity}>Qty: {item.quantity}</P>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => <NoRecord msg="Oops! No inventory" />}
        ListHeaderComponent={() => (
          <View style={[spacing.mv4, styles.row, spacing.mh1, { alignItems: "center" }]}>
            <SearchBar style={{ width: SCREEN_WIDTH - 70 }} />
            <Button
              style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
            >
              <Ionicons name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
            </Button>
          </View>
        )}
      />

      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("inventoryFormScreen")}
      >
        <Ionicons name="add" size={ICON_LARGE} color="white" />
      </Button>

    </ContainerComponent>
  );
};

export default InventoryScreen;
