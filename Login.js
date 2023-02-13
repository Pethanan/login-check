import React, { useState, useReducer, useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';


const emailReducer = (state, action) => {
  if(action.type ==="USER_INPUT")
  {
    return {value: action.val, isValid: action.val.includes("@")};
  }
  if(action.type==="INPUT_BLUR")
  {
    return {value: state.value, isValid: state.value.includes("@")};
  }
  return {value:"", isValid: false};  
}

const pwdReducer = (state, action) => {
  if(action.type ==="USER_INPUT")
  {
    return {value: action.val, isValid: action.val.includes("@")};
  }
  if(action.type === "INPUT_BLUR")
  {
    return {value: state.value, isValid: state.value.includes("@")};
  }
  return {value:"", isValid: false};  
}


const Login = (props) => {
  
  const [formIsValid, setFormIsValid] = useState(false);
  
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: "", isValid: null});
  const [pwdState, dispatchPwd] = useReducer(pwdReducer, {value: "", isValid: null});
  const ctx = useContext(AuthContext);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "USER_INPUT", val: event.target.value});

    setFormIsValid(
      event.target.value.includes('@') && pwdState.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPwd({type: "USER_INPUT", val: event.target.value});

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "INPUT_BLUR"});
  };

  const validatePasswordHandler = () => {
    dispatchEmail({type: "INPUT_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, pwdState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <Input id="email" label="E-mail ID" type="email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}></Input>

      <Input id="password" label="password" type="password" value={pwdState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}></Input>

   <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
