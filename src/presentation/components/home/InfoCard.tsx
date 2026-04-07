import { ReactNode } from 'react';

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export function InfoCard({ icon, title, description, buttonText, onButtonClick }: InfoCardProps) {
  return (
    <div className="group bg-white rounded-2xl border-4 border-[#71A5D9] p-8 shadow-xl hover:shadow-2xl transition transform hover:scale-105 cursor-pointer flex flex-col h-full">
      <div className="text-[#71A5D9] mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-[#1E4D8C] mb-4">{title}</h3>
      <p className="text-slate-700 text-lg mb-6 leading-relaxed flex-grow">
        {description}
      </p>
      <button 
        onClick={onButtonClick}
        className="w-full py-3 px-6 bg-[#71A5D9] text-white font-bold text-lg rounded-lg hover:bg-[#1E4D8C] transition shadow-lg"
      >
        {buttonText}
      </button>
    </div>
  );
}
