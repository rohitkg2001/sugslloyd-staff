import React from "react";
import { View, Image } from "react-native";
import ModalPopup from "./ModalPopup";
import { P, H4 } from "./text";
import { layouts, typography } from "../styles";
import Button from "./buttons/Button";

export default function InventoryDetailsModal({
  visible,
  onClose,
  selectedItem,
}) {
  if (!selectedItem) return null;

  return (
    <ModalPopup
      visible={visible}
      close={onClose}
      negativeButton="Close"
      positiveButton="OK"
      action={null}
    >
      <P>
        {" "}
        {selectedItem.productName} Allocated for {selectedItem.projectName}{" "}
      </P>
      <P>
        {" "}
        {selectedItem.location}, {selectedItem.dist}{" "}
      </P>
      <P> Initial Quantity: {selectedItem.initialQuantity} {selectedItem.unit}</P>
      <P> Material Dispatch Date: {selectedItem.materialDispatchDate}</P>
      <P> Delivery Date: {selectedItem.deliveryDate} </P>
      <P> Allocated To : {selectedItem.allocationOfficer} </P>
      <View style={layouts.center}>
        <Image
          source={{ uri: selectedItem.url }}
          style={{
            height: 200,
            width: 200,
          }}
          resizeMode="contain"
        />

        <Button
          style={{
            marginLeft: "auto",
          }}
        //  onPress={action}
        >
          <H4
            style={[
              typography.textBold,
              typography.font16,
              typography.textPrimary,
              { textTransform: "uppercase" },
            ]}
          >
            View Details
          </H4>
        </Button>
      </View>
    </ModalPopup>
  );
}
