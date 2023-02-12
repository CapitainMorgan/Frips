import { TextField } from "@material-ui/core";

const TextFieldLogin = (props) => {
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
};

export default TextFieldLogin;

/**/
