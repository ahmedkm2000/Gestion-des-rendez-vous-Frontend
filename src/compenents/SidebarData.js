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
      }
    ]
  },
  {
    title: 'Admins',
    path: '/admins',
    icon: <RiIcons.RiAdminLine/>,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add admin',
        path: '/admins/add',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: "Admins's list",
        path: '/admins',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  }
];
