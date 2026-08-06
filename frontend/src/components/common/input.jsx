import React from 'react'
import './Input.css'

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  prefix,
  suffix,
  helpText,
  required = false,
  ...rest
}) {
  return (
    <div className="input-field">
      {label ? (
        <label className="input-field__label" htmlFor={name}>
          {label}
          {required ? <span className="input-field__required"> *</span> : null}
        </label>
      ) : null}
      <div className={`input-field__wrap ${error ? 'input-field__wrap--error' : ''}`}>
        {prefix ? <span className="input-field__affix">{prefix}</span> : null}
        <input
          id={name}
          name={name}
          type={type}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
        />
        {suffix ? <span className="input-field__affix">{suffix}</span> : null}
      </div>
      {error ? (
        <p className="input-field__error">{error}</p>
      ) : helpText ? (
        <p className="input-field__help">{helpText}</p>
      ) : null}
    </div>
  )
}
