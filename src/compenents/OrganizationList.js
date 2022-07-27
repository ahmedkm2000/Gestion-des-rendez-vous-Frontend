import React, { useState ,useEffect} from 'react';
import Sidebar from "./Sidebar";
import {useAuth} from "./Auth";
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

const OrganizationList = () => {
    const [infoOrg,setInfoOrg] = useState([]);
    const organizations = [];
    const auth = useAuth();
    useEffect(()=>{
        const listOrg = JSON.parse(localStorage.getItem("userInfo")).organizations
        const TempRoles = []
        for(let i = 0 ; i < listOrg.length;i++){
            organizations.push({
                title: listOrg[i].organization.name,
                path: '/organizations/all/'+listOrg[i].organization._id,
                icon: <IoIcons.IoIosPaper />,
                iconClosed: <RiIcons.RiArrowDownSFill />,
                iconOpened: <RiIcons.RiArrowUpSFill />
                        })
            TempRoles.push({
                id:listOrg[i].organization._id,
                roles:listOrg[i].roles
            })
        }
        organizations.push({
            title: 'Logout',
            path: '/logout',
            icon: <RiIcons.RiAdminLine/>,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
        })
        setInfoOrg(organizations);
    },[])
    return (
      <div>
          {auth.user!=undefined  && localStorage.getItem('isSuperAdmin')==="false"?
              <Sidebar data={infoOrg}/>
              :""}
      </div>


    );
};

export default OrganizationList;
