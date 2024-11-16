import React, { Component, Fragment } from "react";
import { View, Alert } from "react-native";
import SearchableDropdownNative from "react-native-searchable-dropdown";
import ContainerComponent from "./ContainerComponent";
import { originalItems } from "../utils/faker";
import { styles } from "../styles/components.styles";

class  SearchableDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      filteredItems: originalItems, // Use filteredItems to control dropdown items
    };
  }

  // Function to handle text change and filter the items
  handleTextChange = (text) => {
    if (text === "") {
      // If the input is cleared, reset the filtered items to the originalItems
      this.setState({ filteredItems: originalItems });
    } else {
      // Filter the items based on the search input
      const filteredItems = originalItems.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );

      // If no items are found, show an alert
      if (filteredItems.length === 0) {
        Alert.alert("Item not found");
      }

      // Update the filteredItems state
      this.setState({ filteredItems });
    }
  };

  render() {
    return (
      <ContainerComponent>
        <Fragment>
          <View style={styles.container}>
            <SearchableDropdownNative
              multi={true}
              selectedItems={this.state.selectedItems}
              onItemSelect={(item) => {
                if (
                  !this.state.selectedItems.some(
                    (selected) => selected.id === item.id
                  )
                ) {
                  const items = [...this.state.selectedItems, item];
                  this.setState({ selectedItems: items });
                }
              }}
              containerStyle={styles.dropdownContainer}
              onRemoveItem={(item) => {
                const items = this.state.selectedItems.filter(
                  (sitem) => sitem.id !== item.id
                );
                this.setState({ selectedItems: items });
              }}
              itemStyle={styles.itemStyle}
              itemTextStyle={styles.itemTextStyle}
              itemsContainerStyle={styles.itemsContainerStyle}
              items={this.state.filteredItems} // Use filteredItems for dropdown
              chip={true}
              resetValue={false}
              textInputProps={{
                placeholder: "Search or Items",
                underlineColorAndroid: "transparent",
                style: styles.textInput,
                onTextChange: this.handleTextChange, // Update onTextChange
              }}
              listProps={{ nestedScrollEnabled: true }}
            />
          </View>
        </Fragment>
      </ContainerComponent>
    );
  }
}

export default SearchableDropdown;
