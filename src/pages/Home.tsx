import { useEffect, useState, useCallback } from "react";
import { useFirstLoadAnimation } from "../hooks/useFirstLoadAnimation";
import ModalDialog from "../components/ModalDialog";
import LocationCard from "../components/Home/LocationCard";
import ButlerMessage from "../components/Home/ButlerMessage";
import AlertsSection from "../components/Home/AlertsSection";
import SimulatedAlertsSection from "../components/Home/SimulatedAlertsSection";
import MapView from "../components/Home/MapView";
import Sidebar from "../components/Home/Sidebar";
import { useHomeLogic } from "../hooks/useHomeLogic";

// Simulated alert data pool
const simulatedAlerts = [
  {
    id: 101,
    type: 'warning' as const,
    message: 'Suspicious activity reported at Tafawa Balewa Square',
    distance: 'Distance: 1.2km from your location'
  },
  {
    id: 102,
    type: 'info' as const,
    message: 'Road closure on Broad Street - use alternative route',
    distance: 'Estimated delay: 15-20 minutes'
  },
  {
    id: 103,
    type: 'warning' as const,
    message: 'Phone snatching incident near National Theatre',
    distance: 'Distance: 0.5km from your location'
  },
  {
    id: 104,
    type: 'info' as const,
    message: 'Power outage reported in Surulere area',
    distance: 'Affected areas: Bode Thomas, Ojuelegba'
  },
  {
    id: 105,
    type: 'warning' as const,
    message: 'Break-in attempt reported on Ikorodu Road',
    distance: 'Distance: 2.1km from your location'
  }
];

export default function Home() {
    const { shouldAnimate, isVisible } = useFirstLoadAnimation();
    const [alwaysAnimate, setAlwaysAnimate] = useState(false);
    const [simulatedAlertsList, setSimulatedAlertsList] = useState<Array<{
        id: number;
        type: 'warning' | 'info';
        timestamp: string;
        message: string;
        distance: string;
        isNew?: boolean;
    }>>([]);
    
    // Always trigger subtle animation on every visit
    useEffect(() => {
        const timer = setTimeout(() => setAlwaysAnimate(true), 200);
        return () => clearTimeout(timer);
    }, []);        // Alert simulation system
        useEffect(() => {
            let alertIndex = 0;
            
            const addNewAlert = () => {
                if (alertIndex < simulatedAlerts.length) {
                    const alert = simulatedAlerts[alertIndex];
                    const timestamp = 'Just now';
                    
                    setSimulatedAlertsList(prev => [{
                        ...alert,
                        timestamp,
                        isNew: true
                    }, ...prev]);
                    
                    // Remove the "isNew" flag after animation
                    setTimeout(() => {
                        setSimulatedAlertsList(prev => 
                            prev.map(a => a.id === alert.id ? { ...a, isNew: false } : a)
                        );
                    }, 1000);
                    
                    alertIndex++;
                }
            };
            
            // Start adding alerts after 3 seconds, then every 8-15 seconds
            const firstTimeout = setTimeout(addNewAlert, 3000);
            
            const intervalId = setInterval(() => {
                addNewAlert();
            }, Math.random() * 7000 + 8000); // Random interval between 8-15 seconds
            
            return () => {
                clearTimeout(firstTimeout);
                clearInterval(intervalId);
            };
        }, []);

    const handleDismissSimulatedAlert = useCallback((id: number) => {
        setSimulatedAlertsList(prev => prev.filter(alert => alert.id !== id));
    }, []);
    const {
        isAnalysisVisible,
        showAnalysis,
        setIsAnalysisVisible,
        dismissedAlerts,
        dismissAlert,
        searchValue,
        setSearchValue,
        handleEmergencyCall,
        handleReportIncident,
        handleShareLocation,
        handleRequestEscort
    } = useHomeLogic();

    // Mock data - in a real app, this would come from props, context, or API
    const locationData = {
        currentTime: "3:34PM",
        location: "Herbert Macaulay Way",
        riskRating: {
            level: 'Low' as const,
            percentage: 23,
            color: 'text-green-400'
        }
    };

    const butlerMessage = "Now's a good time to go home. Spikes in small theft and harassment are 42% more probable in the next hour in this area.";

    return (
        <div className="flex-1 bg-black text-white p-4 md:p-6 relative">
            {/* Dotted background pattern */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                }}
            />

            <div className="flex flex-col lg:flex-row gap-6 h-full">
                {/* Center Content */}
                <div className="flex-1 order-1 lg:order-1">
                    {/* Greeting */}
                    <h2 className={`text-xl md:text-2xl font-light mb-6 md:mb-8 ${
                        shouldAnimate 
                            ? `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
                            : 'opacity-100 translate-y-0'
                    }`}>
                        Hello, John. Sunny day out.
                    </h2>

                    <div className={shouldAnimate 
                        ? `transition-all duration-700 ease-out delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
                        : 'opacity-100 translate-y-0'
                    }>
                        <LocationCard {...locationData} alwaysAnimate={alwaysAnimate} />
                    </div>
                    
                    <div className={shouldAnimate 
                        ? `transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
                        : 'opacity-100 translate-y-0'
                    }>
                        <ButlerMessage 
                            message={butlerMessage}
                            onShowAnalysis={showAnalysis}
                        />
                    </div>

                    <ModalDialog 
                        isOpen={isAnalysisVisible} 
                        setIsOpen={setIsAnalysisVisible} 
                    />

                    {/* Live Simulated Alerts */}
                    <div className={shouldAnimate 
                        ? `transition-all duration-700 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
                        : 'opacity-100 translate-y-0'
                    }>
                        <SimulatedAlertsSection 
                            alerts={simulatedAlertsList}
                            onDismissAlert={handleDismissSimulatedAlert}
                            alwaysAnimate={alwaysAnimate}
                        />
                    </div>

                    <div className={shouldAnimate 
                        ? `transition-all duration-700 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
                        : 'opacity-100 translate-y-0'
                    }>
                        <AlertsSection 
                            dismissedAlerts={dismissedAlerts}
                            onDismissAlert={dismissAlert}
                            alwaysAnimate={alwaysAnimate}
                        />
                    </div>

                    <div className={shouldAnimate 
                        ? `transition-all duration-700 ease-out delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
                        : 'opacity-100 translate-y-0'
                    }>
                        <MapView 
                            dismissedAlerts={dismissedAlerts}
                            onDismissAlert={dismissAlert}
                        />
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className={`w-full lg:w-80 order-2 lg:order-2 ${
                    shouldAnimate 
                        ? `transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`
                        : 'opacity-100 translate-x-0'
                }`}>
                    <Sidebar
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        onEmergencyCall={handleEmergencyCall}
                        onReportIncident={handleReportIncident}
                        onShareLocation={handleShareLocation}
                        onRequestEscort={handleRequestEscort}
                    />
                </div>
            </div>
        </div>
    );
}
