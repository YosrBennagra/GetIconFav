import { FiCheck } from 'react-icons/fi';

interface StepIndicatorProps {
  readonly currentStep: number;
}

const STEPS = [
  { num: 1, label: 'Upload' },
  { num: 2, label: 'Configure' },
  { num: 3, label: 'Export' },
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress" className="flex items-center gap-1">
      {STEPS.map((step, idx) => {
        const isCompleted = currentStep > step.num;
        const isActive = currentStep === step.num;
        const isPending = currentStep < step.num;

        return (
          <div key={step.num} className="flex items-center">
            <div className="flex items-center gap-1.5">
              <div
                role="status"
                aria-label={`Step ${step.num}: ${step.label} — ${isCompleted ? 'completed' : isActive ? 'current' : 'upcoming'}`}
                aria-current={isActive ? 'step' : undefined}
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0
                  ${isCompleted ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : ''}
                  ${isActive ? 'step-active text-white shadow-glow-sm' : ''}
                  ${isPending ? 'bg-white/5 text-zinc-600 border border-white/10' : ''}
                `}
              >
                {isCompleted ? <FiCheck className="w-3 h-3" strokeWidth={3} /> : step.num}
              </div>
              <span
                className={`text-xs font-medium hidden sm:inline
                  ${isActive ? 'text-zinc-200' : ''}
                  ${isCompleted ? 'text-emerald-400/70' : ''}
                  ${isPending ? 'text-zinc-600' : ''}
                `}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`w-6 h-px mx-2 ${currentStep > step.num ? 'bg-emerald-500/30' : 'bg-white/10'}`} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
