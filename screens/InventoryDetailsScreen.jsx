import React from "react";
import { View, ScrollView, Text } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, styles, spacing, typography } from "../styles";
import { H4, H5, H6, P } from "../components/text";

const InventoryDetailsScreen = ({ route }) => {
  const { item } = route.params || {};

  const renderDetailRow = (label, value) => (
    <View style={[styles.row, spacing.pv1, { position: "relative" }]}>
      {label !== "Subcategory" && (
        <H6
          style={[
            { textAlign: "left" },
            label === "Product Name"
              ? [typography.textBold, typography.font20]
              : { fontSize: 16 },
          ]}
        >
          {value}
        </H6>
      )}

      {label === "Subcategory" && (
        <H6
          style={[
            {
              position: "absolute",
              left: 90,
              bottom: 10,
              fontSize: 16,
            },
          ]}
        >
          | *{value}
        </H6>
      )}
    </View>
  );

  return (
    <ContainerComponent>
      <MyHeader title="Inventory Details" hasIcon={true} isBack={true} />
      <View style={{ width: SCREEN_WIDTH - 16 }}>
        <ScrollView>
          {item ? (
            <>
              {renderDetailRow("Product Name", item.productName)}
              {renderDetailRow("Category", item.category)}
              {renderDetailRow("Subcategory", item.sub_category)}

              <View>
                <H4 style={{ fontSize: 16, fontWeight: "bold" }}>
                  Initial Quantity
                </H4>
                <P style={{ fontSize: 16, textAlign: "left", color: "green" }}>
                  {item.initialQuantity}
                </P>
              </View>

              <View>
                <H4 style={{ fontSize: 16, fontWeight: "bold" }}>
                  Quantity in Stock
                </H4>

                <P style={{ fontSize: 16, textAlign: "left", color: "red" }}>
                  {item.initialQuantity}
                </P>
              </View>
            </>
          ) : (
            <Text>No item details available</Text>
          )}
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};

export default InventoryDetailsScreen;
