import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import { updateInventory } from "../redux/actions/inventoryAction";
import { useTranslation } from "react-i18next";

const InventoryFormScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const editItem = route.params?.item;
  const [productName, setProductName] = useState(editItem?.name || "");
  const [brand, setBrand] = useState(editItem?.description || "");
  const [quantity, setQuantity] = useState(
    editItem?.quantity?.toString() || ""
  );
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
      url: editItem?.url || "https://via.placeholder.com/60",
      releaseDate,
    };
    dispatch(updateInventory(updatedProduct));
    navigation.goBack();
  };

  return (
    <ContainerComponent>
      <MyHeader
        title={editItem ? "Edit Product" : "Add Product"}
        hasIcon={true}
        isBack={true}
      />
      <ScrollView
        contentContainerStyle={[spacing.mh1, { width: SCREEN_WIDTH - 20 }]}
      >
        <MyTextInput
          title={t("prod_name")}
          value={productName}
          onChangeText={setProductName}
          placeholder={t("ent_prod_name")}
        />

        <MyTextInput
          title={t("brand")}
          value={brand}
          onChangeText={setBrand}
          placeholder={t("ent_brand")}
        />

        <MyTextInput
          title={t("quantity")}
          value={quantity}
          onChangeText={setQuantity}
          placeholder={t("ent_quantity")}
          keyboardType="numeric"
        />

        <MyTextInput
          title={t("release_date")}
          value={releaseDate}
          onChangeText={setReleaseDate}
          placeholder={t("ent_release_date")}
        />
      </ScrollView>

      <View style={[styles.row, { width: SCREEN_WIDTH - 20 }]}>
        <MyButton title={t("cancel")} onPress={handleCancel} color="#DC4C64" />
        <MyButton
          title={editItem ? "Save Changes" : "Add Product"}
          onPress={handleSaveProduct}
        />
      </View>
    </ContainerComponent>
  );
};

export default InventoryFormScreen;
