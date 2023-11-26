import {MouseEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {secondsInHour, secondsInMinute} from 'date-fns';
import {useAppSelector} from 'src/store/hooks';
import {ONE_HUNDRED_PERCENT} from 'src/constants';
import {PlayerSelector} from 'src/store/player/selectors';


const POSITION_CORRECTION = 25;
function getLeftTime(duration: number, currentTime: number) {
  const hours = Math.floor(duration / secondsInHour);
  let leftSeconds = duration - currentTime;
  const leftHours = Math.floor(leftSeconds / secondsInHour);
  leftSeconds -= leftHours * secondsInHour;
  const leftMinutes = Math.floor(leftSeconds / secondsInMinute);
  leftSeconds = Math.floor(leftSeconds - leftMinutes * secondsInMinute);
  const displayedHours = hours.toString().padStart(2, '0');
  const displayedMinutes = leftMinutes.toString().padStart(2, '0');
  const displayedSeconds = leftSeconds.toString().padStart(2, '0');
  if (hours > 0) {
    return `-${displayedHours}:${displayedMinutes}:${displayedSeconds}`;
  }
  return `-${displayedMinutes}:${displayedSeconds}`;
}

export function usePlayer() {
  const videoLink = useAppSelector(PlayerSelector.videoLink);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState<null | string>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleExit = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  const handleTogglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);
  const handleToggleFullScreen = useCallback(() => {
    videoRef.current?.requestFullscreen();
  }, []);
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const {duration, currentTime} = videoRef.current;
      const newProgress = (currentTime / duration) * ONE_HUNDRED_PERCENT;
      setProgress(newProgress);
      setTimeLeft(getLeftTime(duration, currentTime));
    }
  }, []);
  const handleProgressClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && sliderRef.current) {
      const newProgress = (e.clientX - POSITION_CORRECTION) / sliderRef.current.clientWidth;
      setProgress(newProgress * ONE_HUNDRED_PERCENT);
      videoRef.current.currentTime = videoRef.current.duration * newProgress;
    }
  }, []);
  useEffect(() => {
    if (progress === ONE_HUNDRED_PERCENT) {
      setIsPlaying(false);
    }
  }, [progress]);
  return {
    videoRef,
    videoLink,
    handleTimeUpdate,
    handleExit,
    sliderRef,
    handleProgressClick,
    progress,
    handleTogglePlay,
    isPlaying,
    handleToggleFullScreen,
    timeLeft
  };
}
