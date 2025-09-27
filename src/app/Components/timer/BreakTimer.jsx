"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Coffee, SkipForward } from "lucide-react";
import { motion } from "framer-motion";

export default function BreakTimer({ durationMinutes, onComplete, onSkip }) {
    const [timeRemaining, setTimeRemaining] = useState(durationMinutes * 60);
    const intervalRef = useRef(null);
    const audioRef = useRef(null);

    const totalSeconds = durationMinutes * 60;
    const progress = ((totalSeconds - timeRemaining) / totalSeconds) * 100;

    useEffect(() => {
        setTimeRemaining(durationMinutes * 60); // Reset on new break
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onComplete();
                    if (audioRef.current) {
                        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        intervalRef.current = timer;

        return () => clearInterval(intervalRef.current);
    }, [durationMinutes, onComplete]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-4">
                <Coffee className="w-8 h-8 text-green-700" />
                <h2 className="text-3xl font-bold text-green-800">
                    Break Time
                </h2>
            </div>
            
            <motion.div 
                className="text-7xl md:text-8xl font-bold font-mono text-gray-800"
                key={timeRemaining}
                initial={{ opacity: 0.5, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                {formatTime(timeRemaining)}
            </motion.div>
            
            <p className="text-gray-600 my-4">
                Stretch, relax, and get ready for the next section.
            </p>

            <div className="w-full max-w-sm mb-6">
                <Progress value={progress} className="h-2 [&>div]:bg-green-500" />
            </div>

            <Button
                onClick={onSkip}
                variant="outline"
                className="border-gray-300 hover:bg-white"
            >
                <SkipForward className="w-4 h-4 mr-2" />
                Skip Break
            </Button>

            <audio ref={audioRef} preload="auto">
                <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhGRMVfsPt1oQ9CxNqwOvHhCkGIF+0fK9oOUgDYLhOvkFx1kHmCTNdqzFxWWdTNjQKOkZEF05MwCWJIlhBLrBdp2LhXHRxzUmFMKoGJnbGj3w4RN0NZmrL1kJz4Fj5CzU4pjdMUGgFLmEXN3VeozlmYNhRTkJRJmXBgJV8NIpDNjLCyNUvX5UoWjVxNgTGgvU4jGVQSGlgPJhQ" type="audio/wav" />
            </audio>
        </div>
    );
}