"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function WhyChooseUsSection() {
    const features = [
        "10+ Years of Experience",
        "100% Custom Projects (No Reuse)",
        "Affordable Pricing for Students",
        "Complete Guidance from Start to Finish",
        "Real-Time & Industry-Relevant Topics",
        "On-Time Delivery",
        "Friendly Technical Support",
        "Academic Standards Compliance",
        "Career Guidance Support"
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Matt Project Solutions?</h2>
                    <div className="w-20 h-1.5 bg-[#12498b] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-[#12498b]/20"
                        >
                            <div className="flex-shrink-0 w-8 h-8 bg-[#b12222]/10 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-[#b12222]" />
                            </div>
                            <span className="font-semibold text-gray-700">{feature}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
