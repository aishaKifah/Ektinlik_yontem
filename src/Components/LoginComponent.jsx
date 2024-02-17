import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import React, { Component, useCallback } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Redirect } from 'react-router';
import KullaniciService from '../services/KullaniciService';
import SocialSentimentVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';

import ReCAPTCHA from "react-google-recaptcha";
import { Base64 } from 'js-base64';


let isisVerify=false;
let  errorMessage   = '';
let label= '';
class LoginComponent extends Component {



  constructor(props) {
    super(props);
      
    isisVerify=false;
    this.state = {
      username: '',
      password: '',
      notMatchlabel: ''
     
    }


  }


  handleOnClick = (email, pass) => {
   // console.log('his.state.isVerified'+this.state.isVerified);
    if (isisVerify) {

      let encodedUser = Base64.encode(email);
	   	let encodedPassword =  Base64.encode(pass);;

      console.log('etkinlik => ' + JSON.stringify(encodedUser ))
      KullaniciService.getById(encodedUser, encodedPassword).then(res => {
        if (res.data == "match"){
          this.props.history.push('/etkinlikler');
          this.errorMessage=res.data;}
          
          else if (res.data== "Not match"){  
            alert('Sifre veya email yanlistir');
          }else{
            alert('Bu e-posta kayitlarimizda yok');

          } 

          
         
      });
    } else {
      alert('Robot olmadiginizi dogrulayainiz');
    }

  }

  


 onChange(value) {
   if(value !==null){

  console.log("Captcha value:", value);

  // console.log("isVerified:", this.state.isVerified);
  isisVerify=true;
}

}

  render() {

  
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Giris"
            />
            <TextField
              hintText="E-posta"
              floatingLabelText="E-posta"
              onChange={(event, newValue) => this.setState({ email: newValue })}
              style={style1}
            />
            <br />
            <TextField
 
              type="password"
              hintText="Parolayi girin"
              floatingLabelText="Parola"
              onChange={(event, newValue) => this.setState({ password: newValue })}
              style={style3} />
            <br />
            <label>

            </label>
            <form>
              <text errorMessage> </text>    </form> 
            <ReCAPTCHA
              sitekey="6Ldo7oEaAAAAAN661IdSE5RWAf_7XU2Ro2wob3Jf"
              onChange={this.onChange}
              style={style4}
            />

            <RaisedButton label="Giris yap" primary={true} style={style} onClick={() => this.handleOnClick(this.state.email, this.state.password)} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  marginLeft: 600,
  marginTop: 50,

};
const style1 = {
  marginLeft: 500,
  marginTop: 50,

};
const style3 = {
  marginLeft: 500,
  //marginTop : 50,

};
const style4 = {
  marginLeft: 500,
  marginTop: 50,

};
export default LoginComponent;