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
      <H4 style={[typography.font14, typography.fontLato]}>
        {target.site?.site_name}
      </H4>
      <H4 style={[typography.font12, typography.fontLato, { marginTop: -5 }]}>
        {target.site?.location}
      </H4>
      <View style={[styles.row]}>
        <View>
          <Span
            style={[
              typography.font10,
              typography.fontLato,
              { textTransform: "uppercase", color: "gray" },
            ]}
          >
            Start date
          </Span>
          <P style={[typography.font12, typography.fontLato]}>
            {target.start_date}
          </P>
        </View>
        <View>
          <Span
            style={[
              typography.font10,
              typography.fontLato,
              { textTransform: "uppercase", color: "gray" },
            ]}
          >
            End date
          </Span>
          <P style={[typography.font12, typography.fontLato]}>
            {target.end_date}
          </P>
        </View>
      </View>
      <View
        style={[
          styles.row,
          //  spacing.mv2,
          { justifyContent: "space-between", flex: 1 },
        ]}
      >
        {/* <P>Vendor Name</P> */}
        <H5 style={[spacing.mv2, typography.font12]}>Vendor Name</H5>
        <View style={[styles.row, { alignItems: "center" }]}>
          <P style={[typography.font10, spacing.mv2 , {marginTop:3}]}>
            {!target.vendor
              ? "................................."
              : target.vendor?.name}
          </P>
          <IconButton
            style={[{marginTop: -5}]}
            onPress={() => setShowVendorSelection(true)}
            icon="pencil"
          />
        </View>
      </View>
      {/* <View
        style={[
          styles.row,
         // spacing.mv2,
          { justifyContent: "space-between", flex: 1 },
        ]}
      > */}
        {/* <H6>Remarks</H6> */}
        {/* <H5 style={[spacing.mv2, typography.font14]}>Remarks</H5>
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
      </View> */}
      
      <View
        style={[
          styles.row,
          spacing.mv2,
          { justifyContent: "space-between", flex: 1 },
        ]}
      >
        <H6>Status</H6>
        <H6
          style={{
            color: target.status === "Complete" ? "yellow" : "green",
            fontWeight: "bold",
          }}
        >
          {target.status}
        </H6>
      </View>
      <View style={[spacing.mt1, styles.row, spacing.mv2]}>
        <View>
          <Span
            style={[
              typography.font10,
              typography.fontLato,
              { textTransform: "uppercase", color: "gray" },
            ]}
          >
            Survey Latitude
          </Span>
          <P style={[typography.font12, typography.fontLato]}>
            {target.site?.survey_latitude}
          </P>
        </View>
        <View>
          <Span
            style={[
              typography.font10,
              typography.fontLato,
              { textTransform: "uppercase", color: "gray" },
            ]}
          >
            Survey Longitude
          </Span>
          <P style={[typography.font12, typography.fontLato]}>
            {target.site?.actual_latitude}
          </P>
        </View>
      </View>

      <View style={[spacing.mt1, styles.row, spacing.mv2]}>
        <View>
          <Span
            style={[
              typography.font10,
              typography.fontLato,
              { textTransform: "uppercase", color: "gray" },
            ]}
          >
            Actual Latitude
          </Span>
          <P style={[typography.font12, typography.fontLato]}>
            {target.site?.actual_latitude}
          </P>
        </View>
        <View>
          <Span
            style={[
              typography.font10,
              typography.fontLato,
              { textTransform: "uppercase", color: "gray" },
            ]}
          >
            Actual Longitude
          </Span>
          <P style={[typography.font12, typography.fontLato]}>
            {target.site?.actual_longitude}
          </P>
        </View>
      </View>
    </View>
  );
};

export default TargetDetails;
