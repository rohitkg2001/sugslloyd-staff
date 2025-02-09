import { View, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import ContainerComponent from "../components/ContainerComponent";
import { spacing, typography, SCREEN_WIDTH } from "../styles";
import { P } from "../components/text";

export default function CardScreen({ navigation }) {
  const handlePress = (nextScreen) => {
    navigation.navigate("loginScreen", { nextScreen });
  };

  // const handlePress = (initialScreen) => {
  //   navigation.navigate("loginScreen");

  //   setTimeout(() => {
  //     navigation.navigate("attendancePunch");

  //     setTimeout(() => {
  //       if (initialScreen === "rooftop") {
  //         navigation.navigate("homeScreen");
  //       } else if (initialScreen === "streetlight") {
  //         navigation.navigate("welcomeScreen");
  //       }
  //     }, 15000);
  //   }, 15000);
  // };

  return (
    <ContainerComponent justifyContent="space-between" paddingVertical={20}>
      <Image
        source={require("../assets/adaptive-icon.png")}
        style={{ height: 100, resizeMode: "contain" }}
      />
      <View>
        <TouchableOpacity onPress={() => handlePress("attendancePunch")}>
          <Card
            style={[
              spacing.mt5,
              {
                width: SCREEN_WIDTH * 0.9,
                backgroundColor: "#f8f9fa",
              },
            ]}
          >
            <Image
              source={require("../assets/rooft.png")}
              style={[
                spacing.mt2,
                {
                  width: "70%",
                  height: 70,
                  alignSelf: "center",
                },
              ]}
            />
            <View style={[spacing.p3]}>
              <P
                style={[
                  typography.font16,
                  typography.fontLato,
                  typography.textCenter,
                ]}
              >
                Rooftop Installation
              </P>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress("welcomeScreen")}>
          <Card
            style={[
              spacing.mt5,
              {
                width: SCREEN_WIDTH * 0.9,
                backgroundColor: "#e0f7fa",
                alignSelf: "center",
              },
            ]}
          >
            <Image
              source={require("../assets/solar.png")}
              style={[
                spacing.mt3,
                {
                  width: "80%",
                  height: 80,
                  alignSelf: "center",
                },
              ]}
            />
            <View style={[spacing.p3]}>
              <P
                style={[
                  typography.font16,
                  typography.fontLato,
                  typography.textCenter,
                ]}
              >
                Streetlight Installation
              </P>
            </View>
          </Card>
        </TouchableOpacity>
      </View>

      <P
        style={[typography.font16, typography.fontLato, typography.textCenter]}
      >
        Powered by Dashandots Technology
      </P>
    </ContainerComponent>
  );
}
