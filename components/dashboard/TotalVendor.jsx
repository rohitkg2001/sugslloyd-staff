import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CardFullWidth from "../card/CardFullWidth";
import {
  LIGHT,
  PRIMARY_COLOR,
  spacing,
  styles,
  typography,
  ICON_SMALL,
} from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { getAllTasks } from "../../redux/actions/taskActions";
import {
  getAllVendors,
  getVendorCounts,
} from "../../redux/actions/vendorAction";
import { H5, H6 } from "../../components/text";
import { useDispatch, useSelector } from "react-redux";

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
      <View style={[styles.row, { alignItems: "center" }]}>
        <Icon name="person-circle" size={ICON_SMALL} color={PRIMARY_COLOR} />
        <H5 style={[typography.font16, { marginRight: 220 }]}>Vendors</H5>
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
          style={{ alignItems: "center", textAlign: "center" }}
        >
          <H6 style={typography.font14}>Total Vendors</H6>
          <H6 style={[typography.font16, spacing.m2]}>{totalVendors}</H6>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <H6 style={typography.font14}>Active</H6>
          <H6 style={[typography.font16, spacing.m2]}>{activeVendors}</H6>
        </View>
        <View style={{ alignItems: "center" }}>
          <H6 style={typography.font14}>Inactive</H6>
          <H6 style={[typography.font16, spacing.m2]}>{inActiveVendors}</H6>
        </View>
      </View>
    </CardFullWidth>
  );
}
