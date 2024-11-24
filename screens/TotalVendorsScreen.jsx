import { fakeDelete, totalVendorsData } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { spacing, styles } from "../styles";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import ClickableCard from "../components/card/ClickableCard";
import { ICON_LARGE, ICON_MEDIUM, LIGHT, SCREEN_WIDTH } from "../styles/constant";
import { View } from "react-native";

export default function TotalVendorsScreen({ navigation, route }) {
  const { pageTitle, data } = route.params || {
    pageTitle: "Vendor Management",
    data: totalVendorsData,
  };

  const handleViewDetails = (item) => {
    const dataType = item.projectName ? "project" : "vendor";
    navigation.navigate("ViewDetailScreen", { site: item, formType: dataType });
  };

  return (
    <ContainerComponent>
      <MyHeader title={pageTitle} isBack={true} hasIcon={true} />
      <MyFlatList
        data={data}
        loading={false}
        renderItem={({ item }) => (
          <ClickableCard
            item={item}
            handleViewDetails={handleViewDetails}
            handleDelete={() =>
              fakeDelete({
                title: "Error!!!",
                message: "You cannot delete this vendor. Please contact Admin!",
              })
            }
            handleEdit={(item) =>
              navigation.navigate("EditDetailsScreen", {
                item,
                formType: "vendor",
              })
            }
            isVendor={true}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh2, spacing.mt1]}
        ListEmptyComponent={() => (
          <NoRecord msg="Oops! No Vendors available. Create the new one." />
        )}
        ListHeaderComponent={() => (
          <View style={[spacing.mv4, styles.row, spacing.mh1, { alignItems: "center" }]}>
            <SearchBar
              placeholder="Search"
              style={{ width: SCREEN_WIDTH - 70 }}
            />
            <Button
              style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
            >
              <Ionicons name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
            </Button>
          </View>
        )}
      />
      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("VendorFormScreen")}
      >
        <Ionicons name="add" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
}
