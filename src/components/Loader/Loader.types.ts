export type LoaderProps = {
  onComplete: (ready: boolean) => void;
};

export type GroupUrls = (urls: string[]) => string[][];
export type ToThreeChars = (number: number) => string;
