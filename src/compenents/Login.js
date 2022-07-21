import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    const Styles = {
      h3:{
               
              fontWeight: "500px",
              fontFamily: "Arial",
              textAlign:"center"
             
          },
          label:{
               
            fontWeight: "500px",
            fontFamily: "Arial",
            marginRight:"180px",
           
        },  
          input:{
               
            fontWeight: "500px",
            fontFamily: "Arial",
            marginLeft:"300px",
           
        },

          img:{
            marginTop:"100px",   
            width: "50px",
            height:"50px",
            marginLeft:"610px",
            
        },

      body : {
            backgroundColor:"#F6F6F6",
            textAlign:"center",
            paddingTop:"10px",
            marginTop:"20px",
            marginLeft:"400px",
            marginRight:"400px",
            border:"1px solid  grey",
            fontFamily: "Arial"
          },
          

          input : {
            
            textAlign:"center",
            maxWidth:"300px",
            marginLeft:"100px",
           
            fontFamily: "Arial"
          },
           
          button : {
            backgroundColor: "#04993F",
            marginLeft:"20px",
            width:"300px",
            
      
            fontFamily: "Arial"
          },

        
      }
    return (
    
    <div className='image'><img style={Styles.img} src ="https://cdn-icons-png.flaticon.com/128/2957/2957990.png"/>
      <div className='sign' >
      <h3 style={Styles.h3}>Sign in</h3> 
      
      <form style={Styles.body}  >
         

        <div className="mb-3">
          <label style={Styles.label}>Email address</label>
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
}