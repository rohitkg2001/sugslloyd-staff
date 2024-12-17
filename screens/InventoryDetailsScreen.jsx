import React from "react";
import { View, ScrollView, Text } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { inventoryData } from "../utils/faker";

const InventoryDetailsScreen = ({ route }) => {
  const { item } = route.params || {};
  const renderDetailRow = (label, value) => (
    <View style={{ flexDirection: "row", paddingVertical: 8 }}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{label}:</Text>
      <Text style={{ flex: 1, textAlign: "right", fontSize: 16 }}>{value}</Text>
    </View>
  );

  return (
    <ContainerComponent>
      <MyHeader title="Inventory Details" hasIcon={true} isBack={true} />

      <ScrollView contentContainerStyle={{ padding: 8 }}>
        {inventoryData.map((item) => (
          <View key={item.id} style={{ marginBottom: 20 }}>
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
            {renderDetailRow("Category", item.category)}
            {renderDetailRow("Subcategory", item.subcategory)}
          </View>
        ))}
      </ScrollView>
    </ContainerComponent>
  );
};

export default InventoryDetailsScreen;
