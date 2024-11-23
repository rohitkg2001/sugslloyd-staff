import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { viewVendor, searchVendor, countVendor } from '../redux/actions/vendorAction';

export default function TotalVendorsScreen({ navigation }) {
  const dispatch = useDispatch();
  const vendorState = useSelector(state => state.vendors);
  const filteredVendors = vendorState?.filteredVendors || totalVendorsData;
  const searchText = vendorState?.searchText || '';
  const count = vendorState?.count || totalVendorsData.length;

  useEffect(() => {
    dispatch(countVendor());
  }, [dispatch]);

  const handleViewDetails = (item) => {
    dispatch(viewVendor(item));
    navigation.navigate("ViewDetailScreen", { site: item, formType: "vendor" });
  };

  const handleSearch = (text) => {
    dispatch(searchVendor(text));
  };

  const handleEdit = (item) => {
    navigation.navigate("VendorFormScreen", { vendor: item });
  };

  return (
    <ContainerComponent>
      <MyHeader title={`Vendor Management (${count})`} isBack={true} hasIcon={true} />
      <MyFlatList
        data={filteredVendors}
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
            handleEdit={() => handleEdit(item)}
            isVendor={true}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh2, spacing.mt1]}
        ListEmptyComponent={() => (
          <NoRecord msg="Oops! No Vendors available. Create the new one." />
        )}
        ListHeaderComponent={() => (
          <SearchBar 
            placeholder="Search by name, state or project code"
            value={searchText}
            onChangeText={handleSearch}
          />
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