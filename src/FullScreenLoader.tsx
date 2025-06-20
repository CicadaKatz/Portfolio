import { Hourglass } from 'ldrs/react';
import { useEffect } from 'react';
import './styles/hourglass-loader.css';

interface FullScreenLoaderProps {
  onLoaded: () => void;
}

function FullScreenLoader({ onLoaded }: FullScreenLoaderProps) {
  useEffect(() => {
    // Simulate loading time and then call the onLoaded callback
    const timer = setTimeout(() => {
      onLoaded();
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <div className="full-screen-loader" role="status" aria-label="Loading portfolio">
      <Hourglass
        size="40"
        bg-opacity="0.1"
        speed="1.75"
        color="white"
      />
      <p className="loading-text">Loading Portfolio...</p>
    </div>
  );
}

export default FullScreenLoader;
