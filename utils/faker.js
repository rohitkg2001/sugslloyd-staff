import { Alert } from "react-native";

export const fakeDelete = ({
  title,
  message,
  negativeTextClick = null,
  positiveText,
  positiveTextClick = null,
}) => {
  Alert.alert(title, message, [
    { text: "Cancel", style: "cancel", onPress: negativeTextClick },
    { text: positiveText, onPress: positiveTextClick },
  ]);
};
// Static method

export function transformArray(inputArray) {
  return inputArray.map((item) => ({
    label: item.name, // Concatenate firstName and lastName
    value: item.id, // Use id as value
  }));
}

//export const blocks = [];
//export const panchayats = [];
//export const wards = [];

export const SiteFields = [
  {
    title: "site_location",
    fieldName: "location",
    placeholder: "Enter Location",
    keyboardType: "text",
  },
  {
    title: "site_Projectcode",
    fieldName: "project_id",
    placeholder: "Enter Project Code",
    keyboardType: "text",
  },
  {
    title: "site_name",
    fieldName: "site_name",
    placeholder: "Enter Site Name",
    keyboardType: "text",
  },
  {
    title: "site_projectcapacity",
    fieldName: "project_capacity",
    placeholder: "Enter Project Capacity",
    keyboardType: "numeric",
  },
  {
    title: "site_I&CVendorName",
    fieldName: "ic_vendor_name",
    placeholder: "Enter I & C Vendor Name",
    keyboardType: "text",
  },
  {
    title: "site_canumber",
    fieldName: "ca_number",
    placeholder: "Enter CA Number",
    keyboardType: "text",
  },
  {
    title: "site_engineer",
    fieldName: "site_engineer",
    placeholder: "Enter Site Engineer",
    keyboardType: "text",
  },
  {
    title: "sanction_load",
    fieldName: "sanction_load",
    placeholder: "Enter Sanctioned Load",
    keyboardType: "numeric",
  },
  {
    title: "meter_no",
    fieldName: "meter_number",
    placeholder: "Enter Meter Number",
  },
  {
    title: "net_meterserialnumber",
    fieldName: "net_meter_sr_no",
    placeholder: "Net Meter Sl No.",
  },
  {
    title: "solar_meterserialnumber",
    placeholder: "Solar Meter Sl No",
    fieldName: "solar_meter_sr_no",
  },
  {
    title: "site_ContactNo",
    placeholder: "Enter Contact No.",
    fieldName: "contact_no",
    keyboardType: "numeric",
  },
];

export const menuItems = [
  {
    label: "project_overview",
    icon: "reader-outline",
    page: "totalProjectsScreen",
  },
  {
    label: "target_management",
    icon: "tennisball-outline",
    page: "targetManagementScreen",
  },
  // {
  //   label: "site_management_title",
  //   icon: "map-outline",
  //   page: "totalSitesScreen",
  // },

  {
    label: "conveyance_management",
    icon: "calculator-outline",
    page: "conveyanceManagement",
  },
  {
    label: "travel_allowance_management",
    icon: "map-outline",
    page: "travelManagement",
  },

  {
    label: "inventory_title",
    icon: "cart-outline",
    page: "inventoryScreen",
  },
  {
    label: "task_management_title",
    icon: "grid-outline",
    page: "taskScreen",
  },

  {
    label: "vendor_management_title",
    icon: "people-outline",
    page: "totalVendorsScreen",
  },

  {
    label: "report_title",
    page: "reportScreen",
    icon: "pie-chart-outline",
  },
  {
    label: "settings",
    icon: "cog-outline",
    page: "InternalSetting",
  },
];
// Static

export const internal = [
  // {
  //   label: "notification_title",
  //   page: "notificationScreen",
  //   icon: "notifications-outline",
  // },
  {
    label: "privacy_policy_title",
    page: "privacyPolicy",
    icon: "shield-checkmark-outline",
  },
];
// Static

export const PageData = [
  {
    description:
      "Streamline Your Projects with Sugs Lloyd – Efficiency at Its Best!",
  },

  {
    id: 1,
    text: "Manage & Track Projects Anytime, Anywhere!",
  },
  {
    id: 2,
    text: "Stay Updated – Receive Tasks & Progress Instantly!",
  },
  {
    id: 3,
    text: "Share Work Details with Real-Time Location & Visuals!",
  },
  {
    id: 4,
    text: "Keep a Sharp Eye on Your Stock Levels with Ease!",
  },
];
// Static

export const projects = [
  {
    id: 1,
    projectName: "Breda",
    workOrderNumber: "P0763e",
    startDate: "26-Nov-2024",
    price: "3L",
    sites: [1, 2],
    vendor: [1],
    tasks: [1, 2],
  },
];
// INcoming from database

export const totalsitesData = [
  {
    id: 1,
    site_name: "P S SHIKSHA NAGAR BANMANKHI",
    state: "Bihar",
    dist: "Purnia",
    location: "BANMANKHI",
    project_serial_code: "12",
    project_capacity: "30",
    ca_number: "CA123456",
    contact_no: "9199502622",
    ic_vendor_name: "Pankaj Singh",
    sanction_load: "5 kW",
    meter_number: "123456789",
    load_enhancement_status: "Approved",
    site_survey_status: "Done",
    net_meter_sr_no: "NM-987654",
    solar_meter_sr_no: "SM-543210",
    material_inspection_date: "2024-11-20",
    spp_installation_date: "2024-11-25",
    commissioning_date: "2024-11-30",
    remarks: "All systems operational and inspected.",
  },
  {
    id: 2,
    site_name: "Gyan Kendra High School",
    state: "Uttar Pradesh",
    dist: "Varanasi",
    location: "Lanka",
    geo: {
      lat: 25.2902024,
      lng: 82.9832034,
    },
    project_serial_code: "45",
    project_capacity: "50",
    ca_number: "CA789101",
    contact_no: "9123456789",
    ic_vendor_name: "Rajesh Kumar",
    sanction_load: "10 kW",
    meter_number: "AB123456789",
    load_enhancement_status: "Pending Approval",
    site_survey_status: "Pending",
    net_meter_sr_no: "NM20241127001",
    solar_meter_sr_no: "SM20241127002",
    material_inspection_date: "2024-11-25",
    spp_installation_date: "2024-12-05",
    commissioning_date: "2024-12-10",
    remarks: "Site survey and installation scheduled as per plan.",
  },
];
// INcoming from database
export const vendors = [
  {
    id: 1,
    firstName: "Rakesh",
    lastName: "Sharma",
    name: "Rakesh Sharma",
    contactPerson: "Amit Kumar",
    contactNumber: "9876543210",
    aadharNumber: "1234-5678-9101",
    accountName: "Rakesh Sharma",
    accountNumber: "123456789012",
    ifsc: "SBIN0001234",
    bankName: "State Bank of India",
    gstNumber: "07ABCDE1234F1Z5",
    panNumber: "ABCDE1234F",
    userType: "vendor",
    role: 3,
    email: "rakesh.sharma@gmail.com",
    password: "12345678",
    status: "Active",
    disableLogin: 0,
    address: "123 gali, Jhajjar, Haryana",
    lastOnline: "2024-10-03 05:41:49",
    createdDate: "2024-11-22",
  },
];
// INcoming from database

export const inventoryData = [
  {
    id: 1,
    projectId: 1,
    siteId: 1,
    productName: "Solar LED Street Light",
    initialQuantity: "1000 pieces",
    quantityStock: "1000",
    category: "Lighting",
    sub_category: "Solar Products",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfaVettxgHxUSbCpPamGNdUB8g_9t_qYFhgQ&s",
  },
  {
    id: 2,
    projectId: 1,
    siteId: 1,
    productName: "Smart Street Light System",
    initialQuantity: "1000 pcs",
    quantityStock: "200",
    category: "Lighting",
    sub_category: "IoT Systems",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_L6YoAFI4q74AoE5ijHorzYQF4ZgI7rvwhg&s",
  },
];
//USING INVENTORY DATA NO NEED TO USE ITS PHOTO

// INcoming from database

export const documentData = [
  {
    id: "1",
    staffId: 1,
    documentName: "Offer Letter",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "2",
    staffId: 1,
    documentName: "Appointment Letter",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "3",
    staffId: 1,
    documentName: "Bond Agreement",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
  {
    id: "4",
    staffId: 1,
    documentName: "Appraisal Letter",
    documentImage:
      "https://static.dexform.com/media/docs/6915/sample-job-offer-letter_1.png",
  },
];
// INcoming from database

export const taskslistdata = [
  {
    id: 1,
    projectName: "Project Alpha",
    taskName: "Design Phase",
    deadline: "2024-11-20",
    status: "In Progress",
    startDate: "2024-10-01",
    endDate: "2024-12-15",
  },
  {
    id: 2,
    projectName: "Project Beta",
    taskName: "Development Phase",
    deadline: "2024-12-01",
    status: "Completed",
    startDate: "2024-09-01",
    endDate: "2024-12-01",
  },
];
// INcoming from database

export const PRIVACY_POLICY = "lorem ipsum sit dolor amet";
// INcoming from database

export const notifications = [
  {
    id: "1",
    title: "You updated your profile picture",
    description: "You just updated your profile picture.",
    icon: "account",
    time: "Just Now",
  },
  {
    id: "2",
    title: "Password Changed",
    description: "You’ve completed changing the password.",
    icon: "lock-reset",
    time: "2 oct,22:22 Pm",
  },
  {
    id: "3",
    title: "Subham Applied for Leave",
    description: "Please accept my leave request.",
    icon: "account-circle",
    time: "23 sept",
  },
  {
    id: "4",
    title: "System Update",
    description: "Please update to the newest app for a better experience.",
    icon: "cellphone-information",
    time: "25 sept,21:22 Pm",
  },
];
// Event generated
// 1. Task submitted by vendor
// 2. Task submitted to vendor

export const siteCardsForDashboard = [
  {
    id: 1,
    name: "total_sites",
    count: totalsitesData.length,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#f9caa7",
    status: 1,
  },
  {
    id: 2,
    name: "completed_sites",
    count: totalsitesData.length,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#ffeead",
  },
  {
    id: 3,
    name: "in_progress_sites",
    count: totalsitesData.length,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#bdeaee",
  },
  {
    id: 4,
    name: "pending_sites",
    count: totalsitesData.length,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#ffbbee",
  },
];
// Event generated

export const vendorCardForDashboard = [
  {
    id: "1",
    title: "total_vendors",
    count: 1,
    page: "totalVendorsScreen",
    data: vendors,
    backgroundColor: "#FFB7B2",
  },
  {
    id: "2",
    title: "active_vendors",
    count: 1,
    page: "totalVendorsScreen",
    data: vendors,
    backgroundColor: "#B6F4D3",
  },
  {
    id: "3",
    title: "inactive_vendors",
    count: 0,
    page: "totalVendorsScreen",
    data: vendors,
    backgroundColor: "#C4C3D0",
  },
];
// Event generated

// Event generated
export const staff = {
  id: 1,
  firstName: "Rakesh",
  lastName: "Sharma",
  userType: "staff",
  isAdmin: 0,
  roleId: 1,
  // 0-admin,1-staff/store incharge, 2-project manager, 3-vendor
  email: "rakesh.sharma@gmail.com",
  password: "12345678",
  image: "https://randomuser.me/api/portraits/men/1.jpg",
  status: "active",
  disableLogin: 0,
  address: "123 gali, jhajjar, Haryana",
  contactNo: "9909230912",
  lastOnline: "2024-10-03 05:41:49",
  createdAt: "",
  updatedAt: "",
};

// data/targetManagementData.js

export const targetManagementData = [
  {
    id: 1,
    projectName: "Breada",
    allocatedTo: "Akash",
    deadline: "2024-12-31",
    totalSites: 5,
    siteengineer: "Akash",
    activity: "Installation",
    total: 1,
    completed: 1,
    pending: 0,
    completedPhotos: [
      "https://preview.redd.it/some-images-generated-using-the-new-bing-image-creator-v0-zfohxnf8t3pa1.jpg?width=1024&format=pjpg&auto=webp&s=33274aadae0e0332e60dd15c87617ea6652365b5",
      "https://example.com/photo2.jpg",
    ],
    incompleteRemark: "Delay due to weather conditions",
  },
  {
    id: 2,
    projectName: "Solar",
    allocatedTo: "Himanshu",
    deadline: "2024-12-31",
    totalSites: 4,
    siteengineer: "Himanshu",
    total: 1,
    completed: 0,
    pending: 1,
    activity: "Final Inspection",
    completedPhotos: ["https://example.com/photo2.jpg"],
    incompleteRemark: "Shortage of materials",
  },
];

export const sitesData = [
  {
    siteName: "Breda",
    location: "123 Street",
    city: "Patna",
    state: "Bihar",
    vendor: "Vikash",
    contactNo: "8723095634",
    status: "Complete",
  },
  {
    siteName: "Solar",
    location: "456 Avenue",
    state: "Bihar",
    city: "samastipur",
    vendor: "rahul",
    contactNo: "9823764534",
    status: "Pending",
  },
];

export { blocks, panchayats, wards };
const blocks = {
  Patna: [
    { label: "Patna Sadar", value: "Patna Sadar" },
    { label: "Danapur", value: "Danapur" },
    { label: "Phulwari Sharif", value: "Phulwari Sharif" },
    { label: "Paliganj", value: "Paliganj" },
    { label: "Masaurhi", value: "Masaurhi" },
  ],
  district2: [
    { label: "Gaya Sadar", value: "block1" },
    { label: "Bodh Gaya", value: "block2" },
    { label: "Belaganj", value: "block3" },
    { label: "Khizersarai", value: "block4" },
    { label: "Sherghati", value: "block5" },
  ],
};

const panchayats = {
  Patna: [
    { label: "Fatehpur", value: "Fathehpur" },
    { label: "Mahauli", value: "panchayat2" },
    { label: "Marchi", value: "panchayat3" },
    { label: "Punadih", value: "panchayat4" },
  ],
  district2: [
    { label: "Gaya Sadar", value: "panchayat1" },
    { label: "Bodh Gaya", value: "panchayat2" },
    { label: "Sherghati", value: "panchayat3" },
    { label: "Tekari", value: "panchayat4" },
    { label: "Manpur", value: "panchayat5" },
    { label: "Rafiganj", value: "panchayat6" },
    { label: "Dumaria", value: "panchayat7" },
    { label: "Belaganj", value: "panchayat8" },
  ],
};

const wards = {
  Patna: [
    { label: "Ward 1", value: "Ward 1" },
    { label: "Ward 2", value: "ward2" },
    { label: "Ward 3", value: "ward3" },
    { label: "Ward 4", value: "ward4" },
    { label: "Ward 5", value: "ward5" },
  ],
  district2: [
    { label: "Ward 1", value: "ward1" },
    { label: "Ward 2", value: "ward2" },
    { label: "Ward 3", value: "ward3" },
    { label: "Ward 4", value: "ward4" },
    { label: "Ward 5", value: "ward5" },
  ],
};

// utils/fakerData.js

// export const fakerData = [
//   {
//     district: "KATIHAR,KATIHAR,KATIHAR,KATIHAR,KATIHAR,KATIHAR,KATIHAR,KATIHAR",
//     solarPanel:
//       "SP001, SP002, SP003, SP004, SP005, SP006, SP007, SP008, SP009, SP010",
//     battery: "B001, B002, B003, B004, B005, B006, B007, B008, B009, B010",
//     light: "L001, L002, L003, L004, L005, L006, L007, L008, L009, L010",
//     sim: "SIM001, SIM002, SIM003, SIM004, SIM005, SIM006, SIM007, SIM008, SIM009, SIM010",
//     pin: "123456, 223456, 323456, 423456, 523456, 623456, 723456, 823456, 923456, 1023456",
//     pole: "P001, P002, P003, P004, P005, P006, P007, P008, P009, P010",
//   },
// ];

export const fakerData = [
  {
    district:
      "KATIHAR, KATIHAR, KATIHAR, KATIHAR, KATIHAR, KATIHAR, KATIHAR, KATIHAR, KATIHAR, KATIHAR",
    block:
      "PRANPUR, PRANPUR, PRANPUR, PRANPUR, PRANPUR, PRANPUR, PRANPUR, PRANPUR, PRANPUR, PRANPUR",
    panchayat:
      "BASTOL, BASTOL, BASTOL, BASTOL, BASTOL, BASTOL, BASTOL, BASTOL, BASTOL, BASTOL",
    wardNo:
      "WARD1, WARD2, WARD3, WARD4, WARD5, WARD6, WARD7, WARD8, WARD9, WARD10",
    nearestHouse:
      "HOUSE1, HOUSE2, HOUSE3, HOUSE4, HOUSE5, HOUSE6, HOUSE7, HOUSE8, HOUSE9, HOUSE10",
    latitude:
      "25.1234, 25.2234, 25.3234, 25.4234, 25.5234, 25.6234, 25.7234, 25.8234, 25.9234, 26.0234",
    longitude:
      "87.1234, 87.2234, 87.3234, 87.4234, 87.5234, 87.6234, 87.7234, 87.8234, 87.9234, 88.0234",
    installationDate:
      "2023-01-01, 2023-02-01, 2023-03-01, 2023-04-01, 2023-05-01, 2023-06-01, 2023-07-01, 2023-08-01, 2023-09-01, 2023-10-01",
    solarPanel:
      "SP001, SP002, SP003, SP004, SP005, SP006, SP007, SP008, SP009, SP010",
    battery: "B001, B002, B003, B004, B005, B006, B007, B008, B009, B010",
    light: "L001, L002, L003, L004, L005, L006, L007, L008, L009, L010",
    sim: "SIM001, SIM002, SIM003, SIM004, SIM005, SIM006, SIM007, SIM008, SIM009, SIM010",
    pin: "123456, 223456, 323456, 423456, 523456, 623456, 723456, 823456, 923456, 1023456",
    pole: "P001, P002, P003, P004, P005, P006, P007, P008, P009, P010",
    state:
      "BIHAR, BIHAR, BIHAR, BIHAR, BIHAR, BIHAR, BIHAR, BIHAR, BIHAR, BIHAR",
  },
];

export const executingAgencyData = [
  {
    agencyName: "SUGS LLOYD India Ltd.",
    fullAddress: "123 Main Street, City, Country",
    contactPerson: "Zaid",
    mobileNo: "9823094532",
    latitude: "98.4587",
    longitude: "97.4576",
    dateOfInstallation: "2025-23-01",
    warranteeExpire: "2030-23-01",
    serviceCentreInfo:
      "Rambhajan Warehouse , Ranipur Paijaba, Ganga Pardushan Road , Near ramjivan Chauk ,",
    details: " Javganj,  Patna City, Patna, Bihar, 800008",
  },
];

export const travelPlans = [
  {
    title: "Delhi - Patna",
    trip_schedule: "Feb 12 - Feb 14 • 2 days",
  },
  {
    title: "Patna - Agra",
    trip_schedule: "Feb 19 - Feb 22 • 3 days",
  },
  {
    title: "Mumbai - Goa",
    trip_schedule: "Mar 5 - Mar 8 • 3 days",
  },
  {
    title: "Chennai - Hyderabad",
    trip_schedule: "Mar 12 - Mar 15 • 3 days",
  },
];

export const travel = [
  {
    id: 1,
    pickupLocation: "Patna Golghar",
    dropoffLocation: "Patna Airport",
    date: "2025-02-17",
    time: "14:30 Pm",
   // price: 150,
    distance: "7 km",
    modeOfTransport: "Car",
  },
  {
    id: 1,
    pickupLocation: "Patna Golgharrr",
    dropoffLocation: "Patna Airport",
    date: "2025-02-21",
    time: "14:30 Pm",
  //  price: 150,
    distance: "7 km",
    modeOfTransport: "Car",
  },
];

// conveyanceData.js

export const conveyanceData = [
  {
    id: 1,
    pickupLocation: "Patna Golghar",
    dropoffLocation: "Patna Airport",
    date: "2025-02-21",
    time: "14:30 Pm",
    price: 150,
  },
];
