import { TextField } from "@material-ui/core";

const TextFieldLogin = ({ placeholder, field, form }) => {
    return (
      <TextField
        fullWidth
        id={field.name}
        style={{padding:5}}
        name={field.name}
        value={field.value}
        autoComplete="off"
        onChange={(e) => form.setFieldValue(field.name, e.target.value)}
        placeholder={placeholder}
        InputProps={{
          spellCheck: false,
  
          style: { fontSize: 16 },
        }}
      />
    );
  };

  export default TextFieldLogin