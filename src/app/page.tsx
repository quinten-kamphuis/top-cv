'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import CVPreview from "@/components/CVPreview";
import DownloadButton from "@/components/DownloadButton";
import InputField from "@/components/InputField";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function Home() {

  const [credentials, setCredentials] = useState({
    photo: "",
    name: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [education, setEducation] = useState([
    { id: 1, institution: "", location: "", degree: "", startDate: "", endDate: "" },
  ]);
  const [experience, setExperience] = useState([
    { id: 1, company: "", location: "", position: "", startDate: "", endDate: "" },
  ]);

  const handleCredentialChange = (field: string) => (value: string) => {
    setCredentials((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleArrayChange = <T extends { id: number; [key: string]: any }>(
    array: T[],
    setArray: React.Dispatch<React.SetStateAction<T[]>>,
    id: number,
    field: keyof T
  ) => (value: T[keyof T]) => {
    setArray((prevArray) =>
      prevArray.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddField = <T extends { id: number; [key: string]: any }>(
  array: T[],
  setArray: React.Dispatch<React.SetStateAction<T[]>>,
  newItem: Omit<T, "id">
) => () => {
  setArray((prevArray) => [
    ...prevArray,
    {
      id: prevArray.length ? prevArray[prevArray.length - 1].id + 1 : 1,
      ...newItem,
    } as T,
  ]);
};
const handleRemoveField = <T extends { id: number }>(
  array: T[],
  setArray: React.Dispatch<React.SetStateAction<T[]>>,
  id: number
) => () => {
  setArray((prevArray) => prevArray.filter((item) => item.id !== id));
};

  useEffect(() => {
    const savedCredentialsDetails = localStorage.getItem("credentials");
    if (savedCredentialsDetails) {
      setCredentials(JSON.parse(savedCredentialsDetails));
    }
    
    const savedEducation = localStorage.getItem("education");
    if (savedEducation) {
      setEducation(JSON.parse(savedEducation));
    }
  
    const savedExperience = localStorage.getItem("experience");
    if (savedExperience) {
      setExperience(JSON.parse(savedExperience));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("credentials", JSON.stringify(credentials));
  }, [credentials]);
  
  useEffect(() => {
    localStorage.setItem("education", JSON.stringify(education));
  }, [education]);
  
  useEffect(() => {
    localStorage.setItem("experience", JSON.stringify(experience));
  }, [experience]);


  return (
    <>
      <div className="w-1/3 max-w-[400px] flex flex-col justify-between p-4 overflow-y-auto">
        <div>
        <InputField label="Photo" value='' onChange={handleCredentialChange("photo")} forPhoto />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Credentials</AccordionTrigger>
            <AccordionContent>
              <InputField label="Name" value={credentials.name} onChange={handleCredentialChange("name")} />
              <InputField label="Email" value={credentials.email} onChange={handleCredentialChange("email")} type="email" />
              <InputField label="Phone" value={credentials.phone} onChange={handleCredentialChange("phone")} />
              <InputField label="Date of Birth" value={credentials.dob} onChange={handleCredentialChange("dob")} type='date' />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Education</AccordionTrigger>
            <AccordionContent>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                   <InputField
                      label="Institution"
                      value={edu.institution}
                      onChange={handleArrayChange(education, setEducation, edu.id, "institution")}
                    />
                    <InputField
                      label="Location"
                      value={edu.location}
                      onChange={handleArrayChange(education, setEducation, edu.id, "location")}
                    />
                    <InputField
                      label="Degree"
                      value={edu.degree}
                      onChange={handleArrayChange(education, setEducation, edu.id, "degree")}
                    />
                    <InputField
                      label="Start Date"
                      value={edu.startDate}
                      onChange={handleArrayChange(education, setEducation, edu.id, "startDate")}
                      type="month"
                    />
                    <InputField
                      label="End Date"
                      value={edu.endDate}
                      onChange={handleArrayChange(education, setEducation, edu.id, "endDate")}
                      type="month"
                    />
                  <button
                    onClick={handleRemoveField(education, setEducation, edu.id)}
                    className="bg-red-500 text-white px-2 py-1 mb-2 rounded"
                  >
                    Remove
                  </button>
                  <Separator />
                </div>
              ))}
              <button onClick={handleAddField(education, setEducation, {institution: "", location: "", degree: "", startDate: "", endDate: ""})} className="bg-sky-600 text-white px-2 py-1 rounded">
                Add Education
              </button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Work experience</AccordionTrigger>
            <AccordionContent>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <InputField
                    label="Company"
                    value={exp.company}
                    onChange={handleArrayChange(experience, setExperience, exp.id, "company")}
                  />
                  <InputField
                      label="Location"
                      value={exp.location}
                      onChange={handleArrayChange(experience, setExperience, exp.id, "location")}
                    />
                  <InputField
                    label="Position"
                    value={exp.position}
                    onChange={handleArrayChange(experience, setExperience, exp.id, "position")}
                  />
                  <InputField
                    label="Start Date"
                    value={exp.startDate}
                    onChange={handleArrayChange(experience, setExperience, exp.id, "startDate")}
                    type="month"
                  />
                  <InputField
                    label="End Date"
                    value={exp.endDate}
                    onChange={handleArrayChange(experience, setExperience, exp.id, "endDate")}
                    type="month"
                  />
                  <button
                    onClick={handleRemoveField(experience, setExperience, exp.id)}
                    className="bg-red-500 text-white px-2 py-1 mb-2 rounded"
                  >
                    Remove
                  </button>
                  <Separator />
                </div>
              ))}
              <button onClick={handleAddField(experience, setExperience, {company: "", location: "", position: "", startDate: "", endDate: ""})} className="bg-sky-600 text-white px-2 py-1 rounded">
                Add Experience
              </button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
        <DownloadButton />
      </div>
      <CVPreview data={{ credentials, education, experience }} />
    </>
  );
}
