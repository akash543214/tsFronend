import { ReactNode } from "react";

export default function FeatureCard (props:{ icon:ReactNode,
   title:string, 
   description:string }) 
   {
    
    const { icon, title, description } = props;

    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-blue-600 flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    );
  };