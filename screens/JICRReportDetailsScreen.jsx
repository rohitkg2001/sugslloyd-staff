import React from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H3, P } from "../components/text";
import { Card, Text } from "react-native-paper";
import { fakerData, executingAgencyData } from "../utils/faker";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";

import { ICON_LARGE, SCREEN_WIDTH, styles } from "../styles";

export default function JICRReportDetailsScreen({ route }) {
  const { reportData } = route.params;

  return (
    <ContainerComponent>
      <MyHeader isBackr title="JICR Report Details" hasIcon />
      <ScrollView>
        <Card
          style={{
            padding: 12,
            margin: 12,
            width: SCREEN_WIDTH / 1.1,
            height: SCREEN_WIDTH / 2.1,
            backgroundColor: "#ffff",
          }}
        >
          <H3 style={{ textAlign: "center" }}>Report Summary</H3>

          <View style={{ flexDirection: "row" }}>
            <P>District:</P>
            <P style={{ left: 24 }}>{reportData.district}</P>
          </View>

          <View style={{ flexDirection: "row" }}>
            <P>Block:</P>
            <P style={{ left: 35 }}>{reportData.block}</P>
          </View>

          <View style={{ flexDirection: "row" }}>
            <P>Panchayat:</P>
            <P style={{ left: 12 }}>{reportData.panchayat}</P>
          </View>

          <View style={{ flexDirection: "row" }}>
            <P>Ward:</P>
            <P style={{ left: 49 }}>{reportData.ward}</P>
          </View>

          <View style={{ flexDirection: "row" }}>
            <P>From Date:</P>
            <P style={{ left: 20 }}>{reportData.fromDate}</P>
          </View>

          <View style={{ flexDirection: "row" }}>
            <P>To Date:</P>
            <P style={{ left: 20 }}>{reportData.toDate}</P>
          </View>
        </Card>
        <View
          style={{
            padding: 12,
            margin: 12,
            width: SCREEN_WIDTH / 1.1,
            backgroundColor: "#f5f5f5",
          }}
        >
          {executingAgencyData.map((agency, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", flex: 1 }}>
                  Agency Name:
                </Text>
                <P style={{ flex: 1, textAlign: "right" }}>
                  {agency.agencyName}
                </P>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", flex: 1 }}>
                  Full Address:
                </Text>
                <P style={{ flex: 1, textAlign: "right" }}>
                  {agency.fullAddress}
                </P>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", flex: 1 }}>
                  Contact Person:
                </Text>
                <P style={{ flex: 1, textAlign: "right" }}>
                  {agency.contactPerson}
                </P>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", flex: 1 }}>Mobile No:</Text>
                <P style={{ flex: 1, textAlign: "right" }}>{agency.mobileNo}</P>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", flex: 1 }}>
                  Name of System:
                </Text>
                <P style={{ flex: 1, textAlign: "right" }}>
                  {agency.nameOfSystem}
                </P>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", flex: 1 }}>
                  Agreement number & Date:
                </Text>
                <P style={{ flex: 1, textAlign: "right" }}>
                  {agency.agreementNumberDate}
                </P>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", flex: 1 }}>
                  Capacity of System:
                </Text>
                <P style={{ flex: 1, textAlign: "right" }}>
                  {agency.capacityOfSystem}
                </P>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", flex: 1 }}>
                  Latitude and longitude:
                </Text>
                <P style={{ flex: 1, textAlign: "right" }}>
                  {agency.latitude}, {agency.longitude}
                </P>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", flex: 1 }}>
                  Date of installation:
                </Text>
                <P style={{ flex: 1, textAlign: "right" }}>
                  {agency.dateOfInstallation}
                </P>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", flex: 1 }}>
                  Warrantee expire on:
                </Text>
                <P style={{ flex: 1, textAlign: "right" }}>
                  {agency.warranteeExpire}
                </P>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", flex: 1 }}>Address:</Text>
                <P style={{ flex: 1, textAlign: "right" }}>
                  {agency.serviceCentreInfo}
                </P>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", flex: 1 }}>
                  Post, P.S, District, State, PIN Code:
                </Text>
                <P style={{ flex: 1, textAlign: "right" }}>{agency.details}</P>
              </View>
            </View>
          ))}
        </View>

        {fakerData.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
              padding: 8,
              marginVertical: 10,
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                marginBottom: 8,
              }}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {[
                  { label: "Solar Panel No:", data: item.solarPanel },
                  { label: "Battery No:", data: item.battery },
                  { label: "Light No:", data: item.light },
                  { label: "SIM No:", data: item.sim },
                  { label: "PIN:", data: item.pin },
                  { label: "Pole No:", data: item.pole },
                ].map((field, fieldIndex) => (
                  <View
                    key={fieldIndex}
                    style={{
                      alignItems: "center",
                      marginRight: 20,
                      paddingVertical: 8,
                    }}
                  >
                    <P>{field.label}</P>

                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#ccc",
                        width: "100%",
                        marginVertical: 5,
                      }}
                    />
                    {field.data.split(", ").map((value, valueIndex) => (
                      <View key={valueIndex} style={{ marginVertical: 5 }}>
                        <P>{value}</P>
                        {/* Horizontal line below each data item */}
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ccc",
                            width: "100%",
                            marginTop: 5,
                          }}
                        />
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>
      <Button style={styles.addButton}>
        <Icon name="download-outline" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
}
