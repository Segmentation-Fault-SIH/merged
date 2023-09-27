import dynamic from 'next/dynamic';

const DynamicTracking = dynamic(() => import('./Tracking'), {
  ssr: false, // This will prevent the component from being rendered on the server
  loading: () => <p>Loading...</p> // Optional loading component or message
});

export default DynamicTracking;