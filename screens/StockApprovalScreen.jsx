import React from "react";
import Button from "../components/buttons/Button";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import NoRecord from "./NoRecord";
import { H2 } from "../components/text";
import { typography, spacing, SCREEN_WIDTH, styles } from "../styles";
import { useTranslation } from "react-i18next";

const StockApprovalScreen = ({ route }) => {
  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader title={t(" Inward Inventory")} isBack={true} hasIcon={true} />
      <NoRecord msg={t("No stock available for approval")} />

      <Button
        style={[
          styles.btn,
          styles.bgPrimary,
          spacing.br5,
          {
            width: SCREEN_WIDTH - 16,
            justifyContent: "center",
            position: "absolute",
            bottom: 16,
          },
        ]}
      >
        <H2 style={[styles.btnText, typography.font20, typography.textLight]}>
          Approve
        </H2>
      </Button>
    </ContainerComponent>
  );
};

export default StockApprovalScreen;
