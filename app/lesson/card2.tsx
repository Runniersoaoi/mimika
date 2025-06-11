'use client';

import { useCallback, useEffect } from 'react';
import { useAudio, useKey } from 'react-use';
import dynamic from 'next/dynamic';

import { cn } from '@/lib/utils';
import { challenges } from '@/db/schema';

const CameraCapture = dynamic(() => import('./camera-capture'), {
  ssr: false,
});

type Props = {
  id: number;
  imageSrc: string | null;
  audioSrc: string | null;
  text: string;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: 'correct' | 'wrong' | 'none';
  type: (typeof challenges.$inferSelect)['type'];
};

export const Card2 = ({
  id,
  imageSrc,
  audioSrc,
  text,
  shortcut,
  selected,
  onClick,
  disabled,
  status,
  type,
}: Props) => {
  const [audio, _, controls] = useAudio({ src: audioSrc || '' });

  const handleClick = useCallback(() => {
    if (disabled) return;
    controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  useEffect(() => {
    if (type === 'TEXT') {
      
      const timer = setTimeout(() => {
        handleClick();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [type, handleClick]);

  return (
    <div>
      {type === 'CAMERA' ? (
        <CameraCapture expectedText={text} onCaptureDone={handleClick} />
      ) : (
        <div className="p-2">{text}</div>
      )}
    </div>
  );
};
