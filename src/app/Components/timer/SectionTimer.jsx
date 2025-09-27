"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SectionTimer({ 
    section, 
    durationMinutes, 
    onComplete
}) {
    const [timeRemaining, setTimeRemaining] = useState(durationMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const intervalRef = useRef(null);
    const audioRef = useRef(null);

    const totalSeconds = durationMinutes * 60;
    const progress = ((totalSeconds - timeRemaining) / totalSeconds) * 100;
    
    useEffect(() => {
        // Reset timer when section changes
        setTimeRemaining(durationMinutes * 60);
        setIsRunning(false);
        setIsCompleted(false);
    }, [section, durationMinutes]);

    useEffect(() => {
        if (isRunning && timeRemaining > 0) {
            intervalRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        setIsCompleted(true);
                        onComplete?.(section);
                        // Play completion sound
                        if (audioRef.current) {
                            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, timeRemaining, section, onComplete]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsCompleted(false);
        setTimeRemaining(totalSeconds);
    };

    const getTimeColor = () => {
        if (isCompleted) return "text-green-600";
        if (timeRemaining <= 300 && isRunning) return "text-red-500";
        if (timeRemaining <= 600 && isRunning) return "text-orange-500";
        return "text-gray-900";
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between items-center w-full mb-2">
                <h2 className="text-xl font-semibold text-gray-900">
                    {section}
                </h2>
                <div className="flex items-center gap-2">
                    {isCompleted && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    {timeRemaining <= 300 && isRunning && !isCompleted && (
                        <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
                    )}
                    <span className="text-sm text-gray-500 font-medium">
                        {durationMinutes} min
                    </span>
                </div>
            </div>

            <div className="text-center w-full my-4">
                <motion.div 
                    className={`text-6xl md:text-8xl font-bold font-mono ${getTimeColor()}`}
                    animate={{ 
                        scale: (timeRemaining <= 60 && isRunning) ? [1, 1.05, 1] : 1 
                    }}
                    transition={{ 
                        repeat: (timeRemaining <= 60 && isRunning) ? Infinity : 0,
                        duration: 1 
                    }}
                >
                    {formatTime(timeRemaining)}
                </motion.div>
                <p className="text-sm text-gray-500 mt-1">
                    {isCompleted ? "Section Complete!" : "Time Remaining"}
                </p>
            </div>

            <div className="space-y-2 w-full mb-6">
                <Progress 
                    value={progress} 
                    className="h-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>0:00</span>
                    <span>{Math.round(progress)}% Complete</span>
                    <span>{formatTime(totalSeconds)}</span>
                </div>
            </div>

            <div className="flex justify-center gap-3">
                <AnimatePresence mode="wait">
                    {!isRunning ? (
                        <motion.div
                            key="start"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <Button
                                onClick={handleStart}
                                disabled={isCompleted}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                            >
                                <Play className="w-4 h-4 mr-2" />
                                Start
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="pause"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <Button
                                onClick={handlePause}
                                variant="outline"
                                className="border-orange-300 text-orange-700 hover:bg-orange-50 px-6"
                            >
                                <Pause className="w-4 h-4 mr-2" />
                                Pause
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                </Button>
            </div>

            <audio ref={audioRef} preload="auto">
                <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhGRMVfsPt1oQ9CxNqwOvHhCkGIF+0fK9oOUgDYLhOvkFx1kHmCTNdqzFxWWdTNjQKOkZEF05MwCWJIlhBLrBdp2LhXHRxzUmFMKoGJnbGj3w4RN0NZmrL1kJz4Fj5CzU4pjdMUGgFLmEXN3VeozlmYNhRTkJRJmXBgJV8NIpDNjLCyNUvX5UoWjVxNgTGgvU4jGVQSGlgPJhQ" type="audio/wav" />
            </audio>
        </div>
    );
}