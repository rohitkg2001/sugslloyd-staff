import { View, ScrollView, Alert } from "react-native";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import { H2, H5, P } from "../components/text";
import Button from "../components/buttons/Button";

export default function TravelDetailScreen() {
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
                  typography.font18,
                  typography.textBold,
                  typography.fontLato,
                ]}
              >
                Delhi
              </H5>
            </View>
            <H5 style={{ fontSize: 24 }}>⇄</H5>
            <View style={{ alignItems: "center" }}>
              <P style={[typography.font10]}>To</P>
              <H5
                style={[
                  typography.font18,
                  typography.textBold,
                  typography.fontLato,
                ]}
              >
                Patna
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
              Pickup Date
            </H5>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                { textAlign: "right" },
              ]}
            >
              12 Feb 2024 - 10:00
            </P>
          </View>
          <View style={[styles.row, spacing.pv2, spacing.bbw05]}>
            <H5
              style={[
                typography.font14,
                //  typography.textBold,
                typography.fontLato,

                { textAlign: "left" },
              ]}
            >
              Return Date
            </H5>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                { textAlign: "right" },
              ]}
            >
              14 Feb 2024 - 10:00
            </P>
          </View>
          <H5
            style={[
              typography.font20,
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
                typography.textBold,
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
              ₹ 230
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,
                { textAlign: "left" },
              ]}
            >
              Duration
            </H5>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                { textAlign: "right" },
              ]}
            >
              2 days
            </P>
          </View>
          <View style={[styles.row, spacing.pv2]}>
            <H5
              style={[
                typography.font20,
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
              ₹ 230.00
            </P>
          </View>
          import {Alert} from "react-native";
          <Button
            style={[
              styles.btn,
              styles.bgPrimary,
              { justifyContent: "center", top: 295 },
            ]}
            onPress={() => {
              Alert.alert(
                "Submission Successful",
                "Your form has been submitted successfully!",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
              );
            }}
          >
            <H2
              style={[styles.btnText, styles.textLarge, typography.textLight]}
            >
              {"Submit"}
            </H2>
          </Button>
        </View>
      </ScrollView>
    </ContainerComponent>
  );
}
