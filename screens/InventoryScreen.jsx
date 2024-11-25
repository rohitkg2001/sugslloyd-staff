import { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { inventoryData } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import { inventoryData, project, totalsitesData } from "../utils/faker";
import InventoryCard from "../components/card/InventoryCard";
import NoRecord from "./NoRecord";
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

const InventoryScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
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
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title={t("stock_mng")}
          isBack={true}
          hasIcon={true}
          icon={"ellipsis-vertical"}
          onIconPress={toggleMenu}
        />

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
          ListEmptyComponent={() => <NoRecord msg={t("no_inv")} />}
          ListHeaderComponent={() => (
            <SearchBar
              value={searchText}
              onChangeText={setSearchText}
            />
          )}
        />

        <Button
          style={styles.addButton}
          onPress={() => navigation.navigate("inventoryFormScreen")}
        >
          <Ionicons name="add" size={32} color="white" />
        </Button>

        <Filter
          visible={isMenuVisible}
          onClose={toggleMenu}
          options={menuOptions}
        />
      </View>
    </ContainerComponent>
  );
};

export default InventoryScreen;
