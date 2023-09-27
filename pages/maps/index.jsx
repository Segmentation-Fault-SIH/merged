import Tracking from '../../js/components/mapPage.jsx';
 import  {LocationProvider}  from '../../js/context'
export default function App() {
  return (
    <div className="w-full">
      
<LocationProvider>
      <Tracking />
      </LocationProvider>
    </div>
  );
}
