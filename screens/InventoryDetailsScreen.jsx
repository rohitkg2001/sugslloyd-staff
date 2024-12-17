import React from "react";
import { View, ScrollView } from "react-native";
import { typography } from "../styles";
import { H5 } from "../components/text";
import { useTranslation } from "react-i18next";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { inventoryData } from "../utils/faker";

const InventoryDetailsScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const renderDetailRow = (label, value) => (
    <View style={{ flexDirection: "row", paddingVertical: 8 }}>
      <H5 style={[typography.textBold]}>{label}</H5>
      <H5 style={[typography.font16, { textAlign: "right", flex: 1 }]}>
        {value}
      </H5>
    </View>
  );

  return (
    <ContainerComponent>
      <MyHeader title={t("Inventory Details")} hasIcon={true} isBack={true} />

      <ScrollView contentContainerStyle={{ padding: 8 }}>
        {inventoryData.map((item) => (
          <View key={item.id}>
            {renderDetailRow("Product Name", item.productName)}
            {renderDetailRow("Brand", item.brand)}
            {renderDetailRow("Description", item.description)}
            {renderDetailRow("Unit", item.unit)}
            {renderDetailRow("Initial Quantity", item.initialQuantity)}
            {renderDetailRow("Quantity in Stock", item.quantityStock)}
            {renderDetailRow(
              "Material Dispatch Date",
              item.materialDispatchDate
            )}
            {renderDetailRow("Delivery Date", item.deliveryDate)}
            {renderDetailRow("Allocation Officer", item.allocationOfficer)}
          </View>
        ))}
      </ScrollView>
    </ContainerComponent>
  );
};

export default InventoryDetailsScreen;
