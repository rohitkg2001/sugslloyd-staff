import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // Import hook

import CardFullWidth from "../card/CardFullWidth";
import {
  LIGHT,
  PRIMARY_COLOR,
  spacing,
  styles,
  typography,
  ICON_LARGE,
} from "../../styles";
import { H5, P } from "../text";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import {
  getVendorPerformance,
  getAllTasks,
  getTaskByVendor,
} from "../../redux/actions/taskActions";

export default function VendorPerformance() {
  const [staffPerformance, setStaffPerformance] = useState([]);
  const { id } = useSelector((state) => state.staff);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getCounts = async () => {
    try {
      const tasksByEngineer = await getVendorPerformance(id);
      setStaffPerformance(tasksByEngineer);
    } catch (error) {
      console.error("Error fetching vendor performance:", error);
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
          size={ICON_LARGE}
          color={PRIMARY_COLOR}
        />
        <H5 style={[typography.textBold, { marginRight: 120 }]}>
          {t("Vendor Performance")}
        </H5>
      </View>

      <View style={[spacing.bbw05, spacing.mv1]} />

      <View style={{ flexDirection: "column" }}>
        <View
          style={[styles.row, typography.textBold, spacing.bbw05, spacing.pv2]}
        >
          <P style={[typography.textBold, { flex: 1, textAlign: "center" }]}>
            {t("Engineer")}
          </P>
          <P style={[typography.textBold, { flex: 1, textAlign: "center" }]}>
            {t("Total")}
          </P>
          <P style={[typography.textBold, { flex: 1, textAlign: "center" }]}>
            {t("Completed")}
          </P>
          <P style={[typography.textBold, { flex: 1, textAlign: "center" }]}>
            {t("Pending")}
          </P>
        </View>

        {staffPerformance.map((data) => (
          <TouchableOpacity
            key={data.id}
            onPress={() => {
              dispatch(getTaskByVendor(data.id));
              navigation.navigate("taskScreen", { vendor: data });
            }}
          >
            <View style={[styles.row, spacing.bbw05, spacing.pv4]}>
              <P
                style={[typography.textBold, { flex: 1, textAlign: "center" }]}
              >
                {data.name}
              </P>
              <P
                style={[typography.textBold, { flex: 1, textAlign: "center" }]}
              >
                {data.total_alloted}
              </P>
              <P
                style={[typography.textBold, { flex: 1, textAlign: "center" }]}
              >
                {data.completed || 0}
              </P>
              <P
                style={[typography.textBold, { flex: 1, textAlign: "center" }]}
              >
                {data.pending || 0}
              </P>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </CardFullWidth>
  );
}
