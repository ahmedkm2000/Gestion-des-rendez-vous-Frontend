import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Organizations',
    path: '/organizations',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'add organization',
        path: '/organizations/add',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: "organizations's list",
        path: '/organizations',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: "assign an admin",
        path: '/organizations/assign',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Users',
    path: '/admins',
    icon: <RiIcons.RiAdminLine/>,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add user',
        path: '/admins/add',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: "Users's list",
        path: '/admins',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Unavailability',
    path: '/unavailability',
    icon: <RiIcons.RiAdminLine/>,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add Unavailability',
        path: '/unavailability/add',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: "unavailability's list",
        path: '/unavailability',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <RiIcons.RiAdminLine/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  }
];
export function SidebarAdminData(id){
 const SidebarAdminData = [
  {
    title: 'Admins',
    path: '/organizations/all/'+id+'/admins',
    icon: <RiIcons.RiAdminLine/>,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add admin',
        path: '/organizations/all/'+id+'/admins/add',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: "Admins's list",
        path: '/organizations/all/'+id+'/admins',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Doctors',
    path: '/organizations/all/'+id+'/doctors',
    icon: <RiIcons.RiAdminLine/>,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add Doctor',
        path: '/organizations/all/'+id+'/doctors/add',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: "Doctor's list",
        path: '/organizations/all/'+id+'/doctors',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Entry Clerks',
    path: '/organizations/all/'+id+'/entry-clerks',
    icon: <RiIcons.RiAdminLine/>,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add Entry Clerk',
        path: '/organizations/all/'+id+'/entry-clerks/add',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: "entry-clerk's list",
        path: '/organizations/all/'+id+'/entry-clerks',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <RiIcons.RiAdminLine/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  }
]
return SidebarAdminData;
};
