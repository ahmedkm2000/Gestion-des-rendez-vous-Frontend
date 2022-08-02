import React, {useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "./Auth";
import {Alert} from "@mui/material";
import UserService from "../services/UserService";
export default function Login () {
    const [formData, setFormData] = useState({email: "", password: ""});
    const [alert, setAlert] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const Styles = {
        h3: {
            fontWeight: "500px",
            fontFamily: "Arial",
            textAlign: "center"
        },
        label: {
            fontWeight: "500px",
            fontFamily: "Arial",
            marginRight: "180px",
        },
        img: {
            marginTop: "10%",
            width: "50px",
            height: "50px",
            marginLeft: "48.5%",
        },
        body: {
            backgroundColor: "#F6F6F6",
            textAlign: "center",
            paddingTop: "10px",
            marginTop: "20px",
            marginLeft: "400px",
            marginRight: "400px",
            border: "1px solid  grey",
            fontFamily: "Arial"
        },
        alert: {
            textAlign: "center",
            paddingTop: "10px",
            marginTop: "20px",
            marginLeft: "400px",
            marginRight: "400px",
        },
        input: {
            textAlign: "center",
            maxWidth: "300px",
            marginLeft: "31%",
            fontFamily: "Arial"
        },
        button: {
            backgroundColor: "#04993F",
            marginLeft: "20px",
            width: "300px",
            fontFamily: "Arial"
        },
    }
    useEffect(() => {
        if (auth.user) {
            navigate('/organizations')
        }
    })

    function onChange(event) {
        setFormData(prevState => {
                return {
                    ...prevState,
                    [event.target.name]: event.target.value
                }
            }
        )
    }

    function login(event) {
        event.preventDefault();
        event.persist();
        UserService.login(formData).then((res) => {
            auth.login(res.data);
            localStorage.setItem('userInfo', JSON.stringify(res.data.data));
            if (res.data.data.isSuperAdmin === true) {
                auth.setSuperAdmin(true);
                localStorage.setItem('isSuperAdmin', "true");
                navigate('/organizations', {replace: true})
            } else {
                auth.setSuperAdmin(false);
                localStorage.setItem('isSuperAdmin', "false");
                navigate('/organizations/all', {replace: true})
            }
        }).catch((error) => {
            setAlert(true);
        })
    }

    return (
        <div className='image'>
            <img style={Styles.img} src="https://cdn-icons-png.flaticon.com/128/2957/2957990.png"/>
            <div className='sign'>
                <h3 style={Styles.h3}>Sign in</h3>
                {alert === true ? <div style={Styles.alert}>
                    <Alert severity="error" onClose={() => {
                        setAlert(false)
                    }}>something is wrong ! — <b>please verify email and password!</b></Alert>
                </div> : ""}

                <form style={Styles.body} onSubmit={login}>
                    <div className="mb-3">
                        <label style={Styles.label}>Email address</label>
                        <input style={Styles.input}
                               type="email"
                               name="email"
                               value={formData.email}
                               className="form-control"
                               placeholder="Enter email"
                               onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label style={Styles.label}>Password</label>
                        <input style={Styles.input}
                               value={formData.password}
                               type="password"
                               name="password"
                               className="form-control"
                               placeholder="Enter password"
                               onChange={(e) => onChange(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <button style={Styles.button} type="submit" className="btn btn-primary ">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Forgot <a href="src/compenents/Login#">password?</a>
                    </p>
                </form>

            </div>
        </div>
    )

}