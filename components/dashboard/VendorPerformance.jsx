// import react native
import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// import components
import CardFullWidth from "../card/CardFullWidth";

// import Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getVendorPerformance,
  getAllTasks,
  getTaskByVendor,
} from "../../redux/actions/taskActions";
// import styles
import {
  LIGHT,
  PRIMARY_COLOR,
  spacing,
  styles,
  typography,
  ICON_SMALL,
} from "../../styles";
import { H6 } from "../text";

export default function VendorPerformance() {
  const [staffPerformance, setStaffPerformance] = useState([]);
  const { id } = useSelector((state) => state.staff);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const getCounts = async () => {
  //   try {
  //     const tasksByEngineer = await getVendorPerformance(id);
  //    // console.log(tasksByEngineer);
  //     setStaffPerformance(tasksByEngineer);
  //   } catch (error) {
  //     console.error("Error fetching vendor performance:", error);
  //   }
  // };

  const getCounts = async () => {
    try {
      const tasksByEngineer = await getVendorPerformance(id);
      setStaffPerformance(
        Array.isArray(tasksByEngineer) ? tasksByEngineer : []
      );
    } catch (error) {
      console.error("Error fetching vendor performance:", error);
      setStaffPerformance([]);
    }
  };

  useEffect(() => {
    dispatch(getAllTasks(id));
    getCounts();
  }, [dispatch, id]);

  return (
    <CardFullWidth backgroundColor={LIGHT}>
      <View style={[styles.row, { alignItems: "center" }]}>
        <Icon
          name="tennisball-outline"
          size={ICON_SMALL}
          color={PRIMARY_COLOR}
        />
        <H6
          style={[
            typography.fontLato,
            typography.textBold,
            { marginRight: 150 },
          ]}
        >
          {t("vendor_performance")}
        </H6>
      </View>

      <View style={[spacing.bbw05, spacing.mv1]} />

      <View style={{ flexDirection: "column" }}>
        <View style={[styles.row, spacing.bbw05, spacing.pv2]}>
          <H6
            style={[
              typography.font14,
              typography.fontLato,
              { flex: 1, textAlign: "center" },
            ]}
          >
            {t("engineer")}
          </H6>
          <H6
            style={[
              typography.font14,
              typography.fontLato,
              { flex: 1, textAlign: "center" },
            ]}
          >
            {t("total_title")}
          </H6>
          <H6
            style={[
              typography.font14,
              typography.fontLato,
              { flex: 1, textAlign: "center" },
            ]}
          >
            {t("completed")}
          </H6>
          <H6
            style={[
              typography.font14,
              typography.fontLato,
              { flex: 1, textAlign: "center" },
            ]}
          >
            {t("pending")}
          </H6>
        </View>

        {staffPerformance.map((data) => (
          <TouchableOpacity
            key={data.id}
            onPress={() => {
              dispatch(getTaskByVendor(data.id));
              navigation.navigate("taskScreen", { vendor: data });
            }}
          >
            <View style={[styles.row, spacing.bbw05, spacing.pv2]}>
              <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
                {data.name}
              </H6>
              <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
                {data.total_alloted}
              </H6>
              <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
                {data.total_completed || 0}
              </H6>
              <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
                {data.total_pending || 0}
              </H6>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </CardFullWidth>
  );
}
