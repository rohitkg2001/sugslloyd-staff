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

export const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "This is task 1",
    count: 28,
    status: "Total Projects ",
    page: "totalProjectsScreen",
    backgroundColor: "#A0D3E8",
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is task 2",
    count: 31,
    status: "Total Earning",
    page: "totalEarningScreen",
    backgroundColor: "#C8E6C9",
  },

  {
    id: 7,
    title: "Task 6",
    description: "This is task 5",
    count: 67,
    status: "Total Vendors",
    page: "totalVendorsScreen",
    backgroundColor: "#FFB7B2",
  },
  {
    id: 8,
    title: "Task 6",
    description: "This is task 5",
    count: 53,
    status: "Active Vendors",
    page: "activeVendorsScreen",
    backgroundColor: "#B6F4D3",
  },
  {
    id: 9,
    title: "Task 6",
    description: "This is task 5",
    count: 10,
    status: "Inactive Vendors",
    page: "inactiveVendorsScreen",
    backgroundColor: "#C4C3D0",
  },
  {
    id: 10,
    title: "Task 6",
    description: "This is task 5",
    count: 4,
    status: "Blocklisted Vendor",
    page: "blockListedVendorsScreen",
    backgroundColor: "#F5F5DC",
  },
];

export const project = [
  {
    id: 1,
    projectName: "Project 01B",
    workOrderNumber: "12345",
    rate: "100",
    date: "",
  },
  {
    id: 2,
    projectName: "Project 02B",
    duration: "5 days",
    status: "completed",
    projectSerial: "",
    siteName: "Site Alpha",
    sanctionLoad: "",
    projectCapacity: "",
    caNumber: "",
    surveyStatus: "",
    contactNo: "",
    solarMeterSerial: "",
    vendorName: "Md. Sohail Ansari",
  },
  {
    id: 3,
    projectName: "Project 03C",
    duration: "3 days",
    status: "ongoing",
    siteName: "Site Beta",
    vendorName: "Ayush Ranjan",
  },
  {
    id: 4,
    projectName: "Project 04D",
    duration: "7 days",
    status: "completed",
    siteName: "Site Gamma",
    vendorName: "Md Munna",
  },
  {
    id: 5,
    projectName: "Project 05E",
    duration: "4 days",
    status: "ongoing",
    siteName: "Site Delta",
    vendorName: "Suresh Tripathy",
  },
  {
    id: 6,
    projectName: "Project 06F",
    duration: "6 days",
    status: "ongoing",
    siteName: "Site Omega",
  },
  {
    id: 7,
    projectName: "Project 07G",
    duration: "1 day",
    status: "completed",
    siteName: "Site Alpha",
  },
  {
    id: 8,
    projectName: "Project 08H",
    duration: "8 days",
    status: "ongoing",
    siteName: "Site Beta",
  },
  {
    id: 9,
    projectName: "Project 09I",
    duration: "10 days",
    status: "completed",
    siteName: "Site Gamma",
  },
  {
    id: 10,
    projectName: "Project 10J",
    duration: "3 days",
    status: "ongoing",
    siteName: "Site Omega",
  },
];

export const inventoryData = [
  {
    id: 1,
    projectId: 1,
    siteId: 1,
    product_name: "Solar LED Street Light",
    description: "Eco-friendly solar-powered street light with motion sensor.",
    unit: "pcs",
    initial_quantity: "1000",
    qty_stock: "1000",
    material_dispatch_date: "20 Nov 2024",
    delivery_date: "20 Nov 2024",
    allocation_officer: "Bittu Gupta",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfaVettxgHxUSbCpPamGNdUB8g_9t_qYFhgQ&s",
  },
  {
    id: 2,
    projectId: 1,
    siteId: 1,
    product_name: "Smart Street Light System",
    description: "Automated street light system with IoT connectivity.",
    unit: "pcs",
    initial_quantity: "1000",
    qty_stock: "200",
    material_dispatch_date: "20 Nov 2024",
    delivery_date: "24 Nov 2024",
    allocation_officer: "Bittu Mishra",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_L6YoAFI4q74AoE5ijHorzYQF4ZgI7rvwhg&s",
  },
];

export const earnings = [
  {
    id: 1,
    projectName: "Solar Lighting Installation for Homes",
    totalEarnings: 12034,
    completionDate: "2023-10-10",
  },
  {
    id: 2,
    projectName: "Community Solar Street Lights Project",
    totalEarnings: 8500.0,
    completionDate: "2023-09-15",
  },
  {
    id: 3,
    projectName: "Solar Panel Setup for Schools",
    totalEarnings: 4730.75,
    completionDate: "2023-08-20",
  },
  {
    id: 4,
    projectName: "Solar Energy Solutions for Farms",
    totalEarnings: 20500.0,
    completionDate: "2023-07-30",
  },
  {
    id: 5,
    projectName: "Solar Roof Panels for Businesses",
    totalEarnings: 13500.25,
    completionDate: "2023-06-12",
  },
  {
    id: 6,
    projectName: "Solar Roof Panels for Businesses",
    totalEarnings: 13500.25,
    completionDate: "2023-06-12",
  },
  {
    id: 7,
    projectName: "Solar Roof Panels for Businesses",
    totalEarnings: 13500.25,
    completionDate: "2023-06-12",
  },
  {
    id: 8,
    projectName: "Solar Roof Panels for Businesses",
    totalEarnings: 13500.25,
    completionDate: "2023-06-12",
  },
  {
    id: 9,
    projectName: "Solar Roof Panels for Businesses",
    totalEarnings: 13500.25,
    completionDate: "2023-06-12",
  },
  {
    id: 10,
    projectName: "Solar Roof Panels for Businesses",
    totalEarnings: 13500.25,
    completionDate: "2023-06-12",
  },
];

export const menuItems = [
  {
    label: "inventory_title",
    icon: "cart-outline",
    page: "inventoryScreen",
  },
  {
    label: "site_management_title",
    icon: "map-outline",
    page: "totalSitesScreen",
  },
  {
    label: "vendor_management_title",
    icon: "people-outline",
    page: "totalVendorsScreen",
  },
  {
    label: "project_management_title",
    icon: "reader-outline",
    page: "totalProjectsScreen",
  },
  {
    label: "task_management_title",
    page: "",
    icon: "grid-outline",
    page: "taskScreen",
  },
  {
    label: "report_title",
    page: "",
    icon: "pie-chart-outline",
  },
  {
    label: "setting",
    page: "",
    icon: "cog-outline",
    page: "InternalSetting",
  },
];

export const internal = [
  {
    label: "Notification",
    page: "notificationScreen",
    icon: "notifications-outline",
  },
  { label: "Privacy", page: "privacyPolicy", icon: "shield-checkmark-outline" },
];

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

export const staff = {
  id: 1,
  first_name: "Rakesh",
  last_name: "Sharma",
  user_type: "staff",
  is_admin: 0,
  role_id: 0,
  email: "rakesh.sharma@gmail.com",
  password: "12345678",
  image: "https://randomuser.me/api/portraits/men/1.jpg",
  status: "active",
  job_title: "Technical Assistant",
  salary: "20000",
  salary_term: "Monthly",
  Date_of_hire: "2024-08-27",
  disable_login: 0,
  note: [],
  address: "123 gali, jhajjar, Haryana",
  alternative_address: "",
  contactNo: "9909230912",
  alternative_phone: "",
  dob: "",
  gender: "male",
  sticky_note: [],
  skype: "",
  language: "",
  last_online: "2024-10-03 05:41:49",
  file: "file-pdf",
  size: "",
  uploaded_by: "rakesh sharma",
  created_date: "",
};

export const totalsitesData = [
  {
    id: 1,
    siteName: "P S SHIKSHA NAGAR BANMANKHI",
    State: "",
    City: "",
    dist: "Purnia",
    location: "BANMANKHI",
    ProjectSerialCode: "12",
    ProjectCapacity: "30",
    CANumber: "",
    ContactNo: "9199502622",
    ICVendorName: "",
  },
  {
    id: 2,
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: 3,
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: 4,
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: 5,
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
];

export const vendors = [
  {
    id: 1,
    first_name: "Rakesh",
    last_name: "Sharma",
    name: "Rakesh Sharma",
    contact_person: "Amit Kumar",
    contact_number: "9876543210",
    aadhar_number: "1234-5678-9101",
    account_name: "Rakesh Sharma",
    account_number: "123456789012",
    ifsc: "SBIN0001234",
    bank_name: "State Bank of India",
    gst_number: "07ABCDE1234F1Z5",
    pan_number: "ABCDE1234F",
    user_type: "vendor",
    is_admin: 0,
    role_id: 1,
    email: "rakesh.sharma@gmail.com",
    password: "12345678",
    status: "active",
    disable_login: 0,
    address: "123 gali, Jhajjar, Haryana",
    last_online: "2024-10-03 05:41:49",
    created_date: "2024-11-22",
  },
  {
    id: 2,
    first_name: "Manoj",
    last_name: "Kumar",
    name: "Manoj Kumar",
    contact_person: "Suresh Singh",
    contact_number: "9123456789",
    aadhar_number: "5678-9101-1234",
    account_name: "Manoj Kumar",
    account_number: "987654321098",
    ifsc: "ICIC0005678",
    bank_name: "ICICI Bank",
    gst_number: "08FGHIJ5678K1Z6",
    pan_number: "FGHIJ5678K",
    user_type: "vendor",
    is_admin: 0,
    role_id: 1,
    email: "manoj.kumar@gmail.com",
    password: "password123",
    status: "active",
    disable_login: 0,
    address: "45B, Sector 15, Gurugram, Haryana",
    last_online: "2024-10-04 06:22:30",
    created_date: "2024-11-22",
  },
  {
    id: 3,
    first_name: "Seema",
    last_name: "Verma",
    name: "Seema Verma",
    contact_person: "Pooja Sharma",
    contact_number: "9012345678",
    aadhar_number: "9101-1234-5678",
    account_name: "Seema Verma",
    account_number: "654321987654",
    ifsc: "PNB0004321",
    bank_name: "Punjab National Bank",
    gst_number: "09JKLMN9876L1Z7",
    pan_number: "JKLMN9876L",
    user_type: "vendor",
    is_admin: 0,
    role_id: 1,
    email: "seema.verma@gmail.com",
    password: "securepass",
    status: "active",
    disable_login: 0,
    address: "67C, Near Market, Rohtak, Haryana",
    last_online: "2024-10-05 08:15:20",
    created_date: "2024-11-22",
  },
  {
    id: 4,
    first_name: "Arjun",
    last_name: "Singh",
    name: "Arjun Singh",
    contact_person: "Vikas Yadav",
    contact_number: "8901234567",
    aadhar_number: "1234-9101-5678",
    account_name: "Arjun Singh",
    account_number: "321654987321",
    ifsc: "HDFC0008765",
    bank_name: "HDFC Bank",
    gst_number: "10OPQRS7654P1Z8",
    pan_number: "OPQRS7654P",
    user_type: "vendor",
    is_admin: 0,
    role_id: 1,
    email: "arjun.singh@gmail.com",
    password: "arjunpass123",
    status: "active",
    disable_login: 0,
    address: "23D, Industrial Area, Karnal, Haryana",
    last_online: "2024-10-06 09:10:15",
    created_date: "2024-11-22",
  },
];


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

export const PRIVACY_POLICY = "lorem ipsum sit dolor amet";

export const siteCardsForDashboard = [
  {
    id: 1,
    title: "Total Sites",
    name: "total_sites",
    count: 46,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#f9caa7",
    status: 1,
  },
  {
    id: 2,
    title: "Completed Sites",
    count: 17,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#ffeead",
  },
  {
    id: 3,
    title: "Sites in Progress",
    count: 22,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#bdeaee",
  },
  {
    id: 4,
    title: "Pending Sites",
    count: 7,
    page: "totalSitesScreen",
    data: totalsitesData,
    backgroundColor: "#ffbbee",
  },
];

export const vendorCardForDashboard = [
  {
    id: "1",
    title: "total_vendors",
    count: 67,
    page: "totalVendorsScreen",
    data: vendors,
    backgroundColor: "#FFB7B2",
  },
  {
    id: "2",
    title: "active_vendors",
    count: 53,
    page: "totalVendorsScreen",
    data: vendors,
    backgroundColor: "#B6F4D3",
  },
  {
    id: "3",
    title: "inactive_vendors",
    count: 10,
    page: "totalVendorsScreen",
    data: vendors,
    backgroundColor: "#C4C3D0",
  },
];

// statuscode=0->Project,
//statuscode = 1 -> Site,
//statuscode = 2 -> Completed ,
//statuscode = 3 -> Pending

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
