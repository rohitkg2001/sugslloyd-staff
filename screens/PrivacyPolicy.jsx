// import react native
import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

// import Components
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";
// import Faker
import { PRIVACY_POLICY } from "../utils/faker";

// import Styles
import { styles, spacing } from "../styles/components.styles";
import { P } from "../components/text";

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
}
