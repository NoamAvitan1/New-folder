import { useEffect, useRef, useState } from "react";

type Props = {
  child: React.ReactNode;
};

export const LazyLoading = ({ child }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
            console.log("isIntersecting");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);
  return <div ref={componentRef}>{isLoaded && child}</div>;
};
