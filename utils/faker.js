import {
  DANGER_COLOR,
  INFO_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
} from "../styles/constant";

export const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "This is task 1",
    count: 28,
    status: "Total Projects ",
    backgroundColor: "#A0D3E8",
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is task 2",
    count: 31,
    status: "Total Earning",
    backgroundColor: "#C8E6C9",
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is task 3",
    count: 24,
    status: "Total Sites",
    backgroundColor: "#f9caa7",
  },
  {
    id: 4,
    title: "Task 4",
    description: "This is task 4",
    count: 7,
    status: "Inventory",
    backgroundColor: "#ffeead",
  },
  {
    id: 5,
    title: "Task 5",
    description: "This is task 5",
    count: 24,
    status: "In Review",
    backgroundColor: "#bdeaee",
  },
  {
    id: 6,
    title: "Task 6",
    description: "This is task 5",
    count: 7,
    status: "Events",
    backgroundColor: "#ffbbee",
  },
];
export const categories = [
  {
    id: "1",
    label: "Installation",
    icon: "layers-outline",
    count: 5, 
  },
  {
    id: "2",
    label: "Fixing Slip",
    icon: "grid-outline",
    count: 3, 
  },
  {
    id: "3",
    label: "RMS Status",
    icon: "cart-outline",
    count: 2,
  },
  {
    id: "4",
    label: "Final Inspection",
    icon: "document-text-outline",
    count: 1,
  },
  {
    id: "5",
    label: "Report",
    icon: "pie-chart-outline",
    count: 4,
  },
];

export const project = [
  { id: 1, projectName: "Project 01A", duration: "2 days", status: "ongoing" },
  { id: 2, projectName: "Project 02B", duration: "5 days", status: "completed" },
  { id: 3, projectName: "Project 03C", duration: "3 days", status: "ongoing" },
  { id: 4, projectName: "Project 04D", duration: "7 days", status: "completed" },
  { id: 5, projectName: "Project 05E", duration: "4 days", status: "ongoing" },
  { id: 6, projectName: "Project 06F", duration: "6 days", status: "ongoing" },
  { id: 7, projectName: "Project 07G", duration: "1 day", status: "completed" },
  { id: 8, projectName: "Project 08H", duration: "8 days", status: "ongoing" },
  { id: 9, projectName: "Project 09I", duration: "10 days", status: "completed" },
  { id: 10, projectName: "Project 10J", duration: "3 days", status: "ongoing" },
];

export const projecttask = [
  {
    id: 1,
    projectName: "Project 01A",
    siteName: " SBI Bank , Rampur School , Lakhisarai",
  
  },
  {
    id: 2,
    projectName: "Project 02B",
    siteName: "Block Office, Shershah Road ,Madhepura",
   
  },
  {
    id: 3,
    projectName: "Project 03C",
    siteName: "Purnea Mahila College , Sipahi Tola , Purnea",
    
  },
];
export const tasksData = [
  {
    id: "1",
    taskName: "Solar Panel Installlation at railway station.",
    installation: "Install the panel on top of the platform of 5kw of power.",
  },
];





export const inventoryData = [
  {
    id: "1",
    name: "Solar LED Street Light",
    description: "Eco-friendly solar-powered street light with motion sensor.",
    quantity: 1,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfaVettxgHxUSbCpPamGNdUB8g_9t_qYFhgQ&s",
  },
  {
    id: "2",
    name: "Smart Street Light System",
    description: "Automated street light system with IoT connectivity.",
    quantity: 2,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_L6YoAFI4q74AoE5ijHorzYQF4ZgI7rvwhg&s",
  },
  {
    id: "3",
    name: "LED Floodlight for Streets",
    description: "High brightness LED floodlight for outdoor use.",
    quantity: 3,
    url: "https://m.media-amazon.com/images/I/81hIbQn03RL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: "4",
    name: "Solar Street Light with Camera",
    description: "Integrated street light with a security camera.",
    quantity: 1,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfaVettxgHxUSbCpPamGNdUB8g_9t_qYFhgQ&s",
  },
  {
    id: "5",
    name: "Street Light Pole",
    description: "Durable street light pole for various applications.",
    quantity: 5,
    url: "https://th.bing.com/th?id=OPAC.9GyQh8O0Qccugw474C474&w=592&h=550&o=5&dpr=1.1&pid=21.1",
  },
  {
    id: "6",
    name: "Motion Sensor Street Light",
    description:
      "Street light with a built-in motion sensor for energy savings.",
    quantity: 2,
    url: "  https://th.bing.com/th?id=OPAC.CS1gpu%2fn0Pggmw474C474&w=592&h=550&o=5&dpr=1.1&pid=21.1 ",
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
];

export const leaveReasons = [
  {
    id: 1,
    label: "Select leave type",
    value: "",
    enabled: false,
  },
  {
    id: 2,
    label: "Sick Leave",
    value: "sl",
    enabled: true,
  },
  {
    id: 3,
    label: "Annual Leave",
    value: "al",
    enabled: true,
  },
];

export const leaveTypes = [
  {
    id: 1,
    type: "Single Day",
    icon: "clock",
  },
  {
    id: 2,
    type: "Multiple Days",
    icon: "clock",
  },
  {
    id: 3,
    type: "Hourly",
    icon: "clock",
  },
];



export const items = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
];

export const dummyData = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
  { id: "4", title: "Item 4" },
  { id: "5", title: "Item 5" },
];

export const cardData = [
  {
    id: 1,
    title: "Dashboard design for admin",
    priority: "High",
    status: "On Track",
    date: "14 Oct 2022",
    links: 5,
    comments: 5,
    avatars: [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
    ],
  },
  {
    id: 2,
    title: "Mobile app redesign",
    priority: "Medium",
    status: "On Hold",
    date: "18 Oct 2022",
    links: 3,
    comments: 2,
    avatars: [
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/women/4.jpg",
    ],
  },
  {
    id: 3,
    title: "Website Revamp",
    priority: "High",
    status: "In Progress",
    date: "20 Oct 2022",
    links: 8,
    comments: 12,
    avatars: [
      "https://randomuser.me/api/portraits/men/5.jpg",
      "https://randomuser.me/api/portraits/women/6.jpg",
    ],
  },
  {
    id: 4,
    title: "Marketing Campaign",
    priority: "Low",
    status: "Completed",
    date: "22 Oct 2022",
    links: 2,
    comments: 0,
    avatars: [
      "https://randomuser.me/api/portraits/men/7.jpg",
      "https://randomuser.me/api/portraits/women/8.jpg",
    ],
  },
];

export const data = [
  { id: "1", title: "Attendance ", icon: "time-outline" },
  { id: "2", title: "Salary ", icon: "document-text-outline" },
  { id: "3", title: "Leave records", icon: "calendar-outline" },
  { id: "4", title: "Settings", icon: "settings-outline" },
  { id: "5", title: "Reports", icon: "bar-chart-outline" },
  { id: "6", title: "Bag", icon: "bag-outline" },
];

export const contactsData = [
  {
    id: "1",
    name: "Dhruv",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    status: "Online",
    online: true,
  },
  {
    id: "2",
    name: "Shrishti ",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    status: "Online",
    online: true,
  },
  {
    id: "3",
    name: "Anants",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    status: "Last seen 1 hours ago",
    online: false,
  },
  {
    id: "4",
    name: "Naisha Singh",
    avatar: "",
    status: "Online",
    online: true,
  },
  {
    id: "5",
    name: "Raki Devon",
    avatar: "",
    status: "Online",
    online: true,
  },
  {
    id: "6",
    name: "Shanaya Akira",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    status: "Last seen 3 minutes ago",
    online: false,
  },
  {
    id: "8",
    name: "Naisha Singh",
    avatar: "",
    status: "Online",
    online: true,
  },
  {
    id: "9",
    name: "Raki Devon",
    avatar: "",
    status: "Online",
    online: true,
  },
  {
    id: "7",
    name: "Shanaya Akira",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    status: "Last seen 3 minutes ago",
    online: false,
  },
];

export const menuItems = [
  { label: "Site Inventory", icon: "cart-outline" },
  { label: "Reports", page: "", icon: "pie-chart-outline" },
  { label: "My Projects", page: "", icon: "grid-outline" },
  { label: "My Tasks", page: "", icon: "grid-outline" },
  { label: "Settings", page: "", icon: "cog-outline" },
];
export const internal = [
  {
    label: "Notification",
    page: "notificationScreen",
    icon: "notifications-outline",
  },
  { label: "Privacy", page: "privacyPolicy", icon: "shield-checkmark-outline" },
  { label: "Data Usage", page: "", icon: "folder-outline" },
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

export const personalData = {
  fullName: "Bittu Kumar",
  email: "bittu230@gmail.com",
  phone: "+91 7945671265",
  address: "Delhi India",
};

export const professionalData = {
  employeeId: "7879987",
  designation: " UI/UX Designer",
  companyEmail: "bittu89@example.com",
  employeeType: "Permanent",
  department: "Design",
  reportingManager: "Ashish Kumar",
  companyExperience: "2 Year 5 Months",
  officeTime: "10:00 am to 07:00 pm",
};

export const documentData = [
  { id: "1", name: "Offer Letter", icon: "file-document-outline" },
  { id: "2", name: "Appointment Letter", icon: "file-document-outline" },
  { id: "3", name: "Bond Agreement", icon: "file-document-outline" },
  { id: "4", name: "Appraisal Letter", icon: "file-document-outline" },
  { id: "5", name: "Salary Slip", icon: "file-document-outline" },
];

export const activities = [
  { id: "1", title: "Capital Icon", time: "9:15 AM - 11:00 AM" },
  { id: "2", title: "Baroda Bank", time: "11:00 AM - 11:30 AM" },
];

export const profileImages = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/1.jpg",
];

export const miniCards = [
  { id: 1, icon: "time-outline", text: "Est: 20h" },
  { id: 2, icon: "calendar-outline", text: "Due: 25 Apr" },
  { id: 3, icon: "checkmark-circle-outline", text: "Tasks: 1/3" },
];

export const taskCards = [
  { id: 1, text: "Design Concept", progress: 0.7, bgColor: "#54B4D3" },
  { id: 2, text: "Development Phase", progress: 0.4, bgColor: "#2b87b0" },
];

export const cardtasks = [
  {
    id: 1,
    title: "Design system",
    time: "09:00 - 10:00",
    progress: 0.6,
    participants: 2,
    avatars: [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
    ],
  },
  {
    id: 2,
    title: "Create prototype",
    time: "10:00 - 11:00",
    progress: 0.3,
    participants: 4,
    avatars: [
      "https://randomuser.me/api/portraits/men/36.jpg",
      "https://randomuser.me/api/portraits/women/40.jpg",
      "https://randomuser.me/api/portraits/men/37.jpg",
      "https://randomuser.me/api/portraits/women/50.jpg",
    ],
  },
  {
    id: 3,
    title: "Dashboard design",
    time: "11:00 - 12:00",
    progress: 0.5,
    participants: 4,
    avatars: [
      "https://randomuser.me/api/portraits/men/38.jpg",
      "https://randomuser.me/api/portraits/women/51.jpg",
      "https://randomuser.me/api/portraits/men/39.jpg",
      "https://randomuser.me/api/portraits/women/53.jpg",
    ],
  },
  {
    id: 4,
    title: "Offspace project",
    time: "12:00 - 01:00",
    progress: 0.7,
    participants: 3,
    avatars: [
      "https://randomuser.me/api/portraits/men/40.jpg",
      "https://randomuser.me/api/portraits/women/55.jpg",
      "https://randomuser.me/api/portraits/men/41.jpg",
    ],
  },
];

export const attendanceData = [
  {
    icon: "login",
    title: "Check In",
    time: "10:20 am",
    status: "On Time",
  },
  {
    icon: "logout",
    title: "Check Out",
    time: "07:00 pm",
    status: "Go Home",
  },
  {
    icon: "clock-outline",
    title: "Break Time",
    time: "00:30 min",
    status: "Avg Time 30 min",
  },
  {
    icon: "calendar-check-outline",
    title: "Total Days",
    time: "28",
    status: "Working Days",
  },
];

export const activityData = [
  {
    title: "Check In",
    time: "10:00 am",
    status: "On Time",
    icon: "login",
  },
  {
    title: "Break In",
    time: "12:30 pm",
    status: "On Time",
    icon: "pause-circle-outline",
  },
  {
    title: "Check Out",
    time: "07:00 pm",
    status: "On Time",
    icon: "logout",
  },
];

export const lineItems = [
  {
    id: "AS1001",
    description: "HP Deskjet 1010 Color Inkjet Printer",
    location: "MT-seattle Manufacturing",
    subInventory: "Seattle Manufacturing",
  },
  {
    id: "AS1002",
    description: "Logitech B100 Optical Wired USB Mouse",
    location: "MT-seattle Manufacturing",
    subInventory: "Seattle Manufacturing",
  },
];

export const requisitions = [
  {
    id: "PR - 10050019",
    location: "PL01 - Texas Houston Plant",
    date: "08/19/2024",
    amount: "₹ 24.40 ",
    checked: false,
  },
  {
    id: "PR - 10050018",
    location: "PL01 - Texas Houston Plant",
    date: "08/23/2024",
    amount: "₹ 254.40 ",
    checked: false,
  },
  {
    id: "PR - 10050017",
    location: "PL01 - Texas Houston Plant",
    date: "09/11/2024",
    amount: "₹ 100.00 ",
    checked: false,
  },
  {
    id: "PR - 10050016",
    location: "PL01 - Texas Houston Plant",
    date: "10/19/2024",
    amount: "₹ 100.00 ",
    checked: false,
  },
];

export const originalItems = [
  { id: 1, name: "Robotics with Arduino" },
  { id: 2, name: "Motor Control in Robotics" },
  { id: 3, name: "Radio-Controlled Robots" },
  { id: 4, name: "Robotics Programming Basics" },
  { id: 5, name: "Autonomous Robot Design" },
  { id: 6, name: "Obstacle Avoidance Robotics" },
  { id: 7, name: "Sumo Robotics Challenge" },
  { id: 8, name: "Robot Navigation with Sensors" },
];

export const itemsData = [
  { id: "P001", name: "Product A", price: 120.5, quantity: 2, total: 241.0 },
  { id: "P002", name: "Product B", price: 80.25, quantity: 3, total: 240.75 },
  { id: "P003", name: "Product C", price: 50.0, quantity: 1, total: 50.0 },
  { id: "P004", name: "Product D", price: 150.75, quantity: 5, total: 753.75 },
  { id: "P005", name: "Product E", price: 99.99, quantity: 4, total: 399.96 },
];

export const amountDetailsData = [
  { label: "Subtotal", value: 1000 },
  { label: "Tax", value: 100 },
  { label: "Total", value: 1100 },
];

export const projects = [
  {
    id: 1,
    title: "Robatic cell",
    status: "toDo",
    progress: 0.5,
    due: "25 Apr",
    est: "20 h",
  },
  {
    id: 2,
    title: "Coffee Vending Machine",
    status: "toDo",
    progress: 0.7,
    due: "28 Apr",
    est: "15 h",
  },
  {
    id: 3,
    title: "Automatic soap Dispensor machine jig",
    status: "toDo",
    progress: 0.7,
    due: "28 Apr",
    est: "15 h",
  },
];

export const handleTaskProgress = (
  tasks,
  projectId,
  setTasks,
  setActiveStatus
) => {
  const updatedTasks = tasks.map((task) =>
    task.id === projectId ? { ...task, status: "inProgress" } : task
  );
  setTasks(updatedTasks);
  setActiveStatus("inProgress");
};

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
  phone: "9909230912",
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

// taskData.js
export const taskslist = [
  {
    id: 1,
    title: "Design in Solidworks",
    status: "done",
    deadline: "2024-10-13",
    start: "2024-10-08",
    project: "Robotic Cell",
    assignedTo: "Rakesh Sharma",
  },
  {
    id: 2,
    title: "Purchase Parts",
    status: "critical",
    deadline: "2024-08-28",
    start: "2024-08-28",
    project: "Coffee Vending Machine",
    assignedTo: "Rakesh Sharma",
  },
  {
    id: 3,
    title: "Purchase Parts",
    status: "blocker",
    deadline: "2024-08-28",
    start: "2024-08-28",
    project: "Automatic Soap Dispenser Machine Jig",
    assignedTo: "Rakesh Sharma",
  },
];

export const totalsitesData = [
  {
    id: "1",
    siteName: "P S SHIKSHA NAGAR BANMANKHI",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: "2",
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: "3",
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: "4",
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
  {
    id: "5",
    siteName: "P S MIRCHAIBARI UTTAR",
    dist: "Purnia",
    location: "BANMANKHI",
  },
];
