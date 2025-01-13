import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H5 } from "../components/text";
import { spacing, typography } from "../styles";
import { useTranslation } from "react-i18next";

const InventoryDetailsScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { selectedItem } = route.params;
  const [Item, setItem] = useState({
    product_name: "",
    brand: "",
    unit: "",
    intalQuantity: "",
    quantityStock: "",
    category: "",
    sub_category: "",
  });

  return (
    <ContainerComponent>
      <MyHeader
        title={t("inventory_details")}
        isBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView stickyHeaderIndices={[1]}>
        <View>
          <View style={[styles.row]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>
              Product Name
            </H5>
            <P style={[typography.font16, spacing.pv1, { textAlign: "right" }]}>
              {selectedItem.product_name}
            </P>
          </View>

          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>Brand</H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {selectedItem.brand}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>Unit</H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {selectedItem.unit}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>
              Intal Quantity
            </H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {selectedItem.intalQuantity}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>
              Quantity Stock
            </H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {selectedItem.quantityStock}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>Category</H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {selectedItem.category}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5 style={[typography.font16, { textAlign: "left" }]}>
              Sub Category
            </H5>
            <P style={[typography.font16, { textAlign: "right" }]}>
              {selectedItem.sub_category}
            </P>
          </View>
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default InventoryDetailsScreen;
