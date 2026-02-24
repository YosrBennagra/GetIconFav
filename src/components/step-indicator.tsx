interface StepIndicatorProps {
  readonly currentStep: number;
}

const STEPS = [
  { num: 1, label: 'Upload', desc: 'Drop your source image' },
  { num: 2, label: 'Configure', desc: 'Select sizes & customize' },
  { num: 3, label: 'Generate', desc: 'Download your .ico file' },
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center">
      {STEPS.map((step, idx) => {
        const isCompleted = currentStep > step.num;
        const isActive = currentStep === step.num;
        const isPending = currentStep < step.num;

        return (
          <div key={step.num} className="flex items-center">
            <div className="flex items-center gap-2.5">
              {/* Step circle */}
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                  transition-all duration-300
                  ${isCompleted ? 'bg-emerald-500/15 text-emerald-400 ring-2 ring-emerald-500/30' : ''}
                  ${isActive ? 'step-active text-white shadow-lg shadow-blue-500/20' : ''}
                  ${isPending ? 'bg-zinc-800/80 text-zinc-600 ring-1 ring-zinc-700' : ''}
                `}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                ) : (
                  step.num
                )}
              </div>

              {/* Step label */}
              <div className="hidden sm:block">
                <p className={`text-sm font-semibold leading-tight ${isActive || isCompleted ? 'text-zinc-200' : 'text-zinc-600'}`}>
                  {step.label}
                </p>
                <p className={`text-[11px] leading-tight mt-0.5 ${isActive ? 'text-zinc-400' : ''} ${isCompleted && !isActive ? 'text-zinc-500' : ''} ${isPending ? 'text-zinc-700' : ''}`}>
                  {step.desc}
                </p>
              </div>
            </div>

            {/* Connector line */}
            {idx < STEPS.length - 1 && (
              <div
                className={`
                  w-10 sm:w-14 h-px mx-3 sm:mx-5 transition-colors duration-300
                  ${currentStep > step.num ? 'bg-emerald-500/40' : 'bg-zinc-800'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
