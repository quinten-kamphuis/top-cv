import { format, parseISO } from 'date-fns'
import React from 'react'

type Props = {
    type: 'EXP' | 'EDU'
    institution?: string
    location?: string
    position?: string 
    startDate?: string 
    endDate?: string
}

const getDateText = (startDate: string | undefined, endDate: string | undefined) => {
    const formattedStartDate = startDate ? format(parseISO(startDate), 'MMMM yyyy') : null;
    const formattedEndDate = endDate ? format(parseISO(endDate), 'MMMM yyyy') : null;

    if (startDate && endDate) return `${formattedStartDate} - ${formattedEndDate}`;
    if (startDate) return `Started: ${formattedStartDate}`;
    if (endDate) return `Graduated: ${formattedEndDate}`;
    return 'Month, Year';
};

const CVComponent = ({ type, institution, location, position, startDate, endDate}: Props) => {
  return (
    <div className="flex gap-24 items-center mx-6 my-8">
        <div className="flex items-center w-full max-w-[350px]">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-bold">
                {type}
            </div>
            <div className="ml-4">
                <h2 className="text-2xl font-semibold text-gray-800">{type === 'EDU' ? institution || 'University' : institution || 'Company Name'}</h2>
                <p className="text-gray-600">{location || 'City, State'}</p>
            </div>
        </div>
        <div>
            <h3 className="text-xl font-semibold text-gray-700">{type === 'EDU' ? position || 'Degree' : position || 'Job Title'}</h3>
            <p className="text-gray-600">{getDateText(startDate, endDate)}</p>
        </div>
    </div>
  )
}

export default CVComponent