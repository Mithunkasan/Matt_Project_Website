"use client";

import { motion } from "framer-motion";
import { Rocket, Shapes, LineChart, FileText, Code2, HelpCircle } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion-constants";

export function ServicesSection() {
    const services = [
        {
            title: "Final Year Projects",
            desc: "Complete guidance for UG and PG students ensuring academic excellence and innovation.",
            icon: <Rocket className="w-8 h-8" />,
            tag: "UG / PG"
        },
        {
            title: "Mini & Major Projects",
            desc: "Practical project implementations for all semesters across multiple technical domains.",
            icon: <Shapes className="w-8 h-8" />,
            tag: "Academic"
        },
        {
            title: "Real-Time Applications",
            desc: "Projects focused on solving real-world challenges using modern technology stacks.",
            icon: <LineChart className="w-8 h-8" />,
            tag: "Industry Standard"
        },
        {
            title: "Documentation & Reports",
            desc: "Professional project reports, synopsys, and documentation according to university standards.",
            icon: <FileText className="w-8 h-8" />,
            tag: "Comprehensive"
        },
        {
            title: "Source Code & Explanation",
            desc: "Full source code with detailed explanations to help students understand the technical depth.",
            icon: <Code2 className="w-8 h-8" />,
            tag: "Learning Hub"
        },
        {
            title: "Viva & Demo Support",
            desc: "Mock vivas and complete project demonstrations to boost student confidence for defense.",
            icon: <HelpCircle className="w-8 h-8" />,
            tag: "Final Step"
        }
    ];

    return (
        <section id="services" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">What We Do</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        We design, develop, and deliver custom academic projects that meet university standards and industry trends.
                    </p>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            whileHover={{ y: -5 }}
                            className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 bg-white text-[#12498b] rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#b12222] bg-[#b12222]/10 px-3 py-1 rounded-full">
                                    {service.tag}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">{service.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
