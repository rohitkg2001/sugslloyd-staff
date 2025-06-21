import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { Checkbox } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyPickerInput from "../components/input/MyPickerInput";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/buttons/Button";
import { getAllowedExpense } from "../redux/actions/projectAction";
import {
  styles,
  typography,
  spacing,
  PRIMARY_COLOR_TRANSPARENT,
  PRIMARY_COLOR,
  SCREEN_WIDTH,
} from "../styles";
import { H2, Span, H6, P } from "../components/text";
import ProgressStep, {
  NavigationButtons,
} from "../components/tab/ProgressStep";
import moment from "moment";

const AddBillForm = ({ navigation }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { id: userId } = useSelector((state) => state.staff);
  const [agree, setAgree] = useState(false);

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    visiting_to: "",
    purpose_of_visit: "",
    outcome_achieved: "",
    date_of_departure: "",
    date_of_return: "",
  });

  const { allowedExpense } = useSelector((state) => state.project);

  useEffect(() => {
    if (form.visiting_to && userId) {
      dispatch(getAllowedExpense(userId, form.visiting_to));
    }
  }, [form.visiting_to]);

  useEffect(() => {
    console.log("allowedExpense from store:", allowedExpense);
  }, [allowedExpense]);

  const [datePicker, setDatePicker] = useState({ show: false, field: "" });
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

  const getMinimumDate = () => {
    const index = datePickerState.index;

    const previousCheckOut =
      index > 0 && guestHouseEntries[index - 1]?.check_out_date
        ? moment(guestHouseEntries[index - 1].check_out_date)
        : null;

    const departureDate = moment(form.date_of_departure);

    return moment
      .max([departureDate, previousCheckOut || departureDate])
      .toDate();
  };

  const getMaximumDate = () => {
    return moment(form.date_of_return).toDate();
  };

  const onDateChange = (event, selectedDate) => {
    setDatePicker({ ...datePicker, show: false });
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      handleChange(datePicker.field, formatted);
    }
  };

  const [ticketEntries, setTicketEntries] = useState([
    {
      tickets_provided_by_company: "",
      from: "",
      to: "",
      date_of_journey: "",
      mode_of_transport: "",
      ticket: null,
      amount: "",
      pnr_number: "",
    },
  ]);

  const handleTicketDateChange = (event, selectedDate) => {
    if (selectedDate && datePicker.index !== null) {
      const updatedEntries = [...ticketEntries];

      // Format date to YYYY-MM-DD
      const formattedDate = selectedDate.toISOString().split("T")[0];

      updatedEntries[datePicker.index].date_of_journey = formattedDate;
      setTicketEntries(updatedEntries);
    }

    setDatePicker({ show: false, index: null });
  };

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
        tickets_provided_by_company: "",
        from: "",
        to: "",
        date_of_journey: "",
        ticket: null,
        mode_of_transport: "",
        amount: "",
        pnr_number: "",
      },
    ]);
  };

  const handleRemoveTicketEntry = (index) => {
    const updated = [...ticketEntries];
    updated.splice(index, 1);
    setTicketEntries(updated);
  };

  // Upload ticket file for a specific entry
  const handleUploadTicketFile = async (index, type) => {
    try {
      const { canceled, assets } = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!canceled && assets?.[0]) {
        const { name, uri } = assets[0];

        setTicketEntries((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            [type]: { name, uri },
          };
          return updated;
        });
      }
    } catch (error) {
      console.log("Error picking file:", error);
    }
  };

  // Remove uploaded ticket file from a specific entry

  const removeTicketFile = (index) => {
    setTicketEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[index] = {
        ...updatedEntries[index],
        ticket: null,
      };
      return updatedEntries;
    });
  };

  const [expenseEntries, setExpenseEntries] = useState([
    { description: "", amount: "", date_of_expense: "" },
  ]);

  const [expenseDatePicker, setExpenseDatePicker] = useState({
    show: false,
    index: null,
  });

  const handleExpenseChange = (index, field, value) => {
    const updated = [...expenseEntries];
    updated[index][field] = value;
    setExpenseEntries(updated);
  };

  const addExpenseEntry = () => {
    setExpenseEntries((prev) => [
      ...prev,
      { description: "", amount: "", date_of_expense: "" },
    ]);
  };

  const removeExpenseEntry = (index) => {
    setExpenseEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const openExpenseDatePicker = (index) => {
    setExpenseDatePicker({ show: true, index });
    console.log(`Showing Expense for ${index}`);
  };

  const [guestHouseEntries, setGuestHouseEntries] = useState([
    {
      guest_house_available: "",
      check_in_date: "",
      check_out_date: "",
      certificate_by_district_incharge: null,
      breakfast_included: "",
      hotel_bill: null,
      amount: "",
      dining_cost: "",
      bill_number: "",
      other_charges: "",
    },
  ]);

  const handleGuestHouseChange = (index, field, value) => {
    const updated = [...guestHouseEntries];
    updated[index][field] = value;
    setGuestHouseEntries(updated);
  };

  const handleAddGuestHouse = () => {
    setGuestHouseEntries([
      ...guestHouseEntries,
      {
        guest_house_available: "",
        check_in_date: "",
        check_out_date: "",
        certificate_by_district_incharge: null,
        breakfast_included: "",
        hotel_bill: null,
        amount: "",
        dining_cost: "",
        bill_number: "",
        other_charges: "",
      },
    ]);
  };

  const handleRemoveGuestHouse = (index) => {
    const updated = [...guestHouseEntries];
    updated.splice(index, 1);
    setGuestHouseEntries(updated);
  };
  const [datePickerState, setDatePickerState] = useState({
    visible: false,
    mode: "date",
    field: "",
    index: null,
  });
  const handleOpenDatePicker = (index, field) => {
    setDatePickerState({
      visible: true,
      mode: "date",
      field,
      index,
    });
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      const { index, field } = datePickerState;
      handleGuestHouseChange(
        index,
        field,
        selectedDate.toISOString().split("T")[0]
      );
    }
    setDatePickerState({
      visible: false,
      mode: "date",
      field: "",
      index: null,
    });
  };

  const handleUploadHotelBillFile = async (index, type) => {
    try {
      const { canceled, assets } = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!canceled && assets?.[0]) {
        const { name, uri } = assets[0];

        setGuestHouseEntries((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            [type]: { name, uri }, // i.e. "hotel_bill"
          };
          return updated;
        });
      }
    } catch (error) {
      console.log("Error picking hotel bill file:", error);
    }
  };

  const removeHotelBillFile = (index) => {
    setGuestHouseEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[index] = {
        ...updatedEntries[index],
        hotel_bill: null,
      };
      return updatedEntries;
    });
  };

  const handleUploadCertificateFile = async (index, fieldKey) => {
    try {
      const { canceled, assets } = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!canceled && assets?.[0]) {
        const { name, uri } = assets[0];

        setGuestHouseEntries((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            [fieldKey]: { name, uri },
          };
          return updated;
        });
      }
    } catch (error) {
      console.log("Error picking certificate file:", error);
    }
  };

  const removeCertificateFile = (index) => {
    setGuestHouseEntries((prevEntries) => {
      const updated = [...prevEntries];
      updated[index] = {
        ...updated[index],
        certificate_by_district_incharge: null,
      };
      return updated;
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        user_id: userId,
        ticketEntries,
        guestHouseEntries,
        expenseEntries,
      };

      console.log("Payload to submit:", payload);

      // Navigate to PreviewScreen with the payload
      navigation.navigate("previewScreen", { submittedData: payload });
    } catch (error) {
      console.error("Submit Error:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred: " + (error.message || "Unknown error")
      );
    }
  };

  useEffect(() => {
    console.log(form.date_of_departure);
  }, [form]);

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
            {["visiting_to", "purpose_of_visit", "outcome_achieved"].map(
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
                    field === "purpose_of_visit" || field === "outcome_achieved"
                  }
                  style={
                    field === "purpose_of_visit" || field === "outcome_achieved"
                      ? { height: 100, textAlignVertical: "top" }
                      : {}
                  }
                />
              )
            )}

            {/* Departure Date */}
            <Span style={[typography.fontLato]}>Departure Date</Span>
            <Pressable
              onPress={() => showDatePicker("date_of_departure")}
              style={[
                spacing.pv4,
                spacing.ph3,
                spacing.br1,
                styles.row,
                spacing.bw1,
                spacing.mv1,
                {
                  borderColor: PRIMARY_COLOR,
                  backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
            >
              <Span style={{ color: form.date_of_departure ? "#000" : "#888" }}>
                {moment(form.date_of_departure).format("DD-MM-yyyy") ||
                  "Select Departure Date"}
              </Span>
              <Icon name="calendar" size={20} />
            </Pressable>

            {/* Return Date */}
            <Span style={[typography.fontLato]}>Return Date</Span>
            <Pressable
              onPress={() => showDatePicker("date_of_return")}
              style={[
                spacing.pv4,
                spacing.ph3,
                spacing.br1,
                styles.row,
                spacing.bw1,
                spacing.mv1,
                {
                  borderColor: PRIMARY_COLOR,
                  backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
            >
              <Span style={{ color: form.date_of_return ? "#000" : "#888" }}>
                {moment(form.date_of_return).format("DD-MM-yyyy") ||
                  "Select Return Date"}
              </Span>
              <Icon name="calendar" size={20} />
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
                    // const formatted = selectedDate.toISOString().split("T")[0];
                    handleChange(datePicker.field, selectedDate);
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
                    const selected =
                      entry.tickets_provided_by_company === option;
                    return (
                      <TouchableOpacity
                        key={option}
                        onPress={() =>
                          handleTicketEntryChange(
                            index,
                            "tickets_provided_by_company",
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

                {/* Common Fields for both Yes and No */}
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

                <MyPickerInput
                  title={"Mode Of Transport"}
                  value={entry.mode_of_transport}
                  onChange={(val) =>
                    handleTicketEntryChange(index, "mode_of_transport", val)
                  }
                  options={[
                    { label: "Bus", value: "Bus" },
                    { label: "Train", value: "Train" },
                    { label: "Flight", value: "Flight" },
                    { label: "Car", value: "Car" },
                  ]}
                />

                <MyTextInput
                  title="PNR Number"
                  value={entry.pnr_number}
                  onChangeText={(text) =>
                    handleTicketEntryChange(index, "pnr_number", text)
                  }
                  placeholder="Enter PNR Number"
                  inputStyle={{ width: "100%" }}
                />

                <View style={{ marginBottom: 20 }}>
                  <Span style={[typography.fontLato]}>Date of Journey</Span>
                  <Pressable
                    onPress={() => setDatePicker({ show: true, index })}
                    style={[
                      spacing.pv4,
                      spacing.ph3,
                      spacing.br1,
                      styles.row,
                      spacing.bw1,
                      spacing.mv1,
                      {
                        borderColor: PRIMARY_COLOR,
                        backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                        justifyContent: "space-between",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: entry.date_of_journey ? "#000" : "#888",
                      }}
                    >
                      {entry.date_of_journey
                        ? moment(entry.date_of_journey).format("DD-MM-YYYY")
                        : "Select Date"}
                    </Text>
                    <Icon name="calendar" size={20} />
                  </Pressable>
                </View>

                {datePicker.show && (
                  <DateTimePicker
                    value={new Date()}
                    minimumDate={new Date(form.date_of_departure)}
                    maximumDate={new Date(form.date_of_return)}
                    mode="date"
                    display="default"
                    onChange={handleTicketDateChange}
                  />
                )}

                {/* Upload Ticket File */}
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleUploadTicketFile(index, "ticket")}
                  >
                    <Text
                      style={{
                        color: "#007bff",
                        textDecorationLine: "underline",
                      }}
                    >
                      Upload Ticket
                    </Text>
                  </TouchableOpacity>
                </View>

                {ticketEntries[index]?.ticket?.name && (
                  <View
                    style={[
                      styles.row,
                      spacing.br1,
                      spacing.p2,
                      spacing.mt2,
                      {
                        borderWidth: 1,
                        borderColor: "#28a745",
                        backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text style={{ color: "#155724", flex: 1 }}>
                      {ticketEntries[index].ticket.name}
                    </Text>
                    <TouchableOpacity onPress={() => removeTicketFile(index)}>
                      <Text style={{ color: "red", marginLeft: 10 }}>
                        X Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Amount field for both Yes and No */}
                {/* <MyTextInput
                  title="Amount"
                  value={entry.amount}
                  onChangeText={(text) =>
                    handleTicketEntryChange(index, "amount", text)
                  }
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                  inputStyle={{ width: "100%" }}
                /> */}

                <MyTextInput
                  title="Amount"
                  value={
                    entry.tickets_provided_by_company === "Yes"
                      ? "0"
                      : entry.amount
                  }
                  onChangeText={(text) =>
                    entry.tickets_provided_by_company === "No"
                      ? handleTicketEntryChange(index, "amount", text)
                      : null
                  }
                  placeholder="0"
                  keyboardType="numeric"
                  inputStyle={{ width: "100%" }}
                  editable={entry.tickets_provided_by_company === "No"}
                />

                {/* REMOVE Button */}
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

            {/* Add More Button */}
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
            {guestHouseEntries.map((entry, index) => (
              <View
                key={index}
                style={{
                  marginBottom: 20,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                  width: SCREEN_WIDTH - 20,
                }}
              >
                <H6
                  style={[
                    typography.font14,
                    typography.fontLato,
                    typography.textBold,
                    { letterSpacing: 0.5, color: "#333", marginBottom: 8 },
                  ]}
                >
                  * Is Guest House Available?
                </H6>

                <View style={[styles.row, spacing.mv1]}>
                  {["Yes", "No"].map((option) => {
                    const selected = entry.guest_house_available === option;
                    return (
                      <TouchableOpacity
                        key={option}
                        onPress={() =>
                          handleGuestHouseChange(
                            index,
                            "guest_house_available",
                            option
                          )
                        }
                        style={[
                          styles.row,
                          { alignItems: "center", marginRight: 15 },
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
                            marginRight: 6,
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

                {/* YES section */}
                {entry.guest_house_available === "Yes" && (
                  <>
                    <Span style={typography.fontLato}>Check In Date</Span>
                    <Pressable
                      onPress={() =>
                        handleOpenDatePicker(index, "check_in_date")
                      }
                      style={[
                        spacing.pv4,
                        spacing.ph3,
                        spacing.br1,
                        styles.row,
                        spacing.bw1,
                        spacing.mv1,
                        {
                          borderColor: PRIMARY_COLOR,
                          backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                          justifyContent: "space-between",
                          alignItems: "center",
                        },
                      ]}
                    >
                      <Text
                        style={{ color: entry.check_in_date ? "#000" : "#888" }}
                      >
                        {moment(entry.check_in_date).format("DD-MM-YYYY") ||
                          "Select Check In Date"}
                      </Text>
                      <Icon name="calendar" size={20} />
                    </Pressable>

                    <Span style={typography.fontLato}>Check Out Date</Span>
                    <Pressable
                      onPress={() =>
                        handleOpenDatePicker(index, "check_out_date")
                      }
                      style={[
                        spacing.pv4,
                        spacing.ph3,
                        spacing.br1,
                        styles.row,
                        spacing.bw1,
                        spacing.mv1,
                        {
                          borderColor: PRIMARY_COLOR,
                          backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                          justifyContent: "space-between",
                          alignItems: "center",
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: entry.check_out_date ? "#000" : "#888",
                        }}
                      >
                        {moment(entry.check_out_date).format("DD-MM-YYYY") ||
                          "Select Check In Date"}
                      </Text>
                      <Icon name="calendar" size={20} />
                    </Pressable>

                    {/* Duration and 30% Allowed Expense Display */}

                    {entry.check_in_date && entry.check_out_date && (
                      <View style={{ marginTop: 10 }}>
                        {(() => {
                          const checkIn = new Date(entry.check_in_date);
                          const checkOut = new Date(entry.check_out_date);
                          const diffInMs = checkOut - checkIn;
                          const numDays =
                            Math.ceil(diffInMs / (1000 * 60 * 60 * 24)) || 0;

                          const perDayAllowance = parseFloat(
                            allowedExpense?.allowed_expense || 0
                          );
                          const finalAmount = (
                            perDayAllowance *
                            0.3 *
                            numDays
                          ).toFixed(2);

                          const isInvalid =
                            parseFloat(entry.amount || "0") >
                            parseFloat(finalAmount);

                          // Save the valid amount for YES display
                          if (!isInvalid && entry.amount) {
                            entry.final_amount_for_yes = entry.amount;
                          }

                          return (
                            <>
                              <View
                                style={{
                                  padding: 10,
                                  backgroundColor: "#e6f7ff",
                                  borderRadius: 6,
                                  marginBottom: 10,
                                }}
                              >
                                <Text style={{ color: "#333" }}>
                                  Stay Duration: {numDays} day
                                  {numDays > 1 ? "s" : ""}
                                </Text>
                                <Text
                                  style={{ color: "#333", fontWeight: "bold" }}
                                >
                                  Allowed Expense: ₹{finalAmount}
                                </Text>
                              </View>
                              <MyTextInput
                                title="Daily Allowances"
                                value={entry.amount}
                                onChangeText={(text) =>
                                  handleGuestHouseChange(index, "amount", text)
                                }
                                placeholder="Enter amount"
                                keyboardType="numeric"
                                inputStyle={{
                                  width: "100%",
                                  borderColor: isInvalid ? "red" : "#ccc",
                                  borderWidth: 1,
                                  borderRadius: 6,
                                  padding: 10,
                                }}
                              />
                              {isInvalid && (
                                <Text style={{ color: "red", marginTop: 4 }}>
                                  You cannot enter more than ₹{finalAmount}
                                </Text>
                              )}
                            </>
                          );
                        })()}
                      </View>
                    )}
                  </>
                )}

                {/* NO section */}
                {entry.guest_house_available === "No" && (
                  <>
                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          handleUploadCertificateFile(
                            index,
                            "certificate_by_district_incharge"
                          )
                        }
                      >
                        <Text
                          style={{
                            color: "#007bff",
                            textDecorationLine: "underline",
                          }}
                        >
                          Upload Occupancy Certificate
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* Show uploaded certificate name below the button */}
                    {guestHouseEntries[index]?.certificate_by_district_incharge
                      ?.name && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: "#e6f7e6",
                          borderWidth: 1,
                          borderColor: "#28a745",
                          borderRadius: 6,
                          marginTop: 8,
                          padding: 8,
                          marginLeft: 4,
                          marginRight: 4,
                        }}
                      >
                        <Text style={{ color: "#155724", flex: 1 }}>
                          {
                            guestHouseEntries[index]
                              .certificate_by_district_incharge.name
                          }
                        </Text>
                        <TouchableOpacity
                          onPress={() => removeCertificateFile(index)}
                          style={{ marginLeft: 10 }}
                        >
                          <Text style={{ color: "red" }}>X Remove</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    <Span style={typography.fontLato}>Check In Date</Span>
                    <Pressable
                      onPress={() =>
                        handleOpenDatePicker(index, "check_in_date")
                      }
                      style={[
                        spacing.pv4,
                        spacing.ph3,
                        spacing.br1,
                        styles.row,
                        spacing.bw1,
                        spacing.mv1,
                        {
                          borderColor: PRIMARY_COLOR,
                          backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                          justifyContent: "space-between",
                          alignItems: "center",
                        },
                      ]}
                    >
                      <Text
                        style={{ color: entry.check_in_date ? "#000" : "#888" }}
                      >
                        {moment(entry.check_in_date).format("DD-MM-YYYY") ||
                          "Select Check In Date"}
                      </Text>
                      <Icon name="calendar" size={20} />
                    </Pressable>

                    <Span style={typography.fontLato}>Check Out Date</Span>
                    <Pressable
                      onPress={() =>
                        handleOpenDatePicker(index, "check_out_date")
                      }
                      style={[
                        spacing.pv4,
                        spacing.ph3,
                        spacing.br1,
                        styles.row,
                        spacing.bw1,
                        spacing.mv1,
                        {
                          borderColor: PRIMARY_COLOR,
                          backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                          justifyContent: "space-between",
                          alignItems: "center",
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: entry.check_out_date ? "#000" : "#888",
                        }}
                      >
                        {moment(entry.check_out_date).format("DD-MM-YYYY") ||
                          "Select Check Out Date"}
                      </Text>
                      <Icon name="calendar" size={20} />
                    </Pressable>

                    {/*Stay Duration and Allowed Expense Calculation */}
                    {entry.check_in_date && entry.check_out_date && (
                      <View
                        style={{
                          padding: 10,
                          backgroundColor: "#e6f7ff",
                          borderRadius: 6,
                          marginBottom: 10,
                          marginTop: 10,
                        }}
                      >
                        {(() => {
                          const allowedPerDay = parseFloat(
                            allowedExpense?.allowed_expense || 0
                          );
                          const finalAmount = parseFloat(
                            allowedPerDay *
                              moment(entry.check_out_date).diff(
                                entry.check_in_date,
                                "days"
                              )
                          ).toFixed(2);

                          // Store finalAmount in entry object for later use
                          entry.calculatedAllowedAmount = finalAmount;

                          return (
                            <>
                              <Text style={{ color: "#333" }}>
                                Stay Duration:{" "}
                                {moment(entry.check_out_date).diff(
                                  entry.check_in_date,
                                  "days"
                                )}{" "}
                                day(s)
                              </Text>
                              <Text
                                style={{
                                  color: "#333",
                                  fontWeight: "bold",
                                  marginTop: 4,
                                }}
                              >
                                Total Allowed Expense: ₹{finalAmount}
                              </Text>
                            </>
                          );
                        })()}
                      </View>
                    )}

                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          handleUploadHotelBillFile(index, "hotel_bill")
                        }
                      >
                        <Text
                          style={{
                            color: "#007bff",
                            textDecorationLine: "underline",
                          }}
                        >
                          Upload Hotel Bill
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* Show uploaded file name from guestHouseEntries + Remove */}
                    {guestHouseEntries[index]?.hotel_bill?.name && (
                      <View
                        style={[
                          styles.row,
                          spacing.br1,
                          spacing.p2,
                          spacing.mt2,
                          {
                            borderWidth: 1,
                            borderColor: "#28a745",
                            backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                            alignItems: "center",
                          },
                        ]}
                      >
                        <Text style={{ color: "#155724", flex: 1 }}>
                          {guestHouseEntries[index].hotel_bill.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => removeHotelBillFile(index)}
                        >
                          <Text style={{ color: "red", marginLeft: 10 }}>
                            X Remove
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {(() => {
                      const allowedLimit = parseFloat(
                        entry.calculatedAllowedAmount || "0"
                      );
                      const enteredAmount = parseFloat(entry.amount || "0");
                      const isInvalid = enteredAmount > allowedLimit;

                      return (
                        <>
                          <MyTextInput
                            title={
                              entry.guest_house_available === "No"
                                ? "Hotel Charges"
                                : "Expense"
                            }
                            value={entry.amount}
                            onChangeText={(text) =>
                              handleGuestHouseChange(index, "amount", text)
                            }
                            placeholder="Enter amount"
                            keyboardType="numeric"
                            inputStyle={{
                              width: "100%",
                              borderColor: isInvalid ? "red" : "#ccc",
                              backgroundColor: "#F0FAF0",
                              borderRadius: 6,
                              height: 54,
                              fontSize: 18,
                              borderColor: PRIMARY_COLOR,
                              borderWidth: 1,
                            }}
                          />

                          {isInvalid && (
                            <Text style={{ color: "red", marginTop: 4 }}>
                              You cannot enter more than ₹{allowedLimit}
                            </Text>
                          )}
                        </>
                      );
                    })()}

                    {entry.guest_house_available === "No" &&
                      (() => {
                        const allowed = parseFloat(
                          entry.calculatedAllowedAmount || "0"
                        );
                        const amount = parseFloat(entry.amount || "0");

                        let other_charges_limit = 0;

                        if (amount >= 0.6 * allowed) {
                          // Case 1: amount is 60% or more
                          other_charges_limit = Math.max(allowed - amount, 0);
                        } else {
                          // Case 2: amount is less than 60%, maintain 60:40 ratio
                          const total = amount / 0.6;
                          other_charges_limit = Math.max(total - amount, 0);
                        }

                        const enteredOtherCharges = parseFloat(
                          entry.other_charges || "0"
                        );
                        const isInvalid =
                          enteredOtherCharges > other_charges_limit;

                        return (
                          <>
                            <MyTextInput
                              title="Other Charges"
                              value={entry.other_charges?.toString() || ""}
                              onChangeText={(text) =>
                                handleGuestHouseChange(
                                  index,
                                  "other_charges",
                                  Number(text)
                                )
                              }
                              placeholder="Enter amount"
                              keyboardType="numeric"
                              inputStyle={{
                                width: "100%",
                                borderColor: isInvalid ? "red" : "#ccc",

                                backgroundColor: "#F0FAF0",
                                borderRadius: 6,
                                height: 54,
                                fontSize: 18,
                                borderColor: PRIMARY_COLOR,
                                borderWidth: 1,
                              }}
                            />

                            <MyTextInput
                              title="Bill Number"
                              value={entry.bill_number}
                              onChangeText={(text) =>
                                handleGuestHouseChange(
                                  index,
                                  "bill_number",
                                  text
                                )
                              }
                              placeholder="Enter Bill Number"
                              inputStyle={{
                                width: "100%",
                                borderColor: "#ccc",

                                backgroundColor: "#F0FAF0",
                                borderRadius: 6,
                                height: 54,
                                fontSize: 18,
                                borderColor: PRIMARY_COLOR,
                                borderWidth: 1,
                              }}
                            />

                            {isInvalid && (
                              <Text style={{ color: "red", marginTop: 4 }}>
                                You cannot enter more than ₹
                                {other_charges_limit.toFixed(2)}
                              </Text>
                            )}
                          </>
                        );
                      })()}
                  </>
                )}

                {guestHouseEntries.length > 1 && (
                  <TouchableOpacity
                    onPress={() => handleRemoveGuestHouse(index)}
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
                )}
              </View>
            ))}

            {/* DateTimePicker shown only once */}
            {datePickerState.visible && (
              <DateTimePicker
                value={new Date()}
                minimumDate={getMinimumDate()}
                maximumDate={getMaximumDate()}
                mode={datePickerState.mode}
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={handleDateChange}
              />
            )}

            {/* Add More Button */}
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
              onPress={handleAddGuestHouse}
            >
              <Text style={{ color: "green" }}>+ Add More</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {activeStep === 3 && (
          <>
            {/* User-friendly heading with context */}

            <View
              style={[
                spacing.mb1,
                spacing.p2,
                spacing.br1,
                {
                  backgroundColor: "#e3f2fd",
                  borderLeftWidth: 5,
                  borderLeftColor: PRIMARY_COLOR,
                },
              ]}
            >
              <H6
                style={[
                  typography.font12,
                  typography.fontLato,
                  typography.textBold,
                ]}
              >
                * Other Travel-Related Expenses (Non-Food)
              </H6>
            </View>

            {expenseEntries.map((entry, index) => {
              const restrictedWordsRegex =
                /\b(food|dine|dinner|lunch|breakfast|snack|meals?)\b/i;

              const isInvalidDescription = (description) => {
                return restrictedWordsRegex.test(description);
              };

              return (
                <View
                  key={index}
                  style={{
                    marginBottom: 8,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    backgroundColor: "#F9FFF9",
                    width: SCREEN_WIDTH - 20,
                  }}
                >
                  {/* Description Input */}
                  <MyTextInput
                    title="Description"
                    value={entry.description}
                    onChangeText={(text) =>
                      handleExpenseChange(index, "description", text)
                    }
                    placeholder="Description"
                    multiline={true}
                    inputStyle={{
                      width: "100%",
                      borderColor: restrictedWordsRegex.test(
                        entry.description || ""
                      )
                        ? "red"
                        : "#ccc",
                      borderWidth: 1,
                      borderRadius: 6,
                      padding: 10,
                    }}
                  />

                  {/* Show validation error */}
                  {restrictedWordsRegex.test(entry.description || "") && (
                    <Text style={{ color: "red", marginTop: 4 }}>
                      Miscellaneous expenses cannot include food, lunch, dinner,
                      etc.
                    </Text>
                  )}

                  {/* Row: Amount + Date */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 10,
                      marginTop: 10,
                    }}
                  >
                    {/* Amount Input */}
                    <View style={{ flex: 1 }}>
                      <MyTextInput
                        title="Amount"
                        value={entry.amount}
                        onChangeText={(text) =>
                          handleExpenseChange(index, "amount", text)
                        }
                        placeholder="Amount"
                        keyboardType="numeric"
                        inputStyle={{ width: "100%" }}
                      />
                    </View>

                    {/* Date of Expense Picker */}
                    <View style={{ flex: 1 }}>
                      <Span style={typography.fontLato}>Date of Expense</Span>
                      <Pressable
                        onPress={() => openExpenseDatePicker(index)}
                        style={[
                          spacing.mv1,
                          spacing.ph3,
                          spacing.br1,
                          styles.row,
                          typography.font18,
                          {
                            borderWidth: 1,
                            borderColor: PRIMARY_COLOR,
                            backgroundColor: PRIMARY_COLOR_TRANSPARENT,
                            alignItems: "center",
                            height: 54,
                          },
                        ]}
                      >
                        <Text
                          style={{
                            color: entry.date_of_expense ? "#000" : "#888",
                          }}
                        >
                          {entry.date_of_expense
                            ? moment(entry.date_of_expense).format("DD-MM-YYYY")
                            : "Select Date "}
                        </Text>
                        <Icon name="calendar" size={20} color="#888" />
                      </Pressable>
                    </View>
                  </View>

                  {/* Remove Button */}
                  {expenseEntries.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeExpenseEntry(index)}
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
                  )}
                </View>
              );
            })}

            {/* Add More Button */}
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
              onPress={addExpenseEntry}
            >
              <Text style={{ color: "green" }}>+ Add More</Text>
            </TouchableOpacity>

            {/* Date Picker Modal */}
            {expenseDatePicker.show && (
              <DateTimePicker
                value={new Date()}
                minimumDate={moment(form.date_of_departure).toDate()}
                maximumDate={moment(form.date_of_return).toDate()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setExpenseDatePicker({ ...expenseDatePicker, show: false });
                  if (selectedDate) {
                    const formatted = selectedDate.toISOString().split("T")[0];
                    handleExpenseChange(
                      expenseDatePicker.index,
                      "date_of_expense",
                      formatted
                    );
                  }
                }}
              />
            )}

            <View
              style={{
                marginBottom: 10,
                padding: 12,
                backgroundColor: "#e3f2fd",
                borderLeftWidth: 5,
                borderLeftColor: PRIMARY_COLOR,
                borderRadius: 6,
              }}
            >
              <P
                style={[
                  typography.font12,
                  typography.fontLato,
                  typography.textBold,
                  {
                    color: "#0d47a1",
                  },
                ]}
              >
                Please read the following before adding Miscellaneous Expenses:
              </P>

              <P style={[typography.font12, typography.fontLato, spacing.mb1]}>
                • Add only expenses not covered under Tickets or Stay.
              </P>
              <P
                style={[
                  typography.font12,
                  typography.fontLato,
                  spacing.mb1,
                  { color: "red" },
                ]}
              >
                • Do not include food, lunch, dinner, snacks, or similar items.
              </P>
              <P style={[typography.font12, typography.fontLato, spacing.mb1]}>
                • Only genuine additional costs like printing, taxi, courier
                etc. are allowed.
              </P>
            </View>

            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              <Checkbox
                status={agree ? "checked" : "unchecked"}
                onPress={() => setAgree(!agree)}
                color={PRIMARY_COLOR}
              />
              <P
                style={[
                  typography.font12,
                  typography.fontLato,
                  typography.textBold,
                ]}
              >
                I agree Terms & Conditions
              </P>
            </View>

            {/* Submit Button */}
            <Button
              style={[
                styles.btn,
                styles.bgPrimary,
                { justifyContent: "center" },
              ]}
              onPress={handleSubmit}
            >
              <H2
                style={[styles.btnText, styles.textLarge, typography.textLight]}
              >
                Preview Details & Submit
              </H2>
            </Button>
          </>
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
