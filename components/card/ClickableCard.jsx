import { View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { H2, H6, P, Span } from "../text";
import Ionicons from "react-native-vector-icons/Ionicons";
import { spacing, typography, SCREEN_WIDTH, LIGHT, DANGER_COLOR } from "../../styles";
import Button from "../buttons/Button";
import moment from "moment";
import { SUCCESS_COLOR, WARNING_COLOR } from "../../styles/constant";

export default function ClickableCard({
  item,
  handleViewDetails,
  isSite = false,
  isVendor = false,
  isProject = false,
  isSiteData = false,
  isInventoryData = false,
  isTargetManagementData,
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
                  Project Name: {item.project_name}
                </H6>
                <P style={{ fontSize: 14 }}>
                  Work Order Number: {item.work_order_number}
                </P>
                <P style={{ fontSize: 14 }}>Start Date: {item.start_date}</P>
                <P style={{ fontSize: 14 }}>Order Value: {item.rate}</P>

                {/* TODO: Add project specific changes */}
              </>
            )}
            {
              isSite && (
                <>
                  <H6 style={[typography.textBold]}>{item.site_name}</H6>
                  <P style={{ fontSize: 14 }}>
                    {item.location}, {item.district}
                  </P>
                </>
              )
              // {/* TODO: Add site specific changes */}
            }
            {isVendor && (
              <>
                <H6 style={[typography.textBold]}>{item.name}</H6>
                <P style={{ fontSize: 14 }}>{item.address}</P>
                <P style={{ fontSize: 14 }}>{item.contactNo}</P>

                {/* TODO: Add vendor specific changes */}
              </>
            )}
            {isSiteData && (
              <>
                <H6
                  style={[typography.textBold, typography.font20, spacing.pv1]}
                >
                  {item.siteName}
                </H6>

                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <P style={{ fontSize: 12, flexShrink: 1 }}>{item.location}</P>
                  <P style={{ fontSize: 12, flexShrink: 1 }}>,{item.city}</P>
                  <P style={{ fontSize: 12, flexShrink: 1 }}>,{item.state}</P>
                </View>

                <P style={[spacing.pv2]}>
                  <H6 style={[typography.textBold, typography.font14]}>
                    Site Engineer:
                  </H6>

                  <P style={{ fontSize: 16 }}> {item.siteEngineer}</P>
                </P>

                <P style={[spacing.pv1]}>
                  <H6 style={[typography.textBold, typography.font14]}>
                    Vendor:
                  </H6>

                  <P style={{ fontSize: 16 }}> {item.vendor}</P>
                </P>

                <P
                  style={{
                    fontSize: 16,
                    color: "green",
                    textAlign: "right",
                    flexShrink: 1,
                  }}
                >
                  {item.status}
                </P>
              </>
            )}

            {isInventoryData && (
              <>
                <H6 style={[typography.textBold, typography.font20]}>
                  {item.productName}
                </H6>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <P
                    style={{
                      fontWeight: "bold",
                      flexDirection: "row",
                      display: "flex",
                    }}
                  >
                    * {item.category} | *{item.sub_category}
                  </P>
                </View>
              </>
            )}

            {isTargetManagementData && (
              <>
                <View
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 4,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor:
                      item.priority === 0 ? DANGER_COLOR :
                        item.priority === 1 ? WARNING_COLOR :
                          SUCCESS_COLOR
                  }}
                />


                <H2 style={[typography.font20, { textTransform: "capitalize" }]}>
                  {item.site?.site_name}
                </H2>
                <H6 style={[typography.font12, { textTransform: "capitalize" }]}>
                  {item.site?.location},{item.site?.district}- {item.site?.state}
                </H6>

                <H6
                  style={[typography.textBold, typography.font16, { textTransform: "uppercase" }]}
                >
                  {item.activity}
                </H6>

                <View style={{ flexDirection: "row" }}>
                  <Span>
                    {item.start_date}
                  </Span>
                  <Span> - </Span>
                  <Span>
                    {item.end_date}
                  </Span>
                </View>
              </>
            )}
          </View>
          {/* {!hideIcons && (
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
          )} */}
        </View>
      </Card>
    </TouchableOpacity>
  );
}
