import { View, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import { H2, H5, P } from "../components/text";
import Button from "../components/buttons/Button";

export default function ConveyanceDetailScreen() {
  const route = useRoute();
  const { travelItem } = route.params;
  return (
    <ContainerComponent>
      <MyHeader title={"Booking Summary"} hasIcon={true} isBack={true} />
      <ScrollView>
        <View style={[{ width: SCREEN_WIDTH - 16 }]}>
          <View
            style={[
              styles.row,
              spacing.bbw05,
              spacing.p2,
              {
                alignItems: "center",
              },
            ]}
          >
            <View style={{ alignItems: "center" }}>
              <P style={[typography.font10]}>From</P>
              <H5
                style={[
                  typography.font14,
                  typography.textBold,
                  typography.fontLato,
                ]}
              >
                {`${travelItem.pickupLocation}`}
              </H5>
            </View>
            <H5 style={{ fontSize: 24 }}>⇄</H5>
            <View style={{ alignItems: "center" }}>
              <P style={[typography.font10]}>To</P>
              <H5
                style={[
                  typography.font14,
                  typography.textBold,
                  typography.fontLato,
                ]}
              >
                {travelItem.dropoffLocation}
              </H5>
            </View>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5
              style={[
                typography.font14,
                // typography.textBold,
                typography.fontLato,
                { textAlign: "left" },
              ]}
            >
              KM
            </H5>
            <P
              style={[
                typography.text600,
                typography.font14,
                typography.fontLato,
                { textAlign: "right" },
              ]}
            >
              {travelItem.distance || "Not provided"}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2, spacing.bbw05]}>
            <H5
              style={[
                typography.font14,
                // typography.textBold,
                typography.fontLato,

                { textAlign: "left" },
              ]}
            >
              Mode Of Transport
            </H5>
            <P
              style={[
                typography.textBold,
                typography.font14,
                typography.fontLato,
                { textAlign: "right" },
              ]}
            >
              {travelItem.transportType || "Not provided"}
            </P>
          </View>
          <H5
            style={[
              typography.font16,
              typography.textBold,
              typography.fontLato,
              spacing.pv5,
              {
                textAlign: "left",
              },
            ]}
          >
            Price Details
          </H5>
          <View style={[styles.row, spacing.pv2]}>
            <H5
              style={[
                typography.font14,
                // typography.textBold,
                typography.fontLato,
                { textAlign: "left" },
              ]}
            >
              Trip Price
            </H5>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                { textAlign: "right" },
              ]}
            >
              ₹ {travelItem.price || "Not provided"}
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5
              style={[
                typography.font18,
                typography.textBold,
                typography.fontLato,
                { textAlign: "left" },
              ]}
            >
              Total
            </H5>
            <P
              style={[
                typography.font18,
                typography.fontLato,
                typography.textBold,
                { textAlign: "right", color: "red" },
              ]}
            >
              ₹ {travelItem.price || "Not provided"}
            </P>
          </View>
        </View>
      </ScrollView>
    </ContainerComponent>
  );
}
