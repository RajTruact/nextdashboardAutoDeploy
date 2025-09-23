// config/sidebarConfig.js
import {
  Grid,
  Users,
  BarChart3,
  Calendar,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  KanbanSquare,
  User,
  Settings,
  Shield,
  Database,
  FileText,
  ShoppingBag,
  TrendingDownIcon,
  Accessibility,
  RemoveFormatting,
  ReceiptPoundSterling,
  AmpersandIcon,
  Ampersand,
  LucideAccessibility,
  AudioWaveform,
  DiamondPercentIcon,
  DiscAlbumIcon,
  FileSignatureIcon,
} from "lucide-react";

const sidebarConfig = {
  superadmin: {
    main: [
      {
        name: "Super Dashboard",
        path: "/superadmin",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        name: "Purchase & Selling & Reorder Reports",
        path: "/superadmin/profile",
        icon: <Users className="w-5 h-5" />,
      },
      {
        name: "System Analytics",
        path: "/superadmin/analytics",
        icon: <Database className="w-5 h-5" />,
      },
      {
        name: "Admin Access",
        path: "/dashboard/admin",
        icon: <Grid className="w-5 h-5" />,
      },
      {
        name: "Donor Access",
        path: "/dashboard/donor",
        icon: <HeartHandshake className="w-5 h-5" />,
      },
      {
        name: "Alumni Access",
        path: "/dashboard/alumni",
        icon: <GraduationCap className="w-5 h-5" />,
      },
      {
        name: "Faculty Access",
        path: "/dashboard/faculty",
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        name: "Reports",
        icon: <BarChart3 className="w-5 h-5" />,
        subItems: [
          {
            heading: "Purchase And Selling Reports",
            icon: <ShoppingBag className="w-4 h-4" />,
            children: [
              {
                name: "Report A",
                path: "/dashboard/faculty/reports/purchase/a",
                icon: <FileText className="w-4 h-4" />,
              },
              {
                name: "Report B",
                path: "/dashboard/faculty/reports/purchase/b",
                icon: <FileText className="w-4 h-4" />,
              },
            ],
          },
          {
            heading: "Selling Reports",
            icon: <TrendingDownIcon className="w-4 h-4" />,
            children: [
              {
                name: "Report C",
                path: "/dashboard/faculty/reports/selling/c",
                icon: <FileText className="w-4 h-4" />,
              },
              {
                name: "Report D",
                path: "/dashboard/faculty/reports/selling/d",
                icon: <FileText className="w-4 h-4" />,
              },
            ],
          },
        ],
      },
    ],
    others: [
      {
        name: "Acess Controls",
        icon: <Accessibility className="w-5 h-5" />,
        subItems: [
          {
            heading: "Acess Reports",
            icon: <ReceiptPoundSterling className="w-4 h-4" />,
            children: [
              {
                name: "Admin Access Report Name",
                path: "/dashboard/faculty/reports/purchase/a",
                icon: <AudioWaveform className="w-4 h-4" />,
              },
              {
                name: "Donor Access",
                path: "/dashboard/faculty/reports/purchase/b",
                icon: <DiamondPercentIcon className="w-4 h-4" />,
              },
              {
                name: "Alumni Access",
                path: "/dashboard/faculty/reports/purchase/b",
                icon: <DiscAlbumIcon className="w-4 h-4" />,
              },
              {
                name: "Faculty Access",
                path: "/dashboard/faculty/reports/purchase/b",
                icon: <FileSignatureIcon className="w-4 h-4" />,
              },
            ],
          },
        ],
      },
    ],
  },
  admin: {
    main: [
      {
        name: "Dashboard",
        path: "/dashboard/admin",
        icon: <Grid className="w-5 h-5" />,
      },
      {
        name: "Users",
        path: "/dashboard/admin/users",
        icon: <Users className="w-5 h-5" />,
      },
      {
        name: "Analytics",
        path: "/dashboard/admin/analytics",
        icon: <BarChart3 className="w-5 h-5" />,
      },
    ],
    others: [
      {
        name: "Kanban",
        path: "/dashboard/admin/kanban",
        icon: <KanbanSquare className="w-5 h-5" />,
      },
      {
        name: "Profile",
        path: "/dashboard/admin/profile",
        icon: <User className="w-5 h-5" />,
      },
    ],
  },

  donor: {
    main: [
      {
        name: "Dashboard",
        path: "/dashboard/donor",
        icon: <Grid className="w-5 h-5" />,
      },
      {
        name: "My Donations",
        path: "/dashboard/donor/donations",
        icon: <HeartHandshake className="w-5 h-5" />,
      },
      {
        name: "History",
        path: "/dashboard/donor/history",
        icon: <BarChart3 className="w-5 h-5" />,
      },
    ],
    others: [
      {
        name: "Profile",
        path: "/dashboard/donor/profile",
        icon: <User className="w-5 h-5" />,
      },
    ],
  },

  alumni: {
    main: [
      {
        name: "Dashboard",
        path: "/dashboard/alumni",
        icon: <Grid className="w-5 h-5" />,
      },
      {
        name: "Events",
        path: "/dashboard/alumni/events",
        icon: <Calendar className="w-5 h-5" />,
      },
      {
        name: "Network",
        path: "/dashboard/alumni/network",
        icon: <Users className="w-5 h-5" />,
      },
    ],
    others: [
      {
        name: "Profile",
        path: "/dashboard/alumni/profile",
        icon: <User className="w-5 h-5" />,
      },
    ],
  },

  faculty: {
    main: [
      {
        name: "Dashboard",
        path: "/dashboard/faculty",
        icon: <Grid className="w-5 h-5" />,
      },
      {
        name: "Courses",
        path: "/dashboard/faculty/courses",
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        name: "Students",
        path: "/dashboard/faculty/students",
        icon: <GraduationCap className="w-5 h-5" />,
      },
    ],
    others: [
      {
        name: "Schedule",
        path: "/dashboard/faculty/schedule",
        icon: <Calendar className="w-5 h-5" />,
      },
      {
        name: "Profile",
        path: "/dashboard/faculty/profile",
        icon: <User className="w-5 h-5" />,
      },
    ],
  },
};

export default sidebarConfig;
