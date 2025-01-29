// import { useEffect, useState } from "react";
// import { View, TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native"; // Import hook

// import CardFullWidth from "../card/CardFullWidth";
// import {
//   LIGHT,
//   PRIMARY_COLOR,
//   spacing,
//   styles,
//   typography,
//   ICON_SMALL,
// } from "../../styles";
// import { H5, H6 } from "../text";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   getVendorPerformance,
//   getAllTasks,
//   getTaskByVendor,
// } from "../../redux/actions/taskActions";

// export default function VendorPerformance() {
//   const [staffPerformance, setStaffPerformance] = useState([]);
//   const { id } = useSelector((state) => state.staff);
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

// const getCounts = async () => {
//   try {
//     const tasksByEngineer = await getVendorPerformance(id);
//     setStaffPerformance(tasksByEngineer);
//   } catch (error) {
//     console.error("Error fetching vendor performance:", error);
//   }
// };

//   useEffect(() => {
//     dispatch(getAllTasks(id));
//     getCounts();
//   }, [dispatch, id]);

//   return (
//     <CardFullWidth backgroundColor={LIGHT}>
//       <View style={[styles.row, { alignItems: "center" }]}>
//         <Icon
//           name="tennisball-outline"
//           size={ICON_SMALL}
//           color={PRIMARY_COLOR}
//         />
//         <H5 style={[typography.font16, { marginRight: 130 }]}>
//           {t("Vendor Performance")}
//         </H5>
//       </View>

//       <View style={[spacing.bbw05, spacing.mv1]} />

//       <View style={{ flexDirection: "column" }}>
//         <View style={[styles.row, spacing.bbw05, spacing.pv2]}>
//           <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
//             {t("Engineer")}
//           </H6>
//           <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
//             {t("Total")}
//           </H6>
//           <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
//             {t("Completed")}
//           </H6>
//           <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
//             {t("Pending")}
//           </H6>
//         </View>

//         {staffPerformance.map((data) => (
//           <TouchableOpacity
//             key={data.id}
//             onPress={() => {
//               dispatch(getTaskByVendor(data.id));
//               navigation.navigate("taskScreen", { vendor: data });
//             }}
//           >
//             <View style={[styles.row, spacing.bbw05, spacing.pv2]}>
//               <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
//                 {data.name}
//               </H6>
//               <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
//                 {data.total_alloted}
//               </H6>
//               <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
//                 {data.completed || 0}
//               </H6>
//               <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
//                 {data.pending || 0}
//               </H6>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </CardFullWidth>
//   );
// }

import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import CardFullWidth from "../card/CardFullWidth";
import {
  LIGHT,
  PRIMARY_COLOR,
  spacing,
  styles,
  typography,
  ICON_SMALL,
} from "../../styles";
import { H5, H6 } from "../text";
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

      const updatedPerformance = tasksByEngineer.map((data) => {
        const totalAlloted = data.total_alloted || 0;
        const completed = data.completed || 0;
        const pending = totalAlloted - completed;

        return {
          ...data,
          pending,
        };
      });

      setStaffPerformance(updatedPerformance);
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
          size={ICON_SMALL}
          color={PRIMARY_COLOR}
        />
        <H5 style={[typography.font16, { marginRight: 130 }]}>
          {t("Vendor Performance")}
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
