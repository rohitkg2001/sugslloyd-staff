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
              backgroundColor: "#FFD700",
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
            Assign Installation
          </P>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("siteLocationScreen")}
            style={[
              spacing.p5,
              spacing.br2,
              spacing.m4,
              styles.bgSuccess,
              {
                flex: 1,
                height: SCREEN_WIDTH / 2.5,
                alignItems: "center",
                marginHorizontal: 4,
              },
            ]}
          >
            <Icon name="location-sharp" size={80} />
            <P style={[typography.font16, spacing.mt3]}>Change Site Info</P>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              spacing.p5,
              spacing.br2,
              spacing.m4,
              styles.bgDanger,
              {
                flex: 1,
                height: SCREEN_WIDTH / 2.5,
                alignItems: "center",
                marginHorizontal: 4,
              },
            ]}
          >
            <Icon name="reader-sharp" size={80} />
            <P style={[typography.font16, spacing.mt3]}>Pending Records</P>
          </TouchableOpacity>
        </View>
      </View>
    </ContainerComponent>
  );
}
