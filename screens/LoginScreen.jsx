import { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import MyImageBackground from "../components/MyImageBackground";
import { H1, H5, Span, H2 } from "../components/text";
import MyTextInput from "../components/input/MyTextInput";
import Button from "../components/buttons/Button";
import { layouts, spacing, typography, styles, ICON_LARGE } from "../styles";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { login } from "../redux/actions/staffActions";
import { fakeDelete } from "../utils/faker";
import { useTranslation } from "react-i18next";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSubmit = async () => {
    setError("");
    try {
      const result = await dispatch(login(username, password));
      if (result) {
        navigation.navigate("homeScreen");
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
          <H1 style={spacing.mv2}>{t("loginTitle")}</H1>
          <H5 style={spacing.mb5}>{t("loginSubtitle")}</H5>
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
                right: spacing.mr2.marginRight,
                top: 40,
              }}
              onPress={togglePasswordVisibility}
            >
              <Icon
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={ICON_LARGE}
                color="gray"
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
            <Span style={styles.rightLink}>{t("forgotPasswordText")}</Span>
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
