import { useEffect, useState } from "react";

interface InfiniteScrollProps {
  thresold?: number;
  hasNextPage: boolean | undefined;
}

export const useInfScroll = ({
  thresold = 0.5,
  hasNextPage,
}: InfiniteScrollProps) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFetching(true);
        }
      },
      { threshold: thresold }
    );

    observer.observe(
      document.querySelector("#infinite-scroll-trigger") as Element
    );

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, thresold]);

  return { isFetching };
};
