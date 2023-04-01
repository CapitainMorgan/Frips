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

  if (props.name === "step2.Birthday") {
    return (
      <TextField
        name={props.name}
        onBlur={props.onBlur}
        onChange={(event) => {
          const { value } = event.target;

          let birthdate = value.replace(/[^\d]/g, "").slice(0, 8);

          // Add slashes between the day and month, and between month and year
          if (birthdate.length >= 3) {
            birthdate = `${birthdate.slice(0, 2)}/${birthdate.slice(2)}`;
          }
          if (birthdate.length >= 6) {
            birthdate = `${birthdate.slice(0, 5)}/${birthdate.slice(5)}`;
          }

          props.onChange(birthdate);
        }}
        onKeyDown={props.onKeyDown}
        onKeyPress={props.onKeyPress}
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
  if (props.name === "step1.Password") {
    return (
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
    );
  } else {
    return (
      <TextField
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        onKeyPress={props.onKeyPress}
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
