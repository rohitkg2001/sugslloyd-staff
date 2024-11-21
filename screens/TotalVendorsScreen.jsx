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

export default function TotalVendorsScreen({ navigation, route }) {
  const { pageTitle, data } = route.params || {
    pageTitle: "Vendor Management",
    data: totalVendorsData,
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
            handleViewDetails={() =>
              navigation.navigate("ViewDetailScreen", { vendor: item })
            }
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
          <SearchBar placeholder="Search by name, state or project code" />
        )}
      />
      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("VendorFormScreen")}
      >
        <Ionicons name="add" size={32} color="white" />
      </Button>
    </ContainerComponent>
  );
}
