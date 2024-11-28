import { FlatList, View, ActivityIndicator, Text } from "react-native";
import { PRIMARY_COLOR } from "../../styles/constant";

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
