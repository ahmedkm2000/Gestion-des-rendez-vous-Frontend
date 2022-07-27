import React, { Component } from 'react'
export default class SignUp extends Component {

    render() {
        const Styles = {
            h3:{
                fontWeight: "500px",
                textAlign:"center"
            },
            label:{
                fontWeight: "500px",
                marginRight:"180px",
            },
            input:{
                fontWeight: "500px",
                marginLeft:"300px",
            },
            img:{
                marginTop:"50px",
                width: "50px",
                height:"50px",
                marginLeft:"610px",
            },
            body : {
                backgroundColor:"#F6F6F6",
                textAlign:"center",
                paddingTop:"10px",
                marginTop:"0px",
                marginLeft:"400px",
                marginRight:"400px",
                border:"1px solid  grey",
            },
            button : {
                backgroundColor: "#04993F",
                marginLeft:"100px",
                width:"300px",

            },

        }
        return (
            <div className='image'>
                <img style={Styles.img} src ="https://cdn-icons-png.flaticon.com/128/2957/2957990.png"/>
                <div className='sign' >
                    <h3 style={Styles.h3}>Sign up</h3>
                    <form style={Styles.body}>

                        <div className="mb-3">
                            <label style={Styles.label}>First name</label>
                            <input style={Styles.input}
                                   type="text"
                                   className="form-control"
                                   placeholder="First name"
                            />
                        </div>
                        <div className="mb-3">
                            <label style={Styles.label}>Last name</label>
                            <input style={Styles.input} type="text" className="form-control" placeholder="Last name" />
                        </div>
                        <div className="mb-3">
                            <label style={Styles.label}>Email adress</label>
                            <input style={Styles.input}
                                   type="email"
                                   className="form-control"
                                   placeholder="Enter email"
                            />
                        </div>
                        <div className="mb-3">
                            <label style={Styles.label}>Password</label>
                            <input style={Styles.input}
                                   type="password"
                                   className="form-control"
                                   placeholder="Enter password"
                            />
                        </div>
                        <div className="d-grid">
                            <button style={Styles.button}  type="submit" className="btn btn-primary">
                                Sign Up
                            </button>
                        </div>
                        <p className="forgot-password text-right">
                            Already registered <a href="/sign-in">sign in?</a>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}
