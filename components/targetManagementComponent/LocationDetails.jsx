
import React from "react";
import { View } from "react-native";
import { H6 } from "../text";
import { styles, spacing } from "../../styles";

const LocationDetails = ({ target }) => {
  return (
    <>
      {target.sites?.survey_latitude && (
        <>
          <View
            style={[
              styles.row,
              spacing.mv2,
              { justifyContent: "space-between", flex: 1 },
            ]}
          >
            <H6>Survey Status</H6>
            <H6>Done</H6>
          </View>
          <View
            style={[
              styles.row,
              spacing.mv2,
              { justifyContent: "space-between", flex: 1 },
            ]}
          >
            <H6>Survey Location</H6>
            <View>
              <H6>Lat</H6>
              <H6>{target.sites?.survey_latitude}</H6>
              <H6>Long</H6>
              <H6>{target.sites?.survey_longitude}</H6>
            </View>
          </View>
        </>
      )}

      {target.sites?.actual_latitude && (
        <>
          <View
            style={[
              styles.row,
              spacing.mv2,
              { justifyContent: "space-between", flex: 1 },
            ]}
          >
            <H6>Task Status</H6>
            <H6>Submitted By Vendor</H6>
          </View>
          <View
            style={[
              styles.row,
              spacing.mv2,
              { justifyContent: "space-between", flex: 1 },
            ]}
          >
            <H6>Survey Location</H6>
            <View>
              <H6>Lat</H6>
              <H6>{target.sites?.actual_latitude}</H6>
              <H6>Long</H6>
              <H6>{target.sites?.actual_longitude}</H6>
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default LocationDetails;
