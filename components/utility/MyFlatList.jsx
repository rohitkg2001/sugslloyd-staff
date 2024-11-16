import { FlatList, View, ActivityIndicator, Text } from "react-native";
import { styles } from "../../styles/components.styles";
import { PRIMARY_COLOR } from "../../styles/constant";
import NoRecord from "../../screens/NoRecord";

export default function MyFlatList({
  data,
  renderItem,
  keyExtractor,
  loading,
  holidays,
  ...props
}) {


  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      ) : (
        <>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            {...props}
          />
        </>
      )}
    </View>
  );
}
