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
                  w-6 h-6 rounded flex items-center justify-center text-[10px] font-mono font-bold shrink-0
                  ${isCompleted ? 'bg-bp-green/15 text-bp-green border border-bp-green/30' : ''}
                  ${isActive ? 'step-active text-white' : ''}
                  ${isPending ? 'bg-zinc-900 text-zinc-600 border border-zinc-700/50' : ''}
                `}
              >
                {isCompleted ? <FiCheck className="w-3 h-3" strokeWidth={3} /> : step.num}
              </div>
              <span
                className={`text-xs font-mono font-medium hidden sm:inline
                  ${isActive ? 'text-zinc-200' : ''}
                  ${isCompleted ? 'text-bp-green/70' : ''}
                  ${isPending ? 'text-zinc-600' : ''}
                `}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`w-6 h-px mx-2 ${currentStep > step.num ? 'bg-bp-green/30' : 'bg-zinc-800'}`} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
