import React,{useState , useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import '../styles/popup.css';
import 'react-calendar/dist/Calendar.css';
import Select from "react-select";
import {toast} from 'react-toastify';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DateTimePicker, TimePicker} from '@mui/x-date-pickers';
import UserService from "../services/UserService";
import OrganizationService from "../services/OrganizationService";
import UnavailabilityService from "../services/UnavailabilityService";

toast.configure()
const PopupUnavailability = props => {
    var [startDate, setStartDate] = React.useState(new Date());
    var [endDate, setEndDate] = React.useState(new Date());
    const maxDate = new Date(new Date().getFullYear(),new Date().getMonth()+2,new Date().getDay(),new Date().getHours(),new Date().getMinutes());
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrganizations,setSelectedOrganizations] = useState();
    const [selectedOption,setSelectedOption] = useState("option1");
    const [email, setEmail] = useState();
    const [periods,setPeriods] = useState([])
    const [isDatePickerHidden, setIsDatePickerHidden] = useState(true);
    const [isTimePickerHidden, setIsTimePickerHidden] = useState(true);
    const [isRadioButtonHidden, setIsRadioButtonHidden] = useState(true);
    const [isInputHidden, setIsInputHidden] = useState(true);
    const [numberPicket,setNumberPicket] = useState();
    var [idUser, setIdUser] = useState();
    const Styles = {
        fieldset:{
            textAlign:"center",
        },
        radionButton:{
            display:'flex',
            flexDirection:'row',
            gap:'1em'
        },
        h4:{
            display:'flex',
        }
    }
    useEffect(()=>{
        setSelectedOrganizations([]);
        setIdUser('');
        setPeriods([]);
        setStartDate(new Date());
        setEndDate(new Date());
        setNumberPicket(0)
    },[])

    function handleSelectProfessional(event){
        setIsDatePickerHidden(true);
        setIsRadioButtonHidden(true);
        setIsTimePickerHidden(true);
        setIsInputHidden(true);
        const email = event.target.value;
        setEmail(email);
    };
    async function validateEmail(){
        setIdUser('');
        setOrganizations([]);
        setSelectedOrganizations([]);
        await UserService.getUserEmail(email).then((res)=>{
            if(res.data!=undefined){
                setIdUser(res.data._id);
                for( let i = 0 ; i < res.data.organizations.length ; i++){
                    setOrganizations((prev) => [...prev, {
                        value: res.data.organizations[i].organization._id,
                        label: res.data.organizations[i].organization.name
                    }
                    ]);
                }
                setIsDatePickerHidden(false)
            }else{
                toast.error('please enter a valid email!', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
                setIsDatePickerHidden(true)
            }
        })
    }
    function handleSelectOrganization(data) {
        setSelectedOrganizations(data);
    };
    const handleChangeStartDate = (newValue) => {
        if(newValue.getHours() === 0 && newValue.getMinutes() === 0 && endDate.getHours() === 0 && endDate.getMinutes()===0){
            setIsRadioButtonHidden(false);
        }else{
            setSelectedOption("option1");
            setIsRadioButtonHidden(true);
            setIsTimePickerHidden(true);
            setIsInputHidden(true);
            setNumberPicket(0);
            setPeriods([]);
        }
        setStartDate(newValue);

    };
    const handleChangeEndDate = (newValue) => {
        console.log(startDate)
        if(newValue.getHours() === 0 && newValue.getMinutes() === 0 && startDate.getHours() === 0 && startDate.getMinutes()===0){
            setIsRadioButtonHidden(false);
        }else{
            setSelectedOption("option1");
            setIsRadioButtonHidden(true);
            setIsTimePickerHidden(true);
            setIsInputHidden(true);
            setNumberPicket(0);
            setPeriods([]);
        }
        setEndDate(newValue);
    };
    function handleOptionChange(event){
        setIsInputHidden(true);
        setNumberPicket(0)
        setSelectedOption(event.target.value);
        if(event.target.value === "option2"){
            setIsTimePickerHidden(false);
            setIsInputHidden(false);
        }else {
            setPeriods([])
        }
    }
    function handleSelectNumberPicket(event) {
        setNumberPicket(event.target.value);
        setPeriods([]);
        for (let i=0 ; i <event.target.value;i++){
            const inputPicketTime = {
                startTime:'',
                endTime:''
            };
            setPeriods((prev) => [...prev, inputPicketTime]);
        }

    }
    const handleChangeTime = (index, event) => {
        event.preventDefault();
        event.persist();
        setPeriods((prev) => {
                return prev.map((item, i) => {
                    if (i !== index) {

                        return item;
                    }
                    return {
                        ...item,
                        [event.target.name]: event.target.value,

                    };
                });
            }
        );
        console.log(periods[0].startTime.split(":"))
    };


    function saveResult(event){
        event.preventDefault();
        event.persist();
        var organizations = [];
        var TempPeriods = [];
        var startTimeValues = [];
        var endTimeValues = [];
        var periodSchema ;
        if(selectedOrganizations.length<1){
            toast.error('please choose at least one organization!', {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
        }

        var startDateValues = {
            year: parseInt(startDate.getFullYear()),
            month: parseInt(startDate.getMonth())+1,
            day:parseInt(startDate.getDate()),
            hour: parseInt(startDate.getHours()),
            minute: parseInt(startDate.getMinutes())
        }
        var endDateValues = {
            year: parseInt(endDate.getFullYear()),
            month: parseInt(endDate.getMonth())+1,
            day:parseInt(endDate.getDate()),
            hour: parseInt(endDate.getHours()),
            minute: parseInt(endDate.getMinutes())
        }
        for(let i = 0 ; i < selectedOrganizations.length ; i++){
            organizations.push(selectedOrganizations[i].value);
        }

        for(let i = 0 ; i < periods.length ; i++){
            startTimeValues = []
            endTimeValues = []
            startTimeValues = periods[i].startTime.split(":")
            endTimeValues = periods[i].endTime.split(":")
             periodSchema = {
                startTime:{
                    hour: parseInt(startTimeValues[0]),
                    minute:parseInt(startTimeValues[1])
                },
                endTime:{
                    hour:parseInt(endTimeValues[0]),
                    minute:parseInt(endTimeValues[1]),
                }
            }
            TempPeriods.push(periodSchema)
        }
        const unavailabilityShema = {
            startDate:startDateValues,
            endDate:endDateValues,
            periods:TempPeriods,
            users:[idUser],
            organizations:organizations
        }
        UnavailabilityService.createPeriod(unavailabilityShema).then((res)=>{
            const id = res.data.period._id
            console.log(res.data.period._id)
            for(let i = 0 ; i < selectedOrganizations.length ; i++){
                OrganizationService.getOrganizationById(selectedOrganizations[i].value).then((res)=>{
                    console.log(id)
                    var organizationSchema = res.data;
                    var unavailability = res.data.unavailability;
                    unavailability.push(id);
                    organizationSchema.unavailability = unavailability;
                    OrganizationService.updateOrganization(selectedOrganizations[i].value,organizationSchema).then((res)=>{
                        console.log("succes org")
                    })
                })

            }
        })
    }


    return(
        <div >
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={props.handleClose}>x</span>
                    <fieldset style= {Styles.fieldset}>
                        <div className="form-outline mb-4">
                            <input type="text" className="form-control"
                                   placeholder="please enter a user"
                                   name="email"
                                   value={email}
                                   onChange={(e) => handleSelectProfessional(e)}
                            />
                        </div>
                        <button className="btn btn-primary btn-block mb-4" onClick={validateEmail}>Validate</button>
                        <form onSubmit={saveResult}>
                        {isDatePickerHidden === false?
                            <div>
                                <div className="form-outline mb-4">
                                    <Select
                                        options={organizations}
                                        placeholder="please select organizations"
                                        value={selectedOrganizations}
                                        isSearchable={true}
                                        onChange={handleSelectOrganization}
                                        isMulti
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                <div style={{width:'418px'}}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Stack spacing={20}>
                                            <DateTimePicker
                                                label="Start Date"
                                                value={startDate}
                                                format="y-MMM-dd"
                                                minDate={new Date()}
                                                maxDate={maxDate}
                                                required
                                                onChange={handleChangeStartDate}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                </div>
                                </div>
                                <div className="form-outline mb-4">
                                <div style={{width:'418px'}}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Stack spacing={20}>
                                            <DateTimePicker
                                                label="End Date"
                                                value={endDate}
                                                minDate={new Date()}
                                                maxDate={maxDate}
                                                required
                                                onChange={handleChangeEndDate}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                </div>
                                </div>
                            </div>
                                :""}
                            {isRadioButtonHidden===false?
                         <div className="form-outline mb-4" style={Styles.radionButton}>
                                    <label>Choose the periods:</label>
                                    <div >
                                <label>
                                    <input type="radio" value="option1"
                                           checked={selectedOption === 'option1'}
                                           onChange={handleOptionChange} />
                                    Full Time
                                </label>
                            </div>
                                    <div >
                                <label>
                                    <input type="radio" value="option2"
                                           checked={selectedOption === 'option2'}
                                           onChange={handleOptionChange} />
                                 Customize
                                </label>
                            </div>
                                </div>
                                :""}
                            {isInputHidden === false?
                            <div className="form-outline mb-4">
                                <input type="number" className="form-control"
                                       placeholder="please enter the number of periods"
                                       name="numberPicket"
                                       value={numberPicket}
                                       onChange={(e) => handleSelectNumberPicket(e)}
                                />
                            </div>
                                :""}
                            {isTimePickerHidden === false?
                                <div>
                                    {periods.map((item,index)=>{
                                        return(
                                            <div>
                                                <div className="form-outline mb-4">
                                                    <i><u><h4 style={Styles.h4}>Periode {index+1}:</h4></u></i>
                                                </div>
                                                <div style={Styles.radionButton} className="form-outline mb-4">
                                                    <label>Start Time :</label>
                                                        <input type="time"
                                                               onChange={(e) => handleChangeTime(index, e)}
                                                               name="startTime"
                                                               required

                                                        />

                                                </div>
                                                <div style={Styles.radionButton} className="form-outline mb-4">
                                                    <label>End Time : </label>
                                                        <input type="time"
                                                               name="endTime"
                                                               onChange={(e) => handleChangeTime(index, e)}
                                                               required
                                                        />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                               :""}
                            {!isDatePickerHidden || !isTimePickerHidden ?<button type="submit" className="btn btn-primary btn-block mb-4">Save</button>:""}
                            </form>

                    </fieldset>
                </div>
            </div>
        </div>
    )}

export default PopupUnavailability;
