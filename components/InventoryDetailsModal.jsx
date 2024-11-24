import React from "react";
import { View, Image } from "react-native";
import ModalPopup from "./ModalPopup";
import { P, Span } from "./text";
import { layouts } from "../styles";

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
        Site Name: {selectedItem.location}, Dist:{selectedItem.dist}{" "}
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

        <Span style={[{ marginLeft: "auto" }]}>View Details</Span>
      </View>
    </ModalPopup>
  );
}
