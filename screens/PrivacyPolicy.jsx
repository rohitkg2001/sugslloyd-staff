import { useState } from "react";
import { ScrollView } from "react-native";
import MyHeader from "../components/header/MyHeader";
import { P } from "../components/text";
import { styles } from "../styles/components.styles";
import ContainerComponent from "../components/ContainerComponent";
import { PRIVACY_POLICY } from "../utils/faker";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
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
