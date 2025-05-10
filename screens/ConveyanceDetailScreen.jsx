// import react native
import { View, ScrollView, Alert, Image } from "react-native";
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
                {`${travelItem.from}`}
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
          <View style={[styles.row, spacing.pv2]}>
            <H5
              style={[
                typography.font14,
                // typography.textBold,
                typography.fontLato,

                { textAlign: "left" },
              ]}
            >
              Date
            </H5>
            <P
              style={[
                typography.textBold,
                typography.font14,
                typography.fontLato,
                { textAlign: "right" },
              ]}
            >
              {travelItem.date || "Not provided"}
            </P>
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
              Time
            </H5>
            <P
              style={[
                typography.textBold,
                typography.font14,
                typography.fontLato,
                { textAlign: "right" },
              ]}
            >
              {travelItem.time || "Not provided"}
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

          {/* Photos Section */}

          {travelItem.photos && travelItem.photos.length > 0 && (
            <>
              <P style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
                Travel Photos
              </P>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 10 }}
              >
                {travelItem.photos.map((photo, index) => (
                  <Image
                    key={index}
                    source={{ uri: photo }}
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: 10,
                      marginHorizontal: 5,
                    }}
                  />
                ))}
              </ScrollView>
            </>
          )}

          <Button
            style={[
              styles.btn,
              styles.bgPrimary,
              { justifyContent: "center", top: 280 },
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
