import React from "react";

const Form = props => {
  const handleChange = props.handleFormChange;
  const id = props.id;

  return (
    <form>
      <label htmlFor="id">Enter {props.type} ID</label>
      <input type="text" name="id" value={id} onChange={handleChange}></input>
    </form>
  );
};

export default Form;
