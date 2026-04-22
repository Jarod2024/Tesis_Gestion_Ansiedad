'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface VideoProps {
  title: string;
  videoId: string;
}

function VideoCard({ title, videoId, onClick }: VideoProps & { onClick: () => void }) {
  const thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 hover:shadow-xl"
    >
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-semibold text-[#1E4D8C]">{title}</h4>
      </div>
    </div>
  );
}

const EDUCATIONAL_VIDEOS = [
  {
    title: 'Técnica de Respiración Diafragmática',
    videoId: 'T96Bl1Md_Oc',
  },
  {
    title: '¿Qué Hacer Durante un Ataque de Ansiedad?',
    videoId: '34ZVrmJxEUo',
  },
  {
    title: 'Técnica de Respiración 4-7-8',
    videoId: 'B5rhpspkyWw',
  },
  {
    title: '¿Qué es la Atención Plena?',
    videoId: 'Gq7jTUYtOz4',
  },
  {
    title: 'Beneficios de la Atención Plena para tu Salud Mental',
    videoId: 'awB9G2WZ_2w',
  },
  {
    title: 'Cómo Practicar la Atención Plena en tu Día a Día',
    videoId: '64bWMVSX_ng',
  },
];

function Modal({ videoId, title, onClose }: { videoId: string; title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#1E4D8C]">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            className="w-full h-full rounded"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export function VideosEducativos({ onHomeClick }: { onHomeClick: () => void }) {
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string } | null>(null);
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-[#1E4D8C] mb-4">Videos Educativos</h1>
        <p className="text-xl text-slate-700">Aprende técnicas de respiración, atención plena y estrategias para regular tus emociones.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EDUCATIONAL_VIDEOS.map((video, index) => (
          <VideoCard 
            key={index} 
            {...video} 
            onClick={() => setSelectedVideo(video)}
          />
        ))}
      </div>

      {selectedVideo && (
        <Modal 
          videoId={selectedVideo.videoId} 
          title={selectedVideo.title} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
      <div className="mt-16 pt-12 border-t-2 border-blue-200 text-center">
        <button
          onClick={onHomeClick}
          className="py-3 px-8 bg-[#71A5D9] text-white font-bold rounded-lg hover:bg-[#1E4D8C] transition shadow-lg"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
    
  );
}