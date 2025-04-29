// import All react native
import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// import Components
import CardFullWidth from "../card/CardFullWidth";

// import Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTasks,
  getStaffPerformance,
  getTaskByEngineer,
} from "../../redux/actions/taskActions";
// import All styles
import {
  LIGHT,
  PRIMARY_COLOR,
  styles,
  typography,
  spacing,
  ICON_SMALL,
  PRIMARY_COLOR_TRANSPARENT,
} from "../../styles";
import { H6 } from "../text";
const MEDAL_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"]; // Gold, Silver, Bronze

export default function TeamPerformance() {
  const [staffPerformance, setStaffPerformance] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { id, projectType } = useSelector((state) => state.staff);

  useEffect(() => {
    console.log(`Now I can filter on ${projectType} for user id ${id}`);
    const fetchCounts = async () => {
      const staffTargetPerformance = await getStaffPerformance(id);
      staffTargetPerformance.length = 5;
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
        <H6
          style={[
            typography.fontLato,
            typography.textBold,
            { marginRight: 160 },
          ]}
        >
          {t("Team Performance")}
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
            {t("Engineer")}
          </H6>
          <H6
            style={[
              typography.font14,
              typography.fontLato,
              { flex: 1, textAlign: "center" },
            ]}
          >
            {t("Total")}
          </H6>
          <H6
            style={[
              typography.font14,
              typography.fontLato,
              { flex: 1, textAlign: "center" },
            ]}
          >
            {t("Completed")}
          </H6>
          <H6
            style={[
              typography.font14,
              typography.fontLato,
              { flex: 1, textAlign: "center" },
            ]}
          >
            {"Backlogs"}
          </H6>
        </View>

        {staffPerformance.map((data, index) => (
          <TouchableOpacity
            key={data.id}
            onPress={() => {
              dispatch(getTaskByEngineer(data.id));
              navigation.navigate("taskScreen", { engineer: data });
            }}
          >
            <View
              style={[
                styles.row,
                spacing.bbw05,
                spacing.p4,
                {
                  backgroundColor:
                    index == 0 ? PRIMARY_COLOR_TRANSPARENT : LIGHT,
                },
              ]}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Medal Icon for Top 3 Performers */}
                {index < 3 && (
                  <Icon
                    name="medal-outline"
                    size={16}
                    color={MEDAL_COLORS[index]}
                    style={{ marginRight: 5 }}
                  />
                )}
                <H6
                  style={[
                    typography.font10,
                    typography.fontLato,

                    {
                      textAlign: "center",
                      fontWeight: index == 0 ? "bold" : "normal",
                      textTransform: "capitalize",
                    },
                  ]}
                >
                  {data.name}
                </H6>
              </View>
              <H6
                style={[
                  typography.font12,
                  typography.fontLato,
                  {
                    flex: 1,
                    textAlign: "center",
                    fontWeight: index == 0 ? "bold" : "normal",
                  },
                ]}
              >
                {data.total_alloted || 0}
              </H6>
              <H6
                style={[
                  typography.font12,
                  typography.fontLato,
                  {
                    flex: 1,
                    textAlign: "center",
                    fontWeight: index == 0 ? "bold" : "normal",
                  },
                ]}
              >
                {data.total_completed || 0}
              </H6>
              <H6
                style={[
                  typography.font12,
                  typography.fontLato,
                  {
                    flex: 1,
                    textAlign: "center",
                    fontWeight: index == 0 ? "bold" : "normal",
                  },
                ]}
              >
                {data.total_backlogs || 0}
              </H6>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </CardFullWidth>
  );
}
