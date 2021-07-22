import { createContext, useState } from "react";
import useStyles from "../styles/GlobalStyles";

export const FormContext = createContext({
  values: { refValue: "", finish: false },
  handleChange: (e) => {},
  onChange: (e) => {},
});

export const ChefFormContextProvider = (props) => {
  const [values, setValues] = useState({ refValue: 1 });
  const classes = useStyles();

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const onChange = (values) => {
    setValues({ ...values });
  };

  return (
    <div className={classes.newBackground1}>
      <FormContext.Provider value={{ handleChange, onChange, values }}>
        {props.children}
      </FormContext.Provider>
    </div>
  );
};
