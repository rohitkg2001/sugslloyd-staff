import React, { useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from "@expo/vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import { styles } from "../styles/components.styles";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Filter from "../components/filters";
import Button from "../components/buttons/Button";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import { viewInventory, searchInventory, countInventory } from '../redux/actions/inventoryAction';

const InventoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { filteredInventory, searchText, count } = useSelector(state => state.inventory);
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  useEffect(() => {
    dispatch(countInventory());
  }, [dispatch]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleSearch = (text) => {
    dispatch(searchInventory(text));
  };

  const handleViewItem = (item) => {
    dispatch(viewInventory(item));
    navigation.navigate("InventoryDetailScreen", { item });
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
          title={`Stock Management (${count})`}
          isBack={true}
          hasIcon={true}
          icon={"ellipsis-vertical"}
          onIconPress={toggleMenu}
        />

        <MyFlatList
          data={filteredInventory}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleViewItem(item)}>
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
            <SearchBar
              placeholder="Enter item name, brand or product code"
              value={searchText}
              onChangeText={handleSearch}
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