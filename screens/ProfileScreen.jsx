import React, { useState } from "react";
import { View } from "react-native";
import PersonalInfo from "../components/PersonalInfo";
import DocumentsList from "../components/DocumentsList";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { staff } from "../utils/faker";
import { layouts, LIGHT, PRIMARY_COLOR, styles, typography } from "../styles";
import TabNavigation from "../components/TabNavigation";
import CardFullWidth from "../components/card/CardFullWidth";
import Avatar from "../components/Avatar";

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("Personal");

  const renderContent = () => {
    if (activeTab === "Personal") {
      return <PersonalInfo data={staff} />;
    } else if (activeTab === "Document") {
      return <DocumentsList documentData={staff} />;
    }
    return null;
  };

  return (
    <ContainerComponent>
      <MyHeader title="My Profile" isBack={true} hasIcon={true} />
      <CardFullWidth backgroundColor={PRIMARY_COLOR}>
        <View style={styles.row}>
          <Avatar
            avatar={staff.image}
            name={`${staff.first_name} ${staff.last_name}`}
            online={false}
          />
          {/* Removed the Edit Profile button */}
        </View>
      </CardFullWidth>
      <TabNavigation
        tabs={["Personal", "Document"]} // Removed "Job Info"
        currentTab={activeTab}
        setCurrentTab={setActiveTab}
      />
      {renderContent()}
    </ContainerComponent>
  );
};

export default ProfileScreen;
