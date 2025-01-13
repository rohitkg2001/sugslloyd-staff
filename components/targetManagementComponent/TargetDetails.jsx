import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { styles, spacing } from "../../styles";
import { H4, H5, H6 } from "../text";

const TargetDetails = ({ target, setShowVendorSelection }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <H5
        style={{
          textAlign: "right",
          marginRight: 20,
          textTransform: "uppercase",
        }}
      >
        {target.activity}
      </H5>
      <H4>{target.site?.site_name}</H4>
      <H6>{target.site?.location}</H6>
      <H6>
        {target.start_date} - {target.end_date}
      </H6>

      <View
        style={[
          styles.row,
          spacing.mv2,
          { justifyContent: "space-between", flex: 1 },
        ]}
      >
        <H6>Vendor Name</H6>
        <View style={[styles.row, { alignItems: "center" }]}>
          <H6>
            {!target.vendor
              ? "................................."
              : target.vendor?.name}
          </H6>
          <IconButton
            onPress={() => setShowVendorSelection(true)}
            icon="pencil"
          />
        </View>
      </View>

      <View
        style={[
          styles.row,
          spacing.mv2,
          { justifyContent: "space-between", flex: 1 },
        ]}
      >
        <H6>Remarks</H6>
        <View style={[styles.row, { alignItems: "center" }]}>
          <H6>
            {!target.description
              ? "................................."
              : target.description}
          </H6>
          <IconButton
            onPress={() => setShowVendorSelection(true)}
            icon="pencil"
          />
        </View>
      </View>

      <View
        style={[
          styles.row,
          spacing.mv2,
          { justifyContent: "space-between", flex: 1 },
        ]}
      >
        <H6>Status</H6>
        <H6>{target.status}</H6>
      </View>
    </View>
  );
};

export default TargetDetails;
