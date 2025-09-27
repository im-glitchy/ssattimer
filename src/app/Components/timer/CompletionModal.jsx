"use client";
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, RotateCcw } from "lucide-react";

export default function CompletionModal({ 
    isOpen, 
    onClose, 
    completedSections, 
    onResetAll 
}) {
    const allCompleted = completedSections.length === 5;

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <div className="flex items-center justify-center mb-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ 
                                        type: "spring", 
                                        stiffness: 260, 
                                        damping: 20 
                                    }}
                                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center"
                                >
                                    <Trophy className="w-8 h-8 text-white" />
                                </motion.div>
                            </div>
                            <DialogTitle className="text-center text-2xl font-bold">
                                {allCompleted ? "All Sections Complete!" : "Section Complete!"}
                            </DialogTitle>
                        </DialogHeader>
                        
                        <div className="py-4">
                            <motion.div 
                                className="text-center space-y-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {allCompleted ? (
                                    <>
                                        <p className="text-gray-600">
                                            🎉 Congratulations! You've completed all SSAT sections.
                                        </p>
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <div className="flex items-center justify-center gap-2 text-green-700">
                                                <Clock className="w-4 h-4" />
                                                <span className="font-medium">
                                                    Practice session finished
                                                </span>
                                            </div>
                                            <p className="text-sm text-green-600 mt-1">
                                                Great job managing your time across all sections!
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-gray-600">
                                            Great work! Section completed successfully.
                                        </p>
                                        <div className="text-sm text-gray-500">
                                            {5 - completedSections.length} sections remaining
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </div>

                        <DialogFooter className="gap-2">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="flex-1"
                            >
                                Continue
                            </Button>
                            {allCompleted && (
                                <Button
                                    onClick={() => {
                                        onResetAll();
                                        onClose();
                                    }}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Start New Session
                                </Button>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    );
}