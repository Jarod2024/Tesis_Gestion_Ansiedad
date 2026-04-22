'use client';

import { useRouter } from 'next/navigation';

interface GuideCardProps {
  title: string;
  image: string;
  url: string;
}

function GuideCard({ title, image, url }: GuideCardProps) {
  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 hover:shadow-xl relative"
    >
      <img src={image} alt={title} className="w-full h-96 object-cover" />
      <div className="absolute inset-0 bg-[#71A5D9] bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <h4 className="text-white text-lg font-semibold text-center px-4">{title}</h4>
      </div>
    </div>
  );
}

const ACADEMIC_GUIDES = [
  {
    title: 'Manejo de Ansiedad Académica',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Ak-TOyX1tOiXYnjEMYbLb35_7wiLpEzZAA&s',
    url: 'https://cada.udd.cl/files/2018/11/2.-A.pdf',
  },
  {
    title: 'Guía para el Estrés Académico',
    image: 'https://psiconecta.org/wp-content/uploads/2023/05/Captura-de-Pantalla-2023-05-03-a-las-16.26.05.png',
    url: 'https://www.uv.es/iqdocent/guias/estres.pdf',
  },
  {
    title: 'Taller de Psicoeducación: La Ansiedad',
    image: 'https://imgv2-1-f.scribdassets.com/img/document/772084007/original/f0e99f8c0c/1?v=1',
    url: 'https://www.plenainclusioncanarias.org/wp-content/uploads/2022/12/Taller-de-psicoeducacion.-La-ansiedad-Guia-de-actividades.pdf',
  },
];

const SOCIAL_GUIDES = [
  {
    title: 'Ansiedad Social: Cómo Superarla',
    image: 'https://claralopezpsicologia.com/wp-content/uploads/2024/10/ansiedad-social-portada.png',
    url: 'https://www.fundacionforo.com/uploads/pdfs/manual-tas.pdf', 
  },
  {
    title: 'Competencia Socioemocional: Ansiedad Social',
    image: 'https://upbility.es/cdn/shop/articles/Copy_of_5._9_9e7ebed4-e935-4354-9a19-ef134311a559.png?v=1742473431&width=1600',
    url: 'https://www.alcazarenformacion.es/wp-content/uploads/2024/07/GT_ansiedad-social_MCH.pdf', 
  },
  {
    title: 'Timidez y Fobia Social: Estrategias',
    image: 'https://itaepsicologia.com/wp-content/uploads/2018/07/blog-timidez-fobia-social.jpg',
    url: 'https://www.edesclee.com/img/cms/pdfs/9788433027115.pdf', 
  },
];

const PERSONAL_GUIDES = [
  {
    title: 'Guías de Autoayuda: Depresión y Ansiedad',
    image: 'https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/sites/default/files/styles/sas_200x/public/sincfiles/wsas-media-imagen_publicacion/2020/pub_567_1.jpg?itok=9zDGMg4D',
    url: 'https://consaludmental.org/publicaciones/Guiasautoayudadepresionansiedad.pdf',
  },
  {
    title: 'Manejo Integral de la Ansiedad',
    image: 'https://www.espainun.com/wp-content/uploads/2024/02/ataques-de-ansiedad-768x768.jpg',
    url: 'https://semergen.es/files/docs/biblioteca/docConsultaRapida/2024/manejodelaAnsiedad.pdf',
  },
  {
    title: 'Cómo Controlar la Ansiedad en tu Vida',
    image: 'https://img.freepik.com/vector-premium/persona-siente-derrotada-abrumada-mientras-lucha-encontrar-paz-medio-caos-emocional_216520-131353.jpg?semt=ais_incoming&w=740&q=80',
    url: 'https://www.osakidetza.euskadi.eus/contenidos/informacion/salud_mental/es_4050/adjuntos/ansiedadComoControlarla_c.pdf',
  },
];

export function Biblioteca({ onHomeClick }: { onHomeClick: () => void }) {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-[#1E4D8C] mb-4">Biblioteca de Guías de Autoayuda</h1>
        <p className="text-xl text-slate-700">Recursos prácticos y verificados para manejar ansiedad, depresión y mejorar tu salud mental.</p>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-black text-[#1E4D8C] mb-8">Área Académica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ACADEMIC_GUIDES.map((guide, index) => (
            <GuideCard key={index} {...guide} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-black text-[#1E4D8C] mb-8">Área Social</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SOCIAL_GUIDES.map((guide, index) => (
            <GuideCard key={index} {...guide} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-black text-[#1E4D8C] mb-8">Área Personal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PERSONAL_GUIDES.map((guide, index) => (
            <GuideCard key={index} {...guide} />
          ))}
        </div>
      </section>
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