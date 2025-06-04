// import react native
import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// import components
import CardFullWidth from "../card/CardFullWidth";
// import Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../redux/actions/taskActions";
import {
  getAllVendors,
  getVendorCounts,
} from "../../redux/actions/vendorAction";

// import styles
import { H5, H6 } from "../../components/text";
import {
  LIGHT,
  PRIMARY_COLOR,
  spacing,
  styles,
  typography,
  ICON_SMALL,
} from "../../styles";

export default function TotalVendor() {
  const [totalVendors, setTotalVendors] = useState(0);
  const [activeVendors, setActiveVendors] = useState(0);
  const [inActiveVendors, setInActiveVendors] = useState(0);
  const { id } = useSelector((state) => state.staff);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getCounts = async () => {
    const { totalVendors, activeVendors, inactiveVendors } =
      await getVendorCounts();
    setTotalVendors(totalVendors);
    setActiveVendors(activeVendors);
    setInActiveVendors(inactiveVendors);
  };

  useEffect(() => {
    dispatch(getAllVendors());
    dispatch(getAllTasks(id));
    getCounts();
  }, []);

  return (
    <CardFullWidth backgroundColor={LIGHT}>
      <View
        style={[
          styles.row,
          { alignItems: "center", justifyContent: "space-between" },
        ]}
      >
        <Icon name="person-circle" size={ICON_SMALL} color={PRIMARY_COLOR} />

        <H6
          style={[
            typography.fontLato,
            typography.textBold,
            { marginRight: 230 },
          ]}
        >
          Vendors
        </H6>

        <View style={{ width: ICON_SMALL }} />
      </View>

      <View style={[spacing.bbw05, spacing.mv2]} />

      <View
        style={[
          styles.row,
          { justifyContent: "space-between", paddingVertical: 10 },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("totalVendorsScreen")}
          style={{ alignItems: "center", flex: 1 }}
        >
          <H6 style={[typography.font14, typography.fontLato]}>
            Total Vendors
          </H6>
          <H6 style={[typography.font12, spacing.m2]}>{totalVendors}</H6>
        </TouchableOpacity>

        <View style={{ alignItems: "center", flex: 1 }}>
          <H6 style={[typography.font14, typography.fontLato]}>Active</H6>
          <H6 style={[typography.font12, spacing.m2]}>{activeVendors}</H6>
        </View>

        <View style={{ alignItems: "center", flex: 1 }}>
          <H6 style={[typography.font14, typography.fontLato]}>Inactive</H6>
          <H6 style={[typography.font12, spacing.m2]}>{inActiveVendors}</H6>
        </View>
      </View>
    </CardFullWidth>
  );
}
