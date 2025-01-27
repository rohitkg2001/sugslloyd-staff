import { View, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import ContainerComponent from "../components/ContainerComponent";
import { spacing, typography, SCREEN_WIDTH } from "../styles";
import { P } from "../components/text";

export default function ({ navigation }) {

  return (
    <ContainerComponent justifyContent='space-between' paddingVertical={20}>
      <Image
        source={require("../assets/adaptive-icon.png")}
        style={{ height: 100, resizeMode: "contain" }}
      />
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("loginScreen")}>
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
              <P style={[typography.font16, { textAlign: "center" }]}>
                Rooftop Installation
              </P>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("sitelocationscreen")}>
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
              <P style={[typography.font16, { textAlign: "center" }]}>
                Streetlight Installation
              </P>
            </View>
          </Card>
        </TouchableOpacity>
      </View>


      <P style={[typography.font16, { color: "black" }]}>
        Powered by Dashandots Technology
      </P>
    </ContainerComponent>
  );
};