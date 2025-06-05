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

  const formatDate = (dateString) => {
    // Check if the provided dateString is valid
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const imageList =
    typeof travelItem.image === "string"
      ? travelItem.image.split(",")
      : Array.isArray(travelItem.image)
      ? travelItem.image
      : [];

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
                {travelItem.to}
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
              Distance
            </H5>
            <P
              style={[
                typography.text600,
                typography.font14,
                typography.fontLato,
                { textAlign: "right" },
              ]}
            >
              {travelItem.kilometer || "Not provided"} Km
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
              {travelItem.vehicles?.[0]?.category || "Not provided"}
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
              {travelItem.created_at
                ? formatDate(travelItem.created_at)
                : "Not provided"}
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
              Fare
            </H5>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                { textAlign: "right" },
              ]}
            >
              ₹ {travelItem.amount || "Not provided"}
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
              ₹ {travelItem.amount || "Not provided"}
            </P>
          </View>

          {/* Photos Section */}

          {/* {travelItem.photos && travelItem.photos.length > 0 && (
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
          )} */}

          {imageList && imageList.filter(Boolean).length > 0 && (
            <>
              <P style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
                Travel Photos
              </P>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 10 }}
              >
                {imageList.filter(Boolean).map((img, index) => (
                  <Image
                    key={index}
                    source={{ uri: img.trim() }}
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: 10,
                      marginHorizontal: 5,
                      backgroundColor: "#e0e0e0",
                    }}
                    onError={() => console.log("Failed to load:", img)}
                  />
                ))}
              </ScrollView>
            </>
          )}

          {/* <Button
            style={[
              styles.btn,
              styles.bgPrimary,
              { justifyContent: "center", top: 240 },
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
          </Button> */}

          <View style={[styles.row, spacing.pv2]}>
            <H5
              style={[
                typography.font14,
                typography.fontLato,
                { textAlign: "left" },
              ]}
            >
              Status
            </H5>
            <P
              style={[
                typography.textBold,
                typography.font16,
                typography.fontLato,
                { textAlign: "right" },
                {
                  color:
                    travelItem.status === 1 || travelItem.status === "1"
                      ? "#2E7D32" // Green
                      : travelItem.status === 2 || travelItem.status === "2"
                      ? "#C62828" // Red
                      : "#000", // Default black
                },
              ]}
            >
              {travelItem.status === 1 || travelItem.status === "1"
                ? "Approved"
                : travelItem.status === 2 || travelItem.status === "2"
                ? "Rejected"
                : "Not provided"}
            </P>
          </View>
        </View>
      </ScrollView>
    </ContainerComponent>
  );
}
