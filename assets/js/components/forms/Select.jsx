import React from 'react';

const Select = ({name, label, value, placeholder = "Selectionner une option", error, onChange, children}) => {
    return ( <> 
        <div className="form-group ">
            <label htmlFor={name}>{label}</label>
            <select onChange={onChange} name={name} placeholder="kjasdfalksdf" defaultValue={(value && value || 'DEFAULT')} id={name} className={"form-control" + (error && " is-invalid")}>
                <option value="DEFAULT" > -- {placeholder} -- </option>
                {children}
            </select>
            <p className="invalid-feedback">{error}</p>
        </div>
      </> );
}
 
export default Select;