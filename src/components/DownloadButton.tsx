import React from 'react'

type Props = {}

const DownloadButton = (props: Props) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button onClick={handlePrint} className="mb-4 w-full p-3 rounded-md bg-sky-600 text-center font-bold mx-auto text-white cursor-pointer">
      Print CV
    </button>
  );
}

export default DownloadButton