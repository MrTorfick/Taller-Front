import React, { useId } from 'react'

const InputCampo = ({ label, type, placeholder, ref, onChange }) => {
  const id = useId();
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>{label}</label>
      <input ref={ref} type={type} className="form-control" placeholder={placeholder} id={id} onChange={onChange} />
    </div>
  )
}

export default InputCampo