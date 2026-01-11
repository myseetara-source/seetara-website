'use client';

import { Check, Send, Database, Truck, Heart } from 'lucide-react';

interface ProcessingOverlayProps {
  isVisible: boolean;
  currentStep: number;
  orderType: 'buy' | 'inquiry';
}

export default function ProcessingOverlay({ isVisible, currentStep, orderType }: ProcessingOverlayProps) {
  const steps = orderType === 'buy' 
    ? [
        { icon: Check, text: 'Order Verify गर्दै...', color: 'rose' },
        { icon: Send, text: 'SMS पठाउँदै...', color: 'pink' },
        { icon: Database, text: 'Order Save गर्दै...', color: 'rose' },
        { icon: Truck, text: 'Delivery Setup...', color: 'emerald' },
      ]
    : [
        { icon: Check, text: 'Inquiry Verify गर्दै...', color: 'rose' },
        { icon: Send, text: 'Message पठाउँदै...', color: 'pink' },
        { icon: Database, text: 'Record Save गर्दै...', color: 'rose' },
        { icon: Heart, text: 'Almost Done...', color: 'emerald' },
      ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h3 className="text-xl font-black text-gray-900">
            {orderType === 'buy' ? 'Order Processing...' : 'Sending Inquiry...'}
          </h3>
          <p className="text-sm text-gray-500 mt-1">कृपया केही सेकेन्ड पर्खनुहोस्</p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isComplete = index < currentStep;

            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-rose-50 border-2 border-rose-200'
                    : isComplete
                    ? 'bg-emerald-50 border-2 border-emerald-200'
                    : 'bg-gray-50 border-2 border-transparent'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg'
                      : isComplete
                      ? 'bg-emerald-500'
                      : 'bg-gray-200'
                  }`}
                >
                  {isComplete ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? 'text-white animate-pulse' : 'text-gray-400'
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-sm font-semibold ${
                    isActive
                      ? 'text-rose-600'
                      : isComplete
                      ? 'text-emerald-600'
                      : 'text-gray-400'
                  }`}
                >
                  {step.text}
                </span>
                {isActive && (
                  <div className="ml-auto">
                    <div className="w-5 h-5 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Privacy Note */}
        <p className="text-center text-[10px] text-gray-400 mt-5">
          🔒 Discrete packaging • 100% Privacy Protected
        </p>
      </div>
    </div>
  );
}
