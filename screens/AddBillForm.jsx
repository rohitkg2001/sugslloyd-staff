import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyPickerInput from "../components/input/MyPickerInput";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/buttons/Button";
import {
  styles,
  typography,
  spacing,
  PRIMARY_COLOR_TRANSPARENT,
  PRIMARY_COLOR,
  SCREEN_WIDTH,
} from "../styles";
import { H2, Span, H6, H5 } from "../components/text";
import { addBill } from "../redux/actions/projectAction";
import ProgressStep, {
  NavigationButtons,
} from "../components/tab/ProgressStep";
import { useSelector } from "react-redux";

const AddBillForm = ({ navigation }) => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const staff = useSelector((state) => state.staff);

  // Function to create an empty travel field
  const createEmptyTravelField = () => ({
    from: "",
    to: "",
    departure_time: "",
    arrival_time: "",
    modeoftravel: "",
    add_total_km: "",
    add_rate_per_km: "",
    add_vehicle_no: "",
    amount: "",
    add_rent: "", // Ensure add_rent is part of the travel field
  });

  // Function to create an empty daily fare field
  const createEmptyDailyFareField = () => ({
    place: "",
    HotelBillNo: "",
    date_of_stay: null,
    amount: "",
  });

  const [form, setForm] = useState({
    user_id: "",
    visiting_to: "",
    purpose_of_visit: "", 
    outcome_achieved: "",
    visit_approve: "",
    objective_tour: "",
    meeting_visit: "",
    outcome_achieve: "",
    start_journey: "",
    end_journey: "",
    transport: "Train", // Default transport mode
    mode_Of: "Bus", // Default transport mode
    return_time: "",
    mode_Of_return: "",
    is_ticket_provided: "Yes", // default value
    is_guest_house_available: "Yes", // default value
    guest_house_category: "",
    guest_house_amount: "",
    food_amount: "",
    lodging_amount: "",
    journey_amount: "",
    from_city: "",
    to_city: "",
    total_amount: "",
    miscellaneous: "",
    total_km: "",
    rate_per_km: "",
    Rent: "",
    vehicle_no: "",
    description_category: "",
    category: "", // Added category field
    add_rent: "", // Added add_rent field
    otherexpense: { meal: 0, parking: 0 },
    travelfare: [],
    dailyfare: [],
    start_journey_pnr: "",
    end_journey_pnr: "",
    ticket: null,
    hotelBill: null,
    hotel_bill: null,
    certificate: null,
    staffName: staff ? `${staff.firstName} ${staff.lastName}` : "",
  });

  const [datePicker, setDatePicker] = useState({ show: false, field: "" });
  const [formFields, setFormFields] = useState([createEmptyTravelField()]);
  const [dailyFareFields, setDailyFareFields] = useState([
    createEmptyDailyFareField(),
  ]);

  const steps = [
    "Basic Info",
    "Ticket Details",
    "Other Info",
    "Miscellaneous Expenses",
  ];

  const handleChange = (field, value, index = null) => {
    if (index !== null) {
      const updatedFields = [...formFields];
      updatedFields[index][field] = value;
      setFormFields(updatedFields);
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const showDatePicker = (field) => {
    setDatePicker({ show: true, field });
  };

  const onDateChange = (event, selectedDate) => {
    setDatePicker({ ...datePicker, show: false });
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      handleChange(datePicker.field, formatted);
    }
  };

  useEffect(() => {
    if (!form.is_ticket_provided) {
      setForm((prev) => ({ ...prev, is_ticket_provided: "Yes" }));
    }
  }, []);

  const [ticketEntries, setTicketEntries] = useState([
    {
      is_ticket_provided: "",
      from: "",
      to: "",
      start_journey: "",
      end_journey: "",
      ticket: null,
      journey_amount: "",
    },
  ]);

  // Handle change in ticket entry fields
  const handleTicketEntryChange = (index, field, value) => {
    const updated = [...ticketEntries];
    updated[index][field] = value;
    setTicketEntries(updated);
  };

  // Add a new ticket entry form
  const handleAddTicketEntry = () => {
    setTicketEntries([
      ...ticketEntries,
      {
        is_ticket_provided: "",
        from: "",
        to: "",
        start_journey: "",
        end_journey: "",
        ticket: null,
        journey_amount: "",
      },
    ]);
  };

  // Upload ticket file for a specific entry
  const handleUploadTicketFile = (index, type) => {
    // Implement logic to handle file picker and assign to ticketEntries[index].ticket
  };

  // Remove uploaded ticket file from a specific entry
  const handleRemoveTicketFile = (index) => {
    const updated = [...ticketEntries];
    updated[index].ticket = null;
    setTicketEntries(updated);
  };

  const handleRemoveTicketEntry = (index) => {
    const updated = [...ticketEntries];
    updated.splice(index, 1);
    setTicketEntries(updated);
  };

  const handleUpload = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (result.type === "success") {
        setForm({ ...form, [type]: { name: result.name, uri: result.uri } });
      }
    } catch (err) {
      console.log("Error picking document:", err);
    }
  };

  const handleRemove = (type) => {
    setForm({ ...form, [type]: null });
  };

  const [guestHouseYesEntries, setGuestHouseYesEntries] = useState([
    {
      guest_house_category: "",
      food_amount: "",
      from_city: "",
      to_city: "",
      lodging_amount: "",
      miscellaneous: "",
      total_amount: "",
    },
  ]);

  const [guestHouseNoEntries, setGuestHouseNoEntries] = useState([
    {
      guest_house_category: "",
      food_amount: "",
      from_city: "",
      to_city: "",
      lodging_amount: "",
      miscellaneous: "",
      total_amount: "",
    },
  ]);

  const handleGuestHouseChangeYes = (index, field, value) => {
    const updated = [...guestHouseYesEntries];
    updated[index][field] = value;
    setGuestHouseYesEntries(updated);
  };

  const handleGuestHouseChangeNo = (index, field, value) => {
    const updated = [...guestHouseNoEntries];
    updated[index][field] = value;
    setGuestHouseNoEntries(updated);
  };

  const handleAddGuestHouseYes = () => {
    setGuestHouseYesEntries([
      ...guestHouseYesEntries,
      {
        guest_house_category: "",
        food_amount: "",
        from_city: "",
        to_city: "",
        lodging_amount: "",
        miscellaneous: "",
        total_amount: "",
      },
    ]);
  };

  const handleRemoveGuestHouseYes = (index) => {
    const updated = [...guestHouseYesEntries];
    updated.splice(index, 1);
    setGuestHouseYesEntries(updated);
  };

  const handleAddGuestHouseNo = () => {
    setGuestHouseNoEntries([
      ...guestHouseNoEntries,
      {
        guest_house_category: "",
        food_amount: "",
        from_city: "",
        to_city: "",
        lodging_amount: "",
        miscellaneous: "",
        total_amount: "",
      },
    ]);
  };

  const handleRemoveGuestHouseNo = (index) => {
    const updated = [...guestHouseNoEntries];
    updated.splice(index, 1);
    setGuestHouseNoEntries(updated);
  };

  const handleSubmit = async () => {
    try {
      // Check if the category field is populated
      if (!form.category) {
        Alert.alert("Error", "Please select a category.");
        return; // Prevent submission if category is not set
      }

      const payload = {
        ...form,
        total_km: Number(form.total_km),
        rate_per_km: Number(form.rate_per_km),
        Rent: Number(form.Rent),
        add_rent: Number(form.add_rent) || 0, // Ensure add_rent is included
        travelfare: formFields.map((field) => ({
          from: field.from || "",
          to: field.to || "",
          departure_time: field.departure_time || null,
          arrival_time: field.arrival_time || null,
          modeoftravel: field.modeoftravel || "",
          add_total_km: field.add_total_km ? Number(field.add_total_km) : 0,
          add_rate_per_km: field.add_rate_per_km
            ? Number(field.add_rate_per_km)
            : 0,
          add_vehicle_no: field.add_vehicle_no || "",
          amount: field.amount ? Number(field.amount) : 0,
          add_rent: Number(field.add_rent) || 0, // Ensure add_rent is included in travel fields
        })),
        dailyfare: dailyFareFields.map((field) => ({
          place: field.place || "",
          HotelBillNo: field.HotelBillNo || "",
          date_of_stay: field.date_of_stay || null,
          amount: field.amount ? Number(field.amount) : 0,
        })),
      };

      // Log the payload to check values
      console.log("Payload to submit:", payload);

      const success = await dispatch(addBill(payload));
      if (success) {
        Alert.alert("Success", "Bill submitted successfully!");
        navigation.navigate("travelManagement");
      } else {
        Alert.alert("Error", "Failed to submit the bill. Please try again.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred: " + (error.message || "Unknown error")
      );
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title={"Add Bill"} hasIcon={true} isBack={true} />
      <ProgressStep
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      <ScrollView style={[spacing.p2]}>
        {activeStep === 0 && (
          <>
            {["visiting_to", " purpose_of_visit", "outcome_achieved"].map(
              (field) => (
                <MyTextInput
                  key={field}
                  title={field
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                  value={form[field]}
                  onChangeText={(text) => handleChange(field, text)}
                  placeholder={field
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                  multiline={
                    field === " purpose_of_visit" ||
                    field === "outcome_achieved"
                  }
                  style={
                    field === " purpose_of_visit" ||
                    field === "outcome_achieved"
                      ? { height: 100, textAlignVertical: "top" }
                      : {}
                  }
                />
              )
            )}

            {/* Departure Date */}
            <H6>Departure Date</H6>
            <Pressable
              onPress={() => showDatePicker("departure_time")}
              style={[
                spacing.pv4,
                spacing.ph3,
                spacing.br1,
                styles.row,
                {
                  borderWidth: 1,
                  borderColor: "#ccc",
                  backgroundColor: "#F0FAF0",
                  borderRadius: 8,
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
            >
              <Text style={{ color: form.departure_time ? "#000" : "#888" }}>
                {form.departure_time || "Select Departure Date"}
              </Text>
              <Icon name="calendar" size={20} color="#888" />
            </Pressable>

            {/* Return Date */}
            <H6>Return Date</H6>
            <Pressable
              onPress={() => showDatePicker("return_time")}
              style={[
                spacing.pv4,
                spacing.ph3,
                spacing.br1,
                styles.row,
                {
                  borderWidth: 1,
                  borderColor: "#ccc",
                  backgroundColor: "#F0FAF0",
                  borderRadius: 8,
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
            >
              <Text style={{ color: form.return_time ? "#000" : "#888" }}>
                {form.return_time || "Select Return Date"}
              </Text>
              <Icon name="calendar" size={20} color="#888" />
            </Pressable>

            {/* Single Date Picker Instance */}
            {datePicker.show && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setDatePicker({ ...datePicker, show: false });
                  if (selectedDate) {
                    const formatted = selectedDate.toISOString().split("T")[0];
                    handleChange(datePicker.field, formatted);
                  }
                }}
              />
            )}
          </>
        )}

        {activeStep === 1 && (
          <ScrollView style={[spacing.p1]}>
            {ticketEntries.map((entry, index) => (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                  marginBottom: 16,
                }}
              >
                {/* Top Heading */}
                <H6
                  style={[
                    typography.font14,
                    typography.fontLato,
                    typography.textBold,
                    {
                      letterSpacing: 0.5,
                      color: "#333",
                      width: SCREEN_WIDTH - 20,
                    },
                  ]}
                >
                  * Is Ticket Provided by Company?
                </H6>

                {/* Yes/No Radio */}
                <View style={[styles.row, spacing.mv2]}>
                  {["Yes", "No"].map((option) => {
                    const selected = entry.is_ticket_provided === option;
                    return (
                      <TouchableOpacity
                        key={option}
                        onPress={() =>
                          handleTicketEntryChange(
                            index,
                            "is_ticket_provided",
                            option
                          )
                        }
                        style={[
                          styles.row,
                          { alignItems: "center", marginRight: 16 },
                        ]}
                      >
                        <View
                          style={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            borderWidth: 1.5,
                            borderColor: selected ? "#020409" : "#aaa",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 10,
                          }}
                        >
                          {selected && (
                            <View
                              style={{
                                height: 10,
                                width: 10,
                                backgroundColor: PRIMARY_COLOR,
                                borderRadius: 5,
                              }}
                            />
                          )}
                        </View>
                        <Text style={{ color: selected ? "#76885B" : "#333" }}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Conditional Fields */}
                {entry.is_ticket_provided === "Yes" && (
                  <Image
                    source={require("../assets/document.png")}
                    style={{
                      width: 200,
                      height: 200,
                      resizeMode: "contain",
                      alignSelf: "center",
                    }}
                  />
                )}

                {entry.is_ticket_provided === "No" && (
                  <>
                    <MyTextInput
                      title="From"
                      value={entry.from}
                      onChangeText={(text) =>
                        handleTicketEntryChange(index, "from", text)
                      }
                      placeholder="Enter From Location"
                      inputStyle={{ width: "100%" }}
                    />
                    <MyTextInput
                      title="To"
                      value={entry.to}
                      onChangeText={(text) =>
                        handleTicketEntryChange(index, "to", text)
                      }
                      placeholder="Enter To Location"
                      inputStyle={{ width: "100%" }}
                    />

                    {["start_journey", "end_journey"].map((field) => (
                      <View key={field} style={{ marginBottom: 15 }}>
                        <Span style={typography.fontLato}>
                          {field
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </Span>
                        <Pressable
                          onPress={() => showDatePicker(field)}
                          style={[
                            spacing.pv4,
                            spacing.ph3,
                            spacing.br1,
                            styles.row,
                            {
                              borderWidth: 1,
                              borderColor: "#ccc",
                              backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                            },
                          ]}
                        >
                          <Text
                            style={{ color: form[field] ? "#000" : "#888" }}
                          >
                            {form[field] || `${field.replace(/_/g, " ")} Date`}
                          </Text>
                          <Icon name="calendar" size={20} color="#888" />
                        </Pressable>
                      </View>
                    ))}

                    {datePicker.show && (
                      <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                      />
                    )}

                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => handleUploadTicketFile(index, "ticket")}
                      >
                        <Span
                          style={{
                            color: "#007bff",
                            textDecorationLine: "underline",
                          }}
                        >
                          Upload Ticket
                        </Span>
                      </TouchableOpacity>
                    </View>

                    {entry.ticket && (
                      <View style={{ marginTop: 5 }}>
                        <Text style={{ color: "green" }}>
                          Uploaded File: {entry.ticket.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleRemoveTicketFile(index)}
                        >
                          <Text
                            style={{
                              color: "red",
                              textDecorationLine: "underline",
                            }}
                          >
                            Remove
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    <MyTextInput
                      title="Amount"
                      value={entry.journey_amount}
                      onChangeText={(text) =>
                        handleTicketEntryChange(index, "journey_amount", text)
                      }
                      placeholder="Enter Amount"
                      keyboardType="numeric"
                      inputStyle={{ width: "100%" }}
                    />
                  </>
                )}

                {/*  REMOVE Button */}
                <TouchableOpacity
                  onPress={() => handleRemoveTicketEntry(index)}
                  style={{
                    marginTop: 10,
                    alignSelf: "flex-end",
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    backgroundColor: "#FF4C4C",
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "#e8f5e9",
                borderWidth: 1,
                borderColor: "green",
                borderStyle: "dotted",
                alignItems: "center",
                borderRadius: 8,
              }}
              onPress={handleAddTicketEntry}
            >
              <Text style={{ color: "green" }}>+ Add More</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {activeStep === 2 && (
          <ScrollView style={[spacing.p1]}>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                backgroundColor: PRIMARY_COLOR_TRANSPARENT,
              }}
            >
              <H6
                style={[
                  typography.font14,
                  typography.fontLato,
                  typography.textBold,
                  {
                    letterSpacing: 0.5,
                    color: "#333",
                    width: SCREEN_WIDTH - 20,
                  },
                ]}
              >
                * Is Guest House Available?
              </H6>
            </View>

            <View style={[styles.row, spacing.mv2]}>
              {["Yes", "No"].map((option) => {
                const selected = form.is_guest_house_available === option;
                return (
                  <TouchableOpacity
                    key={option}
                    onPress={() =>
                      handleChange("is_guest_house_available", option)
                    }
                    style={[styles.row, { alignItems: "center" }]}
                  >
                    <View
                      style={[
                        spacing.mr2,
                        {
                          height: 20,
                          width: 20,
                          borderRadius: 10,
                          borderWidth: 1.5,
                          borderColor: selected ? "#020409" : "#aaa",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                      ]}
                    >
                      {selected && (
                        <View
                          style={[
                            spacing.br1,
                            {
                              height: 10,
                              width: 10,
                              backgroundColor: PRIMARY_COLOR,
                            },
                          ]}
                        />
                      )}
                    </View>
                    <Text style={{ color: selected ? "#76885B" : "#333" }}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Show Additional Inputs If Guest House is Available */}
            {form.is_guest_house_available === "Yes" && (
              <View style={{ marginTop: 14 }}>
                {guestHouseYesEntries.map((entry, index) => (
                  <View key={index} style={{ marginBottom: 14 }}>
                    <H5>Miscellaneous Transport</H5>
                    <MyTextInput
                      title="From"
                      value={entry.from_city}
                      onChangeText={(text) =>
                        handleGuestHouseChangeYes(index, "from_city", text)
                      }
                      placeholder="Enter from location"
                    />
                    <MyTextInput
                      title="To"
                      value={entry.to_city}
                      onChangeText={(text) =>
                        handleGuestHouseChangeYes(index, "to_city", text)
                      }
                      placeholder="Enter to location"
                    />
                    <MyTextInput
                      title="Miscellaneous Transport Charge"
                      value={entry.lodging_amount}
                      onChangeText={(text) =>
                        handleGuestHouseChangeYes(index, "lodging_amount", text)
                      }
                      placeholder="Enter miscellaneous transport charge"
                      keyboardType="numeric"
                    />
                    <MyTextInput
                      title="Miscellaneous"
                      value={entry.miscellaneous}
                      onChangeText={(text) =>
                        handleGuestHouseChangeYes(index, "miscellaneous", text)
                      }
                      placeholder="Enter miscellaneous details"
                      // style={{ height: 100, textAlignVertical: "top" }}
                    />
                    <MyTextInput
                      title="Total Amount"
                      value={entry.total_amount}
                      onChangeText={(text) =>
                        handleGuestHouseChangeYes(index, "total_amount", text)
                      }
                      placeholder="Enter total amount"
                      keyboardType="numeric"
                    />
                    {guestHouseYesEntries.length > 1 && (
                      <TouchableOpacity
                        style={{ marginTop: 10 }}
                        onPress={() => handleRemoveGuestHouseYes(index)}
                      >
                        <Text style={{ color: "red", textAlign: "right" }}>
                          Remove
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: "#e8f5e9",
                    borderWidth: 1,
                    borderColor: "green",
                    borderStyle: "dotted",
                    // marginBottom: 20,
                    alignItems: "center",
                    borderRadius: 8,
                  }}
                  onPress={handleAddGuestHouseYes}
                >
                  <Text style={{ color: "green" }}>+ Add More</Text>
                </TouchableOpacity>
              </View>
            )}

            {form.is_guest_house_available === "No" && (
              <>
                {guestHouseNoEntries.map((entry, index) => {
                  return (
                    <View key={index} style={{ marginBottom: 20 }}>
                      <MyTextInput
                        title="From"
                        value={entry.from_city}
                        onChangeText={(text) =>
                          handleGuestHouseChangeNo(index, "from_city", text)
                        }
                        placeholder="Enter from location"
                      />

                      <MyTextInput
                        title="To"
                        value={entry.to_city}
                        onChangeText={(text) =>
                          handleGuestHouseChangeNo(index, "to_city", text)
                        }
                        placeholder="Enter to location"
                      />

                      <MyTextInput
                        title="Lodging Amount"
                        value={entry.lodging_amount}
                        onChangeText={(text) =>
                          handleGuestHouseChangeNo(
                            index,
                            "lodging_amount",
                            text
                          )
                        }
                        placeholder="Enter lodging amount"
                        keyboardType="numeric"
                      />

                      <MyTextInput
                        title="Miscellaneous"
                        value={entry.miscellaneous}
                        onChangeText={(text) =>
                          handleGuestHouseChangeNo(index, "miscellaneous", text)
                        }
                        placeholder="Enter miscellaneous details"
                        style={{ height: 100, textAlignVertical: "top" }}
                      />

                      <MyTextInput
                        title="Total Amount"
                        value={entry.total_amount}
                        onChangeText={(text) =>
                          handleGuestHouseChangeNo(index, "total_amount", text)
                        }
                        placeholder="Enter total amount"
                        keyboardType="numeric"
                      />

                      {guestHouseNoEntries.length > 1 && (
                        <TouchableOpacity
                          style={{ marginTop: 10 }}
                          onPress={() => handleRemoveGuestHouseNo(index)}
                        >
                          <Text style={{ color: "red", textAlign: "right" }}>
                            Remove
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}

                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: "#e8f5e9",
                    borderWidth: 1,
                    borderColor: "green",
                    borderStyle: "dotted",
                    marginBottom: 20,
                    alignItems: "center",
                    borderRadius: 8,
                  }}
                  onPress={handleAddGuestHouseNo}
                  disabled={guestHouseNoEntries.length >= 4} // optional: max 4 unique categories
                >
                  <Text style={{ color: "green" }}>+ Add More</Text>
                </TouchableOpacity>

                {/* Hotel Bill Upload */}

                <View
                  style={[
                    spacing.bw1,
                    spacing.br2,
                    {
                      borderStyle: "dotted",
                      marginTop: 15,
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                    },
                  ]}
                >
                  <H6
                    style={[
                      typography.font14,
                      typography.fontLato,
                      spacing.mb2,
                    ]}
                  >
                    Hotel Bill
                  </H6>
                  <TouchableOpacity
                    onPress={() => handleUpload("hotel_bill")}
                    style={{ marginTop: 10, alignItems: "center" }}
                  >
                    <H6
                      style={[
                        typography.fontLato,
                        spacing.p1,
                        spacing.bw1,
                        spacing.br1,
                        spacing.mb2,
                        typography.font16,
                        {
                          textAlign: "center",
                          borderColor: "green",
                          borderStyle: "dotted",
                          backgroundColor: "#e8f5e9",
                        },
                      ]}
                    >
                      Upload Hotel Bill
                    </H6>
                  </TouchableOpacity>
                  {form.hotel_bill && (
                    <View style={{ marginTop: 10, alignItems: "center" }}>
                      <H6 style={{ color: "green", fontSize: 14 }}>
                        Uploaded File: {form.hotel_bill.name}
                      </H6>
                      <TouchableOpacity
                        onPress={() => handleRemove("hotel_bill")}
                      >
                        <Text style={{ color: "red" }}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Certificate Upload */}
                <View
                  style={[
                    spacing.bw1,
                    spacing.br2,
                    {
                      borderStyle: "dotted",
                      marginTop: 15,
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                    },
                  ]}
                >
                  <H6
                    style={[
                      typography.font14,
                      typography.fontLato,
                      spacing.mb2,
                    ]}
                  >
                    Certificate
                  </H6>
                  <TouchableOpacity
                    onPress={() => handleUpload("certificate")}
                    style={{ marginTop: 10, alignItems: "center" }}
                  >
                    <H6
                      style={[
                        typography.fontLato,
                        spacing.p1,
                        spacing.bw1,
                        spacing.br1,
                        spacing.mb2,
                        typography.font16,
                        {
                          textAlign: "center",
                          borderColor: "green",
                          borderStyle: "dotted",
                          backgroundColor: "#e8f5e9",
                        },
                      ]}
                    >
                      Upload Certificate
                    </H6>
                  </TouchableOpacity>
                  {form.certificate && (
                    <View style={{ marginTop: 10, alignItems: "center" }}>
                      <H6 style={{ color: "green", fontSize: 14 }}>
                        Uploaded File: {form.certificate.name}
                      </H6>
                      <TouchableOpacity
                        onPress={() => handleRemove("certificate")}
                      >
                        <Text style={{ color: "red" }}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </>
            )}

            {/* Submit Button */}
            <Button
              style={[
                styles.btn,
                styles.bgPrimary,
                { justifyContent: "center", marginTop: 30 },
              ]}
              onPress={handleSubmit}
            >
              <H2
                style={[styles.btnText, styles.textLarge, typography.textLight]}
              >
                Submit
              </H2>
            </Button>
          </ScrollView>
        )}
      </ScrollView>
      <NavigationButtons
        activeStep={activeStep}
        steps={steps}
        goToPrevious={() => setActiveStep(activeStep - 1)}
        goToNext={() => setActiveStep(activeStep + 1)}
      />
    </ContainerComponent>
  );
};

export default AddBillForm;
