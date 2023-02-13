import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";

const TextFieldLogin = (props) => {

  const handleClickShowPassword = () => {
    props.setshowPassword(!props.showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
 
  console.log(props.name ==="step1.Password")
  if(props.name ==="step1.Password"){
    return(
      <TextField
        fullWidth
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        placeholder={props.placeholder}
        value={props.value}
        ref={null}
        type={props.showPassword ? "text" : "password"}
        autoComplete="off"

        InputProps={{
          spellCheck: false,
          endAdornment: (
            <React.Fragment>
              {props.name === "step1.Password" ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {props.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ) : null}
            </React.Fragment>
          ),
          style: { fontSize: 16 },
        }}
      />
    )
  }
  else{
    return (
      <TextField
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        placeholder={props.placeholder}
        value={props.value}
        ref={null}
        multiline={props.name === "Rue"}
        fullWidth
        style={{ padding: 5 }}
        autoComplete="off"
        InputProps={{
          spellCheck: false,
  
          style: { fontSize: 16 },
        }}
      />
    );
  }
};

export default TextFieldLogin;

/**/
