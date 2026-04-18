import React from 'react'
import Image from 'next/image'
import type { doctorAgent } from './DoctorAgentCard'
import { SessionChatTable } from '@/config/schema';

type props={
    doctorAgent:doctorAgent,
    setSelectedDoctor:any,
    selectedDoctor:doctorAgent

}
function SuggestedDoctorCard({doctorAgent,setSelectedDoctor,selectedDoctor}:props) {
  return (
    <div className={`flex flex-col items-center justify-between border rounded-2xl shadow p-5 hover:border-blue-500 cursor-pointer
    ${selectedDoctor?.id==doctorAgent?.id&&'border-blue-500'}`}
    onClick={()=>setSelectedDoctor(doctorAgent)}>
      <Image src={doctorAgent?.image}
      alt={doctorAgent?.specialist}
      width={70}
      height={70}
      className='w-[50px] h-[50px] rounded-4xl object-cover'
      />
      <h2 className='font-bold text-sm text-center'>
        {doctorAgent?.specialist}
        <p className='text-xs text-center line-clamp-2'>{doctorAgent?.description}</p>
      </h2>
    </div>
  )
}

export default SuggestedDoctorCard
