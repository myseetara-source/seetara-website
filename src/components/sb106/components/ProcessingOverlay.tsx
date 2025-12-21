'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Package, MessageSquare, FileSpreadsheet, ExternalLink } from 'lucide-react';

interface ProcessingStep {
  id: string;
  label: string;
  labelNp: string;
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
      label: 'Verifying your order',
      labelNp: 'तपाईंको अर्डर verify गर्दै',
      icon: <Package className="w-5 h-5" />,
      status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'processing' : 'pending'
    },
    {
      id: 'sms',
      label: 'Sending confirmation SMS',
      labelNp: 'SMS पठाउँदै',
      icon: <MessageSquare className="w-5 h-5" />,
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'processing' : 'pending'
    },
    {
      id: 'save',
      label: 'Saving your order',
      labelNp: 'Order save गर्दै',
      icon: <FileSpreadsheet className="w-5 h-5" />,
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'processing' : 'pending'
    },
    {
      id: 'redirect',
      label: 'Redirecting to WhatsApp',
      labelNp: 'WhatsApp मा लैजाँदै',
      icon: <ExternalLink className="w-5 h-5" />,
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'processing' : 'pending'
    }
  ] : [
    {
      id: 'verify',
      label: 'Processing your inquiry',
      labelNp: 'तपाईंको प्रश्न process गर्दै',
      icon: <Package className="w-5 h-5" />,
      status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'processing' : 'pending'
    },
    {
      id: 'sms',
      label: 'Notifying our team',
      labelNp: 'हाम्रो team लाई जानकारी दिँदै',
      icon: <MessageSquare className="w-5 h-5" />,
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'processing' : 'pending'
    },
    {
      id: 'redirect',
      label: 'Connecting you to support',
      labelNp: 'Support सँग connect गर्दै',
      icon: <ExternalLink className="w-5 h-5" />,
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'processing' : 'pending'
    }
  ];

  if (!isVisible) return null;

  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-overlay-fade-in">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-particle-float"
            style={{
              left: `${10 + (i * 6) % 80}%`,
              top: `${10 + (i * 7) % 80}%`,
              animationDelay: `${(i * 0.2) % 2}s`,
              animationDuration: `${3 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      <div className="relative bg-white rounded-3xl p-8 mx-4 max-w-md w-full shadow-2xl animate-overlay-scale-up">
        {/* Header with spinning loader */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center animate-pulse">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-400 animate-ring-spin" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 text-center">
            {orderType === 'buy' ? 'Order Processing' : 'Sending Inquiry'}{dots}
          </h2>
          <p className="text-gray-500 text-sm mt-1 text-center">
            कृपया केही सेकेन्ड पर्खनुहोस्
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(progress, 10)}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            {Math.round(progress)}% complete
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                step.status === 'processing' 
                  ? 'bg-yellow-50 border-2 border-yellow-200 scale-[1.02]' 
                  : step.status === 'completed'
                  ? 'bg-green-50 border-2 border-green-200'
                  : 'bg-gray-50 border-2 border-transparent opacity-50'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                step.status === 'processing'
                  ? 'bg-yellow-400 text-white'
                  : step.status === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {step.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 animate-check-bounce" />
                ) : step.status === 'processing' ? (
                  <div className="animate-pulse">{step.icon}</div>
                ) : (
                  step.icon
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm truncate ${
                  step.status === 'processing' 
                    ? 'text-yellow-800' 
                    : step.status === 'completed'
                    ? 'text-green-800'
                    : 'text-gray-400'
                }`}>
                  {step.label}
                </p>
                <p className={`text-xs truncate ${
                  step.status === 'processing' 
                    ? 'text-yellow-600' 
                    : step.status === 'completed'
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}>
                  {step.labelNp}
                </p>
              </div>
              {step.status === 'processing' && (
                <Loader2 className="w-4 h-4 text-yellow-600 animate-spin flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Footer message */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            🔒 तपाईंको जानकारी सुरक्षित छ
          </p>
        </div>
      </div>

    </div>
  );
}

