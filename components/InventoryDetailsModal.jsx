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
        {selectedItem.product_name} Allocated for {selectedItem.projectName}{" "}
      </P>
      <P>
        {" "}
        {selectedItem.location}, {selectedItem.dist}{" "}
      </P>
      <P> Initial Quantity: {selectedItem.initial_quantity}</P>
      <P> Material Dispatch Date: {selectedItem.material_dispatch_date}</P>
      <P> Delivery Date: {selectedItem.delivery_date} </P>
      <P> Allocated To : {selectedItem.allocation_officer} </P>
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
