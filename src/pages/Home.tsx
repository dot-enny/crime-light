import { useFirstLoadAnimation } from "../hooks/useFirstLoadAnimation";
import ModalDialog from "../components/ModalDialog";
import LocationCard from "../components/Home/LocationCard";
import ButlerMessage from "../components/Home/ButlerMessage";
import AlertsSection from "../components/Home/AlertsSection";
import MapView from "../components/Home/MapView";
import Sidebar from "../components/Home/Sidebar";
import { useHomeLogic } from "../hooks/useHomeLogic";

export default function Home() {
    const { shouldAnimate, isVisible } = useFirstLoadAnimation();
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
                        <LocationCard {...locationData} />
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

                    <div className={shouldAnimate 
                        ? `transition-all duration-700 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
                        : 'opacity-100 translate-y-0'
                    }>
                        <AlertsSection 
                            dismissedAlerts={dismissedAlerts}
                            onDismissAlert={dismissAlert}
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
