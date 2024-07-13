import React from 'react'

type Props = {
    label: string
    value: string
    onChange: (value: string) => void
    forPhoto?: boolean
    type?: string
}

const InputField = ({ label, value, onChange, forPhoto, type = 'text' }: Props) => {
    return (
      <>
      {forPhoto ? (
      <div className="mb-4 p-3 rounded-md bg-sky-600 text-center">
        <label className={'font-bold mx-auto text-white cursor-pointer'}>Upload Photo
        <input
          className={'hidden'}
          type='file'
          onChange={(e) => onChange(URL.createObjectURL(e.target.files![0]))}
          accept="image/*"
        /></label>
      </div>
      ) : (
      <div className="mb-4">
        <label className={"block text-gray-700 text-sm font-bold mb-2"}>{label}
        <input
          className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        /></label>
      </div>
      )}
      </>)
}

export default InputField