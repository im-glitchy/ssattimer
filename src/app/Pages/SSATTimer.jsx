"use client";
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import SideMenu from '../Components/layout/SideMenu';
import SectionTimer from '../Components/timer/SectionTimer';
import BreakTimer from '../Components/timer/BreakTimer';
import CompletionModal from '../Components/timer/CompletionModal';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

const TEST_SCHEDULE = [
    { name: "Part 1: Writing", type: "Writing", duration: 25 },
    { name: "Part 2: Break", type: "Break", duration: 10 },
    { name: "Part 3: Quantitative 1", type: "Quantitative", duration: 30 },
    { name: "Part 4: Reading", type: "Reading", duration: 40 },
    { name: "Part 5: Break", type: "Break", duration: 5 },
    { name: "Part 6: Verbal", type: "Verbal", duration: 30 },
    { name: "Part 7: Quantitative 2", type: "Quantitative", duration: 30 },
];

export default function SSATTimer() {
    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    
    const currentPart = useMemo(() => TEST_SCHEDULE[currentPartIndex], [currentPartIndex]);

    const advanceToNextPart = useCallback(() => {
        if (currentPartIndex < TEST_SCHEDULE.length - 1) {
            setCurrentPartIndex(prev => prev + 1);
        } else {
            setShowCompletionModal(true);
        }
    }, [currentPartIndex]);
    
    const goToPreviousPart = () => {
        if (currentPartIndex > 0) {
            setCurrentPartIndex(prev => prev - 1);
        }
    };

    const handleReset = () => {
        setCurrentPartIndex(0);
        setShowCompletionModal(false);
    };

    return (
        <div className="flex rounded-xl flex-col md:flex-row gap-6 p-6 min-h-[calc(100vh-88px)]">
            {/* Side Menu */}
            <aside className="w-full md:w-72 lg:w-80 flex-shrink-0 rounded-xl">
                <SideMenu 
                    schedule={TEST_SCHEDULE}
                    currentPartIndex={currentPartIndex}
                    onSelectPart={setCurrentPartIndex}
                    onReset={handleReset}
                />
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col justify-center p-6 bg-white/90 backdrop-blur-sm rounded-xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPartIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex flex-col justify-center items-center flex-1"
                    >
                        <div className="flex-1 flex flex-col justify-center w-full max-w-xl">
                            {currentPart.type === "Break" ? (
                                <BreakTimer 
                                    durationMinutes={currentPart.duration}
                                    onComplete={advanceToNextPart}
                                    onSkip={advanceToNextPart}
                                />
                            ) : (
                                <SectionTimer 
                                    section={currentPart.name}
                                    durationMinutes={currentPart.duration}
                                    onComplete={advanceToNextPart}
                                />
                            )}
                        </div>
                        
                        {/* Navigation Controls */}
                        <div className="mt-6 flex justify-between w-full max-w-lg">
                            <Button
                                variant="outline"
                                onClick={goToPreviousPart}
                                disabled={currentPartIndex === 0}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Previous
                            </Button>
                            {currentPartIndex === TEST_SCHEDULE.length - 1 ? (
                                <Button
                                    onClick={handleReset}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Reset Session
                                </Button>
                            ) : (
                                <Button
                                    onClick={advanceToNextPart}
                                    disabled={currentPartIndex === TEST_SCHEDULE.length - 1}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    Next Section
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Completion Modal */}
            <CompletionModal
                isOpen={showCompletionModal}
                onClose={() => setShowCompletionModal(false)}
                completedSections={TEST_SCHEDULE}
                onResetAll={handleReset}
            />
        </div>
    );
}