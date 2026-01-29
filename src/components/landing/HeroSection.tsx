"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Search } from "lucide-react";
import { Session } from "next-auth";

interface HeroSectionProps {
    session: Session | null;
}

export function HeroSection({ session }: HeroSectionProps) {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-50">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#12498b]/10 text-[#12498b] text-sm font-semibold mb-8 border border-[#12498b]/20"
                    >
                        <Zap className="w-4 h-4" />
                        <span>Celebrating 10+ Years of Excellence</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.1]"
                    >
                        Matt Project Solutions
                        <span className="block text-2xl md:text-3xl font-medium text-[#b12222] mt-4">
                            Turning Student Ideas into Successful Projects Since 2014
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto"
                    >
                        Trusted project development for diploma, UG, and PG students. We deliver custom, high-quality projects tailored to university standards and modern technology.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                    >
                        {session ? (
                            <Link
                                href="/home"
                                className="group relative flex items-center gap-2 bg-[#12498b] text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:bg-[#0d3566] shadow-xl overflow-hidden"
                            >
                                <span className="relative z-10">Track Your Project Status</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#12498b] to-[#0d3566] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/register"
                                    className="group relative flex items-center gap-2 bg-[#12498b] text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:bg-[#0d3566] shadow-xl overflow-hidden"
                                >
                                    <span className="relative z-10">Get Started Now</span>
                                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#12498b] to-[#0d3566] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </Link>
                                <Link
                                    href="/login"
                                    className="group flex items-center gap-2 bg-white text-gray-900 border-2 border-gray-200 px-10 py-4 rounded-full font-bold text-lg transition-all hover:border-[#12498b] hover:text-[#12498b]"
                                >
                                    Student Login
                                </Link>
                            </>
                        )}
                    </motion.div>

                    {/* Tracking Callout */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="p-4 rounded-2xl bg-white border border-[#12498b]/10 shadow-sm inline-block"
                    >
                        <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                            <Search className="w-4 h-4 text-[#12498b]" />
                            Are you a student? Log in to track your project progress in real-time.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
