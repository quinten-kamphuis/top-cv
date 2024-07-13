import { format, parseISO } from 'date-fns'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Separator } from './ui/separator'
import CVComponent from './CVComponent'

type Props = {
    data: {
        credentials: {
          photo: string;
          name: string;
          email: string;
          phone: string;
          dob: string;
        };
        education: {
          id: number;
          institution: string;
          location: string;
          degree: string;
          startDate: string;
          endDate: string;
        }[];
        experience: {
          id: number;
          company: string;
          location: string;
          position: string;
          startDate: string;
          endDate: string;
        }[];
    }
    zoom?: number
}

const ZoomControls = ({ changeZoom }: { changeZoom: (action: 'plus' | 'min') => void }) => {
    return (
        <div className='absolute z-50 flex gap-5 m-3'>
            <button onClick={() => changeZoom('plus')} className="cursor-pointer text-muted-foreground rounded-full border-2"><Plus /></button>
            <button onClick={() => changeZoom('min')} className="cursor-pointer text-muted-foreground rounded-full border-2"><Minus /></button>
        </div>
    )
}

const Page = ({ data, zoom }: Props) => {

    const { credentials, education, experience } = data
    
    const pageStyle = {
        transform: `scale(${zoom})`,
        transformOrigin: 'top left',
        width: "210mm",
        height: "297mm",
    }

    const containerStyle = {
        width: `calc(${pageStyle.width} * ${zoom} + 100px)`,
        height: `calc(${pageStyle.height} * ${zoom} + 100px)`,
    }

    return(
        <div className='select-none' style={containerStyle}>
            <div id='cv-preview' className="border mt-14 ml-14 bg-white shadow-md shrink-0 overflow-hidden" style={pageStyle}>
                <div className='flex p-3 gap-6 bg-slate-800 text-white min-h-[150px]'>
                    {credentials.photo &&
                        <Image 
                            className='rounded'
                            src={credentials.photo}
                            alt=''
                            width={150}
                            height={150}
                        />
                    }
                    <div className='flex flex-col justify-end'>
                        <h1 className="text-2xl font-bold">{credentials.name || "Your Name"}</h1>
                        <p>{credentials.email || "example@domain.com"}</p>
                        {credentials.phone && <p>Phone number: {credentials.phone}</p>}
                        {credentials.dob && <p>Date of birth: {format(credentials.dob, 'MM-dd-yy')}</p>}
                    </div>
                </div>
                {education.map((edu) => (
                    <CVComponent 
                        key={edu.id}
                        type='EDU'
                        institution={edu.institution}
                        location={edu.location}
                        position={edu.degree} 
                        startDate={edu.startDate}
                        endDate={edu.endDate}
                    />
                ))}
                {experience.length > 0 && <Separator />}
                {experience.map((exp) => (
                    <CVComponent 
                        key={exp.id}
                        type='EXP'
                        institution={exp.company}
                        location={exp.location}
                        position={exp.position} 
                        startDate={exp.startDate}
                        endDate={exp.endDate}
                    />
                ))}
            </div>
        </div>
    )
}

const CVPreview = (props: Props) => {
    const [zoom, setZoom] = useState(1)

    const onChangeZoom = (action: 'min' | 'plus') => {
        const increment = 0.2;
        console.log(action)
        switch(action){
            case 'plus':
                setZoom(prev => prev < 2 ? prev + increment : prev)
                break;
            case 'min':
                setZoom(prev => prev > 0.3 ? prev - increment : prev)
                break;
        }
    }

    return (
        <div className='w-full bg-slate-100 overflow-scroll'>
            <ZoomControls changeZoom={onChangeZoom}/>
            <Page {...props} zoom={zoom}/>
        </div>
    )
    }

export default CVPreview