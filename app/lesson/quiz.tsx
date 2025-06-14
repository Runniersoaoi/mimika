'use client';

import { cn } from '@/lib/utils';

import { toast } from 'sonner';
import Image from 'next/image';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useAudio, useWindowSize, useMount } from 'react-use';

import { reduceHearts } from '@/actions/user-progress';
import { useHeartsModal } from '@/store/use-hearts-modal';
import { challengeOptions, challenges, userSubscription } from '@/db/schema';
import { usePracticeModal } from '@/store/use-practice-modal';
import { upsertChallengeProgress } from '@/actions/challenge-progress';

import { Header } from './header';
import { Footer } from './footer';
import { Challenge } from './challenge';
import { ResultCard } from './result-card';
import { QuestionBubble } from './question-bubble';

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription:
    | (typeof userSubscription.$inferSelect & {
        isActive: boolean;
      })
    | null;
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const { width, height } = useWindowSize();

  const router = useRouter();

  const [finishAudio] = useAudio({ src: '/finish.mp3', autoPlay: true });
  const [correctAudio, _c, correctControls] = useAudio({ src: '/correct.wav' });
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: '/incorrect.wav',
  });
  const [pending, startTransition] = useTransition();

  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      challenge => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<'correct' | 'wrong' | 'none'>('none');

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex(current => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== 'none' && challenge.type !== 'TEXT') return;

    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === 'wrong') {
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }

    if (status === 'correct') {
      onNext();
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find(option => option.correct);

    if (!correctOption) {
      return;
    }

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then(response => {
            if (response?.error === 'hearts') {
              openHeartsModal();
              return;
            }

            correctControls.play();
            setStatus('correct');
            setPercentage(prev => prev + 100 / challenges.length);

            // This is a practice
            if (initialPercentage === 100) {
              setHearts(prev => Math.min(prev + 1, 5));
            }
          })
          .catch(() =>
            toast.error('Algo salió mal. Por favor, inténtalo de nuevo.')
          );
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then(response => {
            if (response?.error === 'hearts') {
              openHeartsModal();
              return;
            }

            incorrectControls.play();
            setStatus('wrong');

            if (!response?.error) {
              setHearts(prev => Math.max(prev - 1, 0));
            }
          })
          .catch(() =>
            toast.error('Algo salió mal. Por favor, inténtalo de nuevo.')
          );
      });
    }
  };

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/finish.svg"
            alt="Finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <Image
            src="/finish.svg"
            alt="Finish"
            className="block lg:hidden"
            height={50}
            width={50}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            ¡Buen trabajo! <br /> Has completado la lección.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push('/learn')}
        />
      </>
    );
  }

  const title =
    challenge.type === 'ASSIST'
      ? 'Seleccione el significado correcto'
      : challenge.question;

  return (
    <>
      {incorrectAudio}
      {correctAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div
          className={cn(
            'h-full flex items-center justify-center',
            challenge.type === 'CAMERA' && 'pb-32',
            challenge.type === 'ASSIST' && 'pb-16',
            challenge.type != 'SELECT' && 'pb-4'
          )}
        >
          <div className="lg:min-h-[350px] lg:w-[700px] w-full px-4 lg:px-0 flex flex-col gap-y-6">
            <h1
              className={cn(
                'text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700',
                challenge.type === 'CAMERA' && 'lg:text-center'
              )}
            >
              {title}
            </h1>
            <div>
              {challenge.type === 'ASSIST' && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};
