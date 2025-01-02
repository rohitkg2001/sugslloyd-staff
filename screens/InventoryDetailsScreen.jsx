import React from "react";
import { View, ScrollView, Text } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, styles, spacing, typography } from "../styles";
import { H6, P, Span } from "../components/text";

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

              <View style={[spacing.mt1, styles.row, spacing.pv2]}>
                <View>
                  <Span style={[typography.font14]}>Initial Quantity</Span>
                  <P style={[typography.font16, { color: "green" }]}>
                    {" "}
                    {item.initialQuantity}
                  </P>
                </View>
                <View>
                  <Span style={[typography.font14]}>Quantity in Stock</Span>
                  <P style={[typography.font16, { color: "red" }]}>
                    {" "}
                    {item.initialQuantity}
                  </P>
                </View>
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
