import { View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { H6, P } from "../text";
import Ionicons from "react-native-vector-icons/Ionicons";
import { spacing, typography, SCREEN_WIDTH, LIGHT } from "../../styles";
import Button from "../buttons/Button";

export default function ClickableCard({
  item,
  handleViewDetails,
  hideIcons,
  handleDelete,
  handleEdit,
  isSite = false,
  isVendor = false,
  isProject = false,
}) {
  return (
    <TouchableOpacity>
      <Card
        style={[
          spacing.mv1,
          {
            width: SCREEN_WIDTH - 22,
            backgroundColor: LIGHT,
            marginHorizontal: 4,
          },
        ]}
        onPress={() => handleViewDetails(item)}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
        >
          <View style={{ flex: 1 }}>
            {isProject && (
              <>
                <H6 style={[typography.textBold]}>
                  Project Name: {item.projectName}
                </H6>
                <P style={{ fontSize: 14 }}>
                  Work Order Number: {item.workOrderNumber}
                </P>
                <P style={{ fontSize: 14 }}>Rate: {item.rate}</P>

                {/* TODO: Add project specific changes */}
              </>
            )}
            {
              isSite && (
                <P style={{ fontSize: 14 }}>
                  {item.location}, {item.dist}
                </P>
              )
              // {/* TODO: Add site specific changes */}
            }
            {isVendor && (
              <>
                <H6 style={[typography.textBold]}>{item.name}</H6>
                <P style={{ fontSize: 14 }}>{item.location}</P>
                <P style={{ fontSize: 14 }}>{item.contactNumber}</P>

                {/* TODO: Add vendor specific changes */}
              </>
            )}
          </View>
          {!hideIcons && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Button
                onPress={() => handleEdit(item)}
                style={{ marginRight: 12 }}
              >
                <Ionicons name="pencil-outline" size={24} color="black" />
              </Button>
              <Button onPress={() => handleDelete(item)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </Button>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
}
