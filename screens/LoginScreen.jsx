// import  All React native
import { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

// import All Components
import MyImageBackground from "../components/MyImageBackground";
import MyTextInput from "../components/input/MyTextInput";
import Button from "../components/buttons/Button";
// import All Redux
import { login } from "../redux/actions/staffActions";
import { useDispatch } from "react-redux";

// import faker
import { fakeDelete } from "../utils/faker";

// import All Styles
import { layouts, spacing, typography, styles, ICON_LARGE } from "../styles";
import { H1, Span, H2, P } from "../components/text";

export default function LoginScreen({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const nextScreen = route.params?.nextScreen || "homeScreen";

  const onSubmit = async () => {
    setError("");
    try {
      const result = await dispatch(login(username, password));
      if (result) {
        navigation.navigate(nextScreen);
      } else {
        setError("Please provide the correct credentials");
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <MyImageBackground imageSource={require("../assets/Login.png")}>
      <ScrollView style={{ flex: 1 }}>
        <View style={[layouts.center, spacing.mv5]}>
          <H2 style={[typography.fontLato, spacing.mt2]}>{t("loginTitle")}</H2>
          <P style={[typography.fontLato, spacing.mb5]}>{t("loginSubtitle")}</P>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={spacing.mb5}
        >
          <MyTextInput
            title="Username"
            type="email"
            placeholder="abc@xyz.com"
            value={username}
            onChangeText={setUsername}
          />
          <View style={[styles.passwordContainer, { position: "relative" }]}>
            <MyTextInput
              title="Password"
              type="password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 12,
                top: 33,
              }}
              onPress={togglePasswordVisibility}
            >
              <Icon
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={ICON_LARGE}
              />
            </TouchableOpacity>
          </View>

          {error ? (
            <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
          ) : null}

          <TouchableOpacity
            onPress={() =>
              fakeDelete({
                title: "Forgot Password",
                message:
                  "Forgot your password? Don’t worry—we’re here to help! Please contact your admin for assistance with resetting your password and getting back into your account quickly",
                positiveText: "OK",
              })
            }
          >
            <Span style={[styles.rightLink, typography.fontLato]}>
              {t("forgotPasswordText")}
            </Span>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <Button
          style={[styles.btn, styles.bgPrimary, { justifyContent: "center" }]}
          onPress={onSubmit}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            {t("loginBtnText")}
          </H2>
        </Button>
      </ScrollView>
    </MyImageBackground>
  );
}
