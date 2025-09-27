
"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Coffee, PenTool, BookOpen, Calculator, FileText, Play, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const iconMap = {
    Writing: PenTool,
    Reading: BookOpen,
    Verbal: FileText,
    Quantitative: Calculator,
    Break: Coffee
};

export default function SideMenu({ schedule, currentPartIndex, onSelectPart, onReset }) {
    
    return (
        <Card className="shadow-lg h-full flex flex-col rounded-xl overflow-hidden">
            <CardHeader className="p-6">
                <CardTitle className="text-xl text-black font-bold">Test Schedule</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-6">
                <div className="space-y-3 flex-1">
                    {schedule.map((part, index) => {
                        const isCompleted = index < currentPartIndex;
                        const isActive = index === currentPartIndex;
                        const Icon = iconMap[part.type];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={`w-full justify-start h-12 transition-all duration-200 ${
                                        isActive ? 'bg-blue-100 text-blue-800' : ''
                                    } ${
                                        isCompleted ? 'text-gray-400' : 'text-gray-700'
                                    }`}
                                    onClick={() => onSelectPart(index)}
                                >
                                    <div className="flex items-center w-full">
                                        {isCompleted ? (
                                            <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                                        ) : (
                                            <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : ''}`} />
                                        )}
                                        <div className="text-left">
                                            <p className="font-semibold">{part.name}</p>
                                            <p className="text-xs">{part.duration} min</p>
                                        </div>
                                        {isActive && (
                                            <Play className="w-4 h-4 ml-auto text-blue-600 animate-pulse" />
                                        )}
                                    </div>
                                </Button>
                            </motion.div>
                        );
                    })}
                </div>
                <div className="border-t pt-6 mt-6">
                    <Button variant="danger" onClick={onReset} className="w-full px-4 py-2">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset Session
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
