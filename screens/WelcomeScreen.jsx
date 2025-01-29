import { View, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import { P } from "../components/text";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function WelcomeScreen({ navigation }) {
  const { siteInfo } = useSelector((state) => state.site);
  useEffect(() => {
    console.log(siteInfo);
  }, [siteInfo]);

  return (
    <ContainerComponent>
      <MyHeader isBack title="Welcome" hasIcon />
      {/* <P
        style={[
          typography.font16,
          typography.textBold,
          spacing.m4,
          styles.bgPrimaryTransParent,
          spacing.p2,
          { width: SCREEN_WIDTH },
        ]}
      >
        Current Site: {siteInfo}
      </P> */}

      <View
        style={[
          styles.row,
          spacing.mt5,
          { flexWrap: "wrap", alignItems: "center" },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("currentStreetLightScreen")}
          style={[
            spacing.br2,
            spacing.p4,
            spacing.m4,
            {
              width: SCREEN_WIDTH / 1.1,
              height: SCREEN_WIDTH / 2.5,
              alignItems: "center",
              backgroundColor: "#85c1e9",
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
          <P
            style={[
              typography.font16,
              spacing.mt1,
              typography.textBold,
              {
                textAlign: "center",
              },
            ]}
          >
            Assign Task
          </P>
        </TouchableOpacity>

        <View style={[styles.row]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("siteLocationScreen")}
            style={[
              spacing.p5,
              spacing.br2,
              spacing.m4,

              spacing.mh1,
              {
                flex: 1,
                height: SCREEN_WIDTH / 2.3,
                alignItems: "center",
                backgroundColor: "#f0b27a",
              },
            ]}
          >
            <Icon name="reader-sharp" size={75} />
            <P style={[typography.font16, spacing.mt3]}>Pending reports</P>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              spacing.p5,
              spacing.br2,
              spacing.m4,

              spacing.mh1,
              {
                flex: 1,
                height: SCREEN_WIDTH / 2.3,
                alignItems: "center",
                backgroundColor: "#1abc9c",
              },
            ]}
          >
            <Icon name="receipt" size={75} />
            <P style={[typography.font16, spacing.mt3]}>Generate JICR report</P>
          </TouchableOpacity>
        </View>
      </View>
    </ContainerComponent>
  );
}
