'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Package, MessageSquare, FileSpreadsheet, ExternalLink, Sparkles } from 'lucide-react';

interface ProcessingStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: 'pending' | 'processing' | 'completed';
}

interface ProcessingOverlayProps {
  isVisible: boolean;
  currentStep: number;
  orderType: 'buy' | 'inquiry';
}

export default function ProcessingOverlay({ isVisible, currentStep, orderType }: ProcessingOverlayProps) {
  const [dots, setDots] = useState('');

  // Animated dots for loading text
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, [isVisible]);

  const steps: ProcessingStep[] = orderType === 'buy' ? [
    {
      id: 'verify',
      label: '📋 अर्डर Check गर्दैछौं...',
      icon: <Package className="w-5 h-5" />,
      status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'processing' : 'pending'
    },
    {
      id: 'sms',
      label: '📱 SMS पठाउँदैछौं...',
      icon: <MessageSquare className="w-5 h-5" />,
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'processing' : 'pending'
    },
    {
      id: 'save',
      label: '💾 अर्डर Save गर्दैछौं...',
      icon: <FileSpreadsheet className="w-5 h-5" />,
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'processing' : 'pending'
    },
    {
      id: 'redirect',
      label: '🎉 सकियो! Redirect गर्दैछौं...',
      icon: <ExternalLink className="w-5 h-5" />,
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'processing' : 'pending'
    }
  ] : [
    {
      id: 'verify',
      label: '📋 Inquiry Process गर्दैछौं...',
      icon: <Package className="w-5 h-5" />,
      status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'processing' : 'pending'
    },
    {
      id: 'sms',
      label: '👥 Team लाई जानकारी दिँदैछौं...',
      icon: <MessageSquare className="w-5 h-5" />,
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'processing' : 'pending'
    },
    {
      id: 'redirect',
      label: '🤝 Connect गर्दैछौं...',
      icon: <ExternalLink className="w-5 h-5" />,
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'processing' : 'pending'
    }
  ];

  if (!isVisible) return null;

  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400/30 rounded-full animate-particle-float"
            style={{
              left: `${10 + (i * 6) % 80}%`,
              top: `${10 + (i * 7) % 80}%`,
              animationDelay: `${(i * 0.2) % 2}s`,
              animationDuration: `${3 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      <div className="relative bg-white rounded-2xl p-6 mx-4 max-w-xs w-full shadow-2xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-5">
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
          <h2 className="text-lg font-black text-gray-900 text-center">
            {orderType === 'buy' ? 'अर्डर Processing' : 'Inquiry पठाउँदैछौं'}{dots}
          </h2>
          <p className="text-gray-500 text-xs mt-1 text-center">
            कृपया केही सेकेन्ड पर्खनुहोस्
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(progress, 15)}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-1.5 text-center font-medium">
            {Math.round(progress)}% पूरा भयो!
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-300 ${
                step.status === 'processing' 
                  ? 'bg-green-50 border border-green-200' 
                  : step.status === 'completed'
                  ? 'bg-gray-50 border border-gray-100'
                  : 'bg-gray-50 border border-transparent opacity-40'
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                step.status === 'processing'
                  ? 'bg-green-500 text-white'
                  : step.status === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {step.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : step.status === 'processing' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  step.icon
                )}
              </div>
              <p className={`font-medium text-sm flex-1 ${
                step.status === 'processing' 
                  ? 'text-green-700' 
                  : step.status === 'completed'
                  ? 'text-gray-600'
                  : 'text-gray-400'
              }`}>
                {step.label}
              </p>
              {step.status === 'completed' && (
                <span className="text-green-500 text-[10px] font-bold">✓</span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400">
            🔒 तपाईंको जानकारी सुरक्षित छ
          </p>
        </div>
      </div>
    </div>
  );
}
