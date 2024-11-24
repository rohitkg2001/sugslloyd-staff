import { useState } from "react";
import { ScrollView } from "react-native";
import MyHeader from "../components/header/MyHeader";
import Button from "../components/buttons/Button";
import { H2, P } from "../components/text";
import { styles } from "../styles/components.styles";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, typography } from "../styles";
import { PRIVACY_POLICY } from "../utils/faker";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    console.log("Checkbox state changed:", !isChecked);
  };

  const onSubmit = () => {
    console.log("Submit clicked, checkbox is checked:", isChecked);
    if (isChecked) {
      alert("You have accepted the privacy policy.");
    } else {
      alert("Please accept the privacy policy to proceed.");
    }
  };

  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader
        title={t("privacy_policy_title")}
        isBack={true}
        hasIcon={true}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <P style={{ marginHorizontal: 2, textAlign: "justify" }}>
          {PRIVACY_POLICY}
        </P>
      </ScrollView>
    </ContainerComponent>
  );
};

export default PrivacyPolicy;
