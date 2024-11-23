import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useDispatch } from 'react-redux';
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import { updateInventory } from '../redux/actions/inventoryAction';

const InventoryFormScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const editItem = route.params?.item;
  const [productName, setProductName] = useState(editItem?.name || "");
  const [brand, setBrand] = useState(editItem?.description || "");
  const [quantity, setQuantity] = useState(editItem?.quantity?.toString() || "");
  const [releaseDate, setReleaseDate] = useState(editItem?.releaseDate || "");

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSaveProduct = () => {
    const updatedProduct = {
      id: editItem?.id || Date.now().toString(),
      name: productName,
      description: brand,
      quantity: parseInt(quantity) || 0,
      url: editItem?.url || 'https://via.placeholder.com/60',
      releaseDate
    };
    dispatch(updateInventory(updatedProduct));
    navigation.goBack();
  };

  return (
    <ContainerComponent>
      <ScrollView
        contentContainerStyle={[spacing.mh1, { width: SCREEN_WIDTH - 20 }]}
      >
        <MyHeader title={editItem ? "Edit Product" : "Add Product"} hasIcon={true} isBack={true} />

        <MyTextInput
          title="Product Name"
          value={productName}
          onChangeText={setProductName}
          placeholder="Enter Product Name"
        />

        <MyTextInput
          title="Brand"
          value={brand}
          onChangeText={setBrand}
          placeholder="Enter Brand"
        />

        <MyTextInput
          title="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Enter Quantity"
          keyboardType="numeric"
        />

        <MyTextInput
          title="Release Date"
          value={releaseDate}
          onChangeText={setReleaseDate}
          placeholder="Enter Release Date (YYYY-MM-DD)"
        />
      </ScrollView>

      <View style={[styles.row, { width: SCREEN_WIDTH - 20 }]}>
        <MyButton title="Cancel" onPress={handleCancel} color="#DC4C64" />
        <MyButton title={editItem ? "Save Changes" : "Add Product"} onPress={handleSaveProduct} />
      </View>
    </ContainerComponent>
  );
};

export default InventoryFormScreen;