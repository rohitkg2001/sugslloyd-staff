import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { useTranslation } from "react-i18next";
import NoRecord from "./NoRecord";
import { useDispatch, useSelector } from "react-redux";
import { getTaskById } from "../redux/actions/taskActions";
import { getAllVendors } from "../redux/actions/vendorAction";
import TargetDetails from "../components/targetManagementComponent/TargetDetails";
import LocationDetails from "../components/targetManagementComponent/LocationDetails";
import ImageDisplay from "../components/targetManagementComponent/ImageDisplay";

const TargetManagementScreen = ({ route }) => {
  const { id } = route.params || {};
  const [currentTarget, setCurrentTarget] = useState({});
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showVendorSelection, setShowVendorSelection] = useState(false);

  const getCurrentTask = async () => {
    const thisTask = await getTaskById(id);
    setCurrentTarget(thisTask.task);
  };

  useEffect(() => {
    getCurrentTask();
    dispatch(getAllVendors());
  }, []);

  const isDataAvailable =
    currentTarget && Object.keys(currentTarget).length > 0;

  // Calculate isCompleted flag from the current target's status
  const isCompleted = currentTarget.status === "Completed";

  return (
    <ContainerComponent>
      <MyHeader title={t("Task")} hasIcon={true} isBack={true} />

      <View style={{ width: "100%", flex: 1 }}>
        {isDataAvailable ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <TargetDetails
              target={currentTarget}
              setShowVendorSelection={setShowVendorSelection}
            />
            <LocationDetails target={currentTarget} />
            {Array.isArray(currentTarget.image) &&
              currentTarget.image.length > 0 && (
                <ImageDisplay
                  images={currentTarget.image}
                  id={currentTarget.id}
                  status={currentTarget.status} // Pass status prop directly
                  isCompleted={isCompleted} // Pass the isCompleted prop
                />
              )}
          </ScrollView>
        ) : (
          <NoRecord msg="No data found" />
        )}
      </View>
    </ContainerComponent>
  );
};

export default TargetManagementScreen;
