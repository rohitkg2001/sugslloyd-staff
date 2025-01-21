import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import CardFullWidth from "../card/CardFullWidth";
import {
  LIGHT,
  PRIMARY_COLOR,
  styles,
  typography,
  spacing,
  ICON_SMALL,
} from "../../styles";
import { H5, H6 } from "../text";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  getAllTasks,
  getStaffPerformance,
  getTaskByEngineer,
} from "../../redux/actions/taskActions";

export default function TeamPerformance() {
  const [staffPerformance, setStaffPerformance] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { id } = useSelector((state) => state.staff);

  useEffect(() => {
    const fetchCounts = async () => {
      const staffTargetPerformance = await getStaffPerformance();
      setStaffPerformance(staffTargetPerformance);
    };

    dispatch(getAllTasks(id));
    fetchCounts();
  }, [dispatch, id]);

  return (
    <CardFullWidth backgroundColor={LIGHT}>
      <View style={[styles.row, { alignItems: "center" }]}>
        <Icon
          name="tennisball-outline"
          size={ICON_SMALL}
          color={PRIMARY_COLOR}
        />
        <H5 style={[typography.font16, { marginRight: 140 }]}>
          {t("Team Performance")}
        </H5>
      </View>

      <View style={[spacing.bbw05, spacing.mv1]} />

      <View style={{ flexDirection: "column" }}>
        <View style={[styles.row, spacing.bbw05, spacing.pv2]}>
          <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
            {t("Engineer")}
          </H6>
          <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
            {t("Total")}
          </H6>
          <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
            {t("Completed")}
          </H6>
          <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
            {t("Pending")}
          </H6>
        </View>

        {staffPerformance.map((data) => (
          <TouchableOpacity
            key={data.id}
            onPress={() => {
              dispatch(getTaskByEngineer(data.id));
              navigation.navigate("taskScreen", { engineer: data });
            }}
          >
            <View style={[styles.row, spacing.bbw05, spacing.pv4]}>
              <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
                {data.name}
              </H6>
              <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
                {data.total_alloted}
              </H6>
              <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
                {data.completed || 0}
              </H6>
              <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
                {data.pending || 0}
              </H6>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </CardFullWidth>
  );
}
