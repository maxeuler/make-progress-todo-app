import React from 'react';
import { AddForm } from './styles/task';

const AddUnitForm = props => (
  <AddForm
    onSubmit={async e => {
      e.preventDefault();
      props.submit();
    }}
  >
    {props.max != 1 && (
      <input
        type="range"
        min="1"
        max={props.max}
        value={props.value}
        onChange={e => props.onChange(parseInt(e.target.value))}
        disabled={props.disabled}
      />
    )}
    <button type="submit" disabled={props.disabled}>
      {props.disabled ? `...` : `+${props.value}`}
    </button>
  </AddForm>
);

export default AddUnitForm;
