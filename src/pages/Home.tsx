import { useFirstLoadAnimation } from "../hooks/useFirstLoadAnimation";
import { useHomeLogic } from "../hooks/useHomeLogic";
import ModalDialog from "../components/ModalDialog";
import LocationCard from "../components/Home/LocationCard";
import ButlerMessage from "../components/Home/ButlerMessage";
import AlertsSection from "../components/Home/AlertsSection";
import SimulatedAlertsSection from "../components/Home/SimulatedAlertsSection";
import MapView from "../components/Home/MapView";
import Sidebar from "../components/Home/Sidebar";
import {
  ANIMATION_CONFIG,
  LOCATION_DATA,
  BUTLER_MESSAGE
} from "./Home/constants";
import {
  createAnimationClass,
  createGreetingAnimationClass
} from "./Home/helpers";
import { useAlwaysAnimate, useSimulatedAlerts } from "./Home/hooks";
import {
  BackgroundPattern,
  AnimatedSection,
  Greeting,
  MainContent,
  SidebarContainer
} from "./Home/components";

export default function Home() {
    const { shouldAnimate, isVisible } = useFirstLoadAnimation();
    const alwaysAnimate = useAlwaysAnimate();
    const { simulatedAlertsList, handleDismissSimulatedAlert } = useSimulatedAlerts();

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

    return (
        <div className="flex-1 bg-black text-white p-4 md:p-6 relative">
            <BackgroundPattern />

            <div className="flex flex-col lg:flex-row gap-6 h-full">
                <MainContent>
                    <Greeting className={createGreetingAnimationClass(shouldAnimate, isVisible)} />

                    <AnimatedSection className={createAnimationClass(shouldAnimate, isVisible, ANIMATION_CONFIG.delays.location)}>
                        <LocationCard {...LOCATION_DATA} alwaysAnimate={alwaysAnimate} />
                    </AnimatedSection>
                    
                    <AnimatedSection className={createAnimationClass(shouldAnimate, isVisible, ANIMATION_CONFIG.delays.butler)}>
                        <ButlerMessage 
                            message={BUTLER_MESSAGE}
                            onShowAnalysis={showAnalysis}
                        />
                    </AnimatedSection>

                    <ModalDialog 
                        isOpen={isAnalysisVisible} 
                        setIsOpen={setIsAnalysisVisible} 
                    />

                    <AnimatedSection className={createAnimationClass(shouldAnimate, isVisible, ANIMATION_CONFIG.delays.liveAlerts)}>
                        <SimulatedAlertsSection 
                            alerts={simulatedAlertsList}
                            onDismissAlert={handleDismissSimulatedAlert}
                            alwaysAnimate={alwaysAnimate}
                        />
                    </AnimatedSection>

                    <AnimatedSection className={createAnimationClass(shouldAnimate, isVisible, ANIMATION_CONFIG.delays.recentAlerts)}>
                        <AlertsSection 
                            dismissedAlerts={dismissedAlerts}
                            onDismissAlert={dismissAlert}
                            alwaysAnimate={alwaysAnimate}
                        />
                    </AnimatedSection>

                    <AnimatedSection className={createAnimationClass(shouldAnimate, isVisible, ANIMATION_CONFIG.delays.mapView)}>
                        <MapView 
                            dismissedAlerts={dismissedAlerts}
                            onDismissAlert={dismissAlert}
                        />
                    </AnimatedSection>
                </MainContent>

                <SidebarContainer className={createAnimationClass(shouldAnimate, isVisible, ANIMATION_CONFIG.delays.sidebar, 'x')}>
                    <Sidebar
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        onEmergencyCall={handleEmergencyCall}
                        onReportIncident={handleReportIncident}
                        onShareLocation={handleShareLocation}
                        onRequestEscort={handleRequestEscort}
                    />
                </SidebarContainer>
            </div>
        </div>
    );
}
