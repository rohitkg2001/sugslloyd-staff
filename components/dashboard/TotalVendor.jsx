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
  ICON_LARGE,
} from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { getAllTasks } from "../../redux/actions/taskActions";
import {
  getAllVendors,
  getVendorCounts,
} from "../../redux/actions/vendorAction";
import { H5, P } from "../../components/text";
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
        <Icon name="person-circle" size={ICON_LARGE} color={PRIMARY_COLOR} />
        <H5 style={[typography.textBold, { marginRight: 200 }]}>Vendors</H5>
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
          <P style={typography.textBold}>Total Vendors</P>
          <P style={[typography.font20, typography.textBold, spacing.m2]}>
            {totalVendors}
          </P>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <P style={typography.textBold}>Active</P>
          <P style={[typography.font20, typography.textBold, spacing.m2]}>
            {activeVendors}
          </P>
        </View>
        <View style={{ alignItems: "center" }}>
          <P style={typography.textBold}>Inactive</P>
          <P style={[typography.font20, typography.textBold, spacing.m2]}>
            {inActiveVendors}
          </P>
        </View>
      </View>
    </CardFullWidth>
  );
}
