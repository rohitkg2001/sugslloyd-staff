import { View, ScrollView, Alert } from "react-native";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import { H2, H5, P } from "../components/text";
import Button from "../components/buttons/Button";

export default function ConveyanceDetailScreen() {
  return (
    <ContainerComponent>
      <MyHeader title={"Booking Summary"} hasIcon={true} isBack={true} />
      <ScrollView>
        <View style={[{ width: SCREEN_WIDTH - 16 }]}>
          <View style={[styles.row, spacing.pv2]}>
            <H5
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,
                { textAlign: "left" },
              ]}
            >
              From
            </H5>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                { textAlign: "right" },
              ]}
            >
              Hanuman Mandir
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
              To
            </H5>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                { textAlign: "right" },
              ]}
            >
              - Patna Zoo
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
              Journey Date
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
          <View style={[styles.row, spacing.pv2]}>
            <H5
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,
                { textAlign: "left" },
              ]}
            >
              KM
            </H5>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                { textAlign: "right" },
              ]}
            >
              4 Km
            </P>
          </View>
          <View style={[styles.row, spacing.pv2, spacing.bbw05]}>
            <H5
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,

                { textAlign: "left" },
              ]}
            >
              Mode Of Transport
            </H5>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                { textAlign: "right" },
              ]}
            >
              Bus
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
              ₹ 350.00
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
              ₹ 350.00
            </P>
          </View>
          import {Alert} from "react-native";
          <Button
            style={[
              styles.btn,
              styles.bgPrimary,
              { justifyContent: "center", top: 250 },
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
