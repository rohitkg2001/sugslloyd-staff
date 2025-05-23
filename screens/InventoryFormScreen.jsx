import { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyPickerInput from "../components/input/MyPickerInput";
import MyButton from "../components/buttons/MyButton";
import {
  updateInventory,
  addInventory,
} from "../redux/actions/inventoryAction";
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
  const [unit, setUnit] = useState(editItem?.unit || "");
  const [description, setDescription] = useState(editItem?.description || "");
  const [releaseDate, setReleaseDate] = useState(editItem?.releaseDate || "");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState("");

  const handleCancel = () => {
    navigation.goBack();
  };

  // const handleSaveProduct = () => {
  //   const updatedProduct = {
  //     id: editItem?.id || Date.now().toString(),
  //     name: productName,
  //     description: brand,
  //     quantity: parseInt(quantity) || 0,
  //     url: editItem?.url || "https://via.placeholder.com/60",
  //     releaseDate,
  //   };
  //   dispatch(updateInventory(updatedProduct));
  //   navigation.goBack();
  // };

  // Modify handleSaveProduct function

  const handleSaveProduct = () => {
    const updatedProduct = {
      id: editItem?.id || Date.now().toString(),
      name: productName,
      description: brand,
      quantity: parseInt(quantity) || 0,
      unit,
      releaseDate,
    };

    if (editItem) {
      dispatch(updateInventory(updatedProduct));
    } else {
      dispatch(addInventory(updatedProduct)); // Dispatch ADD_INVENTORY action
    }

    navigation.goBack();
  };
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
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
        <MyPickerInput
          title={t("Category")}
          selectedValue={category}
          onValueChange={(value) => {
            setCategory(value);
          }}
        />
        <MyPickerInput
          title={t("Sub category")}
          selectedValue={subCategory}
          onValueChange={setSubCategory}
          disabled={subCategories.length === 0}
        />
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
          title={t("unit")}
          onChangeText={setUnit}
          placeholder={t("ent_unit")}
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <MyTextInput
            title={t("release_date")}
            value={date.toLocaleDateString()}
            placeholder="Select Date"
            editable={false}
          />
        </TouchableOpacity>

        <MyTextInput
          title={t("description")}
          value={description}
          onChangeText={setDescription}
          placeholder="Description here"
          style={{ height: 100, padding: 10 }}
        />
      </ScrollView>

      <View style={[styles.row, { width: SCREEN_WIDTH - 20 }]}>
        <MyButton title={t("cancel")} onPress={handleCancel} color="#DC4C64" />
        <MyButton
          title={editItem ? "Save Changes" : "Add Product"}
          onPress={handleSaveProduct}
        />
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </ContainerComponent>
  );
};

export default InventoryFormScreen;
