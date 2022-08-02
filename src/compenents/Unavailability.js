import React, {useEffect, useState} from 'react';
import Sidebar from "./Sidebar";
import {SidebarData} from "./SidebarData";
import PopupUnavailability from "./PopupUnavailability";
import Select from "react-select";
import OrganizationService from "../services/OrganizationService";
import {DataTable, DestoryDataTable} from "./DataTable";
export default function Unavailability(){
    const [isOpen, setIsOpen] = useState(false);
    const [isTableHidden, setIsTableHidden] = useState(true);
    const [isPeriodsHidden, setIsPeriodsHidden] = useState(true);
    const [isForUnavailability,setIsForUnavailability] = useState(false);
    const [organizations, setOrganizations] = useState([]);
    const [periods, setPeriods] = useState([]);
    const [index,setIndex] = useState();
    const [selectedOrganizations,setSelectedOrganizations] = useState();
    const togglePopupUnavailability = () => {setIsOpen(!isOpen);setIsForUnavailability(true);}

    useEffect(()=>{
        setOrganizations([])
        OrganizationService.getAllOrganizations().then((res)=>{
            for( let i = 0 ; i < res.data.length ; i++){
                setOrganizations((prev) => [...prev, {
                    value: res.data[i]._id,
                    label: res.data[i].name
                }
                ]);
            }
        })
    },[])

    const Styles = {
        tables:{
            paddingLeft: "300px",
            paddingTop: "30px",
            maxWidth:"1500px",
            textAlign:"center"
        },
        border:{
            border:"1px solid gray"
        },
        thead:{
            backgroundColor:"fff",
            textAlign:"center"
        },
        button:{
            maxWidth:"50px",
        },
        buttonAdd:{
            marginTop:"20px",
            marginLeft: "94.5%",
            width:"50px",
            borderRadius:"10px"
        },
        infoUser:{
            marginTop:"20px",
            marginLeft: "20%",
        },
        flex:{
            display:"flex",
            flexDirection:"row",
            paddingLeft: "80.5%",
            marginTop:"10px",
            gap:"1em"

        },
        select:{
            width:"200px"
        }
    }
    async function handleSelectOrganization(data) {
        setIsTableHidden(true)
        setIsPeriodsHidden(true)
        setSelectedOrganizations(data);
        console.log('organization: ')
        console.log(data)
        await OrganizationService.getOrganizationById(data.value).then((res)=>{
            setPeriods(res.data.unavailability);
            /*var TempPeriods = [];
            for( let i = 0 ; i < res.data.unavailability.length ; i++){
                UnavailabilityService.getPeriodById(res.data.unavailability[i]).then((res)=>{
                    TempPeriods.push(res.data);
                });*/
        });

        }

    function navigateToPeriods(index){
        setIndex(index);
        setIsPeriodsHidden(false);
        setIsTableHidden(true);
    }
    function navigateToAddUnavailability(){
            togglePopupUnavailability();
    }
    function navigateToUnavailability(){
        DataTable();
        setIsTableHidden(false);
        setIsPeriodsHidden(true);
    }
    return(
        <div>

            {isOpen && isForUnavailability &&<PopupUnavailability  handleClose={togglePopupUnavailability}/>}
            <Sidebar data={SidebarData}/>
            <button style={Styles.buttonAdd} type="button" class="btn btn-outline-primary" onClick={navigateToAddUnavailability}>+</button>
            <div >
            <div  style={Styles.flex} >
                <div style={Styles.select}>
                <Select
                    options={organizations}
                    placeholder="please select an organization"
                    value={selectedOrganizations}
                    isSearchable={true}
                    onChange={handleSelectOrganization}
                />
                </div>
                <button  type="button" class="btn btn-outline-success" onClick={navigateToUnavailability}>find</button>
            </div>
                <div style={Styles.tables}>
                    <table id="table" style={Styles.border} className="table table-bordered row-border cell-border " >
                    {isTableHidden===false?
                    <thead style={Styles.thead}>
                    <tr>
                        <th scope="col">User</th>
                        <th scope="col">From</th>
                        <th scope="col">TO</th>
                        <th scope="col">Periods</th>
                    </tr>
                    </thead>
                        :""}
                    {isPeriodsHidden===false?
                        <thead style={Styles.thead}>
                        <tr>
                            <th>--------</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                        </tr>
                        </thead>
                        :""}
                    <tbody>
                    {isTableHidden===false && periods!=undefined?periods.map((period,index)=>{
                        return(
                            <tr key={period._id}>
                                <td scope="row">{period.users[0].email}</td>
                                <td scope="row">{period.startDate.day}-{period.startDate.month}-{period.startDate.year}</td>
                                <td scope="row">{period.endDate.day}-{period.endDate.month}-{period.endDate.year}</td>
                                <td>
                                    <button  type="button" className="btn btn-outline-warning" onClick={()=> navigateToPeriods(index)}>View</button>
                                </td>
                            </tr>
                            )
                    })
                      :""}
                    {isPeriodsHidden===false && periods!=undefined? periods[index].periods.map((time,index)=>{
                            return(
                                <tr >
                                    <td>Period {index+1}:</td>
                                    <td scope="row">{time.startTime.hour}:{time.startTime.minute}</td>
                                    <td scope="row">{time.endTime.hour}:{time.endTime.minute} </td>
                                </tr>
                            )
                        })
                        :""}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}