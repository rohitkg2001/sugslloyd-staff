import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";

const InventoryFormScreen = () => {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const handleCancel = () => {
    setProductName("");
    setBrand("");
    setQuantity("");
    setReleaseDate("");
  };

  const handleAddProduct = () => {
    console.log("Adding Product with data:", {
      productName,
      brand,
      quantity,
      releaseDate,
    });
  };

  return (
    <ContainerComponent>
      <ScrollView
        contentContainerStyle={[spacing.mh1, { width: SCREEN_WIDTH - 20 }]}
      >
        <MyHeader title="Add Product" hasIcon={true} isBack={true} />

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
        <MyButton title="Add Product" onPress={handleAddProduct} />
      </View>
    </ContainerComponent>
  );
};

export default InventoryFormScreen;
