import React from 'react';
// Import the actual icon components you want to use
import { Scale, Lock, DollarSign, Zap } from 'lucide-react'; 

export default function FeaturesSection() {
    
    // 1. Update the features array to use imported Icon components directly
    const features = [
        {
            // Icon 1: Legal/Trust
            icon: Scale, 
            title: "Your Trusted Legal Professionals",
            description: "All our lawyers are licensed and verified by UAE authorities.",
        },
        {
            // Icon 2: Security/Privacy
            icon: Lock,
            title: "Secure & Private",
            description: "PDPL-compliant platform with end-to-end encryption.",
        },
        {
            // Icon 3: Pricing/Transparency
            icon: DollarSign,
            title: "Transparent Pricing",
            description: "Fixed prices with no hidden fees or surprise charges.",
        },
        {
            // Icon 4: Speed/Response
            icon: Zap,
            title: "Quick Response",
            description: "Get responses within 24 hours; urgent cases handled faster.",
        },
    ];

    // Colors remain the same for dynamic styling
    const colors: any = {
        0: "text-fuchsia-600",
        1: "text-orange-600",
        2: "text-pink-600",
        3: "text-yellow-600",
    };
    const bg2: any = {
        0: "bg-fuchsia-600",
        1: "bg-orange-600",
        2: "bg-pink-600",
        3: "bg-yellow-600",
    };
    const bg: any = {
        0: "bg-fuchsia-50",
        1: "bg-orange-50",
        2: "bg-pink-50",
        3: "bg-yellow-50",
    };
    const border: any = {
        0: "border-fuchsia-600",
        1: "border-orange-600",
        2: "border-pink-600",
        3: "border-yellow-600",
    };

    return (
        <section className="bg-white py-16"> 
            <div className="container mx-auto">
                <h2 className="text-4xl anton tracking-wider text-center text-slate-900 mb-12">
                    Why Choose Us?
                </h2>

                {/* Grid layout adjusted for standard Tailwind/modern class names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        // 2. Destructure the Icon component from the feature object
                        const Icon = feature.icon; 
                        
                        return (
                            <div
                                key={index}
                                className={`
                                    rounded-2xl border ${border[index]} 
                                    ${bg[index]} p-6 transition-all duration-300
                                    hover:shadow-lg hover:scale-[1.03] group
                                `}
                            >
                                {/* 3. Render the Icon component */}
                                <div className={`w-12 h-12 rounded-full ${bg2[index]}  text-white flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                                    {/* Set the size and color for the icon component */}
                                    <Icon className="w-6 h-6 text-white" /> 
                                </div>
                                <h3
                                    className={`font-bold mb-2 ${
                                        colors[index] || "text-slate-900"
                                    } text-xl`}
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-base text-slate-600">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}