import React from "react";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import NoRecord from "./NoRecord";
import { useTranslation } from "react-i18next";

const ReportScreen = () => {
  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader title={t("Reports")} isBack={true} hasIcon={true} />
      <NoRecord msg={t("Oops! No Reports available. Please Generate reports")} />
    </ContainerComponent>
  );
};

export default ReportScreen;