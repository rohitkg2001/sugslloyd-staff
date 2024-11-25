import { useState } from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import { useTranslation } from "react-i18next";


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
const { t } = useTranslation();

  return (
    <ContainerComponent>
      <ScrollView
        contentContainerStyle={[spacing.mh1, { width: SCREEN_WIDTH - 20 }]}
      >
        <MyHeader title={t("add_product")} hasIcon={true} isBack={true} />

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
        <MyButton title="Cancel" onPress={handleCancel} color="#DC4C64" />
        <MyButton title="Add Product" onPress={handleAddProduct} />
      </View>
    </ContainerComponent>
  );
};

export default InventoryFormScreen;
