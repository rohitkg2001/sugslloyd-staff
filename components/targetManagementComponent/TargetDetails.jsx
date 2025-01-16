import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { styles, spacing, typography } from "../../styles";
import { H4, H5, H6, P, Span } from "../text";

const TargetDetails = ({ target, setShowVendorSelection }) => {
  return (
    <View style={[spacing.ph2, spacing.mb5, { backgroundColor: "white" }]}>
      <H5
        style={{
          textAlign: "right",
          textTransform: "uppercase",
        }}
      >
        {target.activity}
      </H5>
      <H4 style={[spacing.mv2, typography.font18]}>{target.site?.site_name}</H4>
      <H4 style={[spacing.mv2, typography.font16]}>{target.site?.location}</H4>

      <View style={[spacing.mt1, styles.row, spacing.mv2]}>
        <View>
          <Span
            style={[
              typography.font12,
              { textTransform: "uppercase", color: "gray" },
            ]}
          >
            Start date
          </Span>
          <P style={[typography.font16]}>{target.start_date}</P>
        </View>
        <View>
          <Span
            style={[
              //typography.font16,
              { textTransform: "uppercase", color: "gray" },
            ]}
          >
            End date
          </Span>
          <P style={[typography.font16]}>{target.end_date}</P>
        </View>
      </View>

      <View
        style={[
          styles.row,
          spacing.mv2,
          { justifyContent: "space-between", flex: 1 },
        ]}
      >
        {/* <P>Vendor Name</P> */}
        <H5 style={[spacing.mv2, typography.font14]}>Vendor Name</H5>
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
        {/* <H6>Remarks</H6> */}
        <H5 style={[spacing.mv2, typography.font14]}>Remarks</H5>
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
