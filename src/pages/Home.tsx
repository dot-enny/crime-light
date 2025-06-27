import { Search, MapPin, AlertTriangle } from "lucide-react"
import { useState } from "react";
import ModalDialog from "../components/ModalDialog";

export default function Home() {
    const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);
    const showAnalysis = () => {
        setIsAnalysisVisible(!isAnalysisVisible);
    }

    return (
        <div
            className="flex-1 bg-black text-white p-6 relative"
            style={{
                // background: 'url(./home-bg.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                }}
            />
            <div className="flex gap-6 h-full">
                {/* Center Content */}
                <div className="flex-1">
                    {/* Greeting */}
                    <h2 className="text-2xl font-light mb-8">Hello, John. Sunny day out.</h2>

                    {/* Time and Location Card */}
                    <div className="border-2 border-green-600 rounded-lg p-4 mb-6 inline-block">
                        <div className="text-3xl font-bold mb-2">3:34PM</div>
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin size={16} />
                            <span>Herbert Macaulay Way</span>
                        </div>
                        <div className="mt-3 text-sm">
                            <span className="text-gray-300">Risk Rating: </span>
                            <span className="text-green-400 font-medium">Low - 23%</span>
                        </div>
                    </div>

                    {/* Butler Message */}
                    <div className="mb-8">
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Butler says: "Now's a good time to go home. Spikes in small theft
                            <br />
                            and harassment are 42% more probable in the next hour in this area."
                        </p>
                        <button className="text-blue-400 text-sm underline mt-2 cursor-pointer" onClick={showAnalysis}>View Full Analysis</button>
                    </div>

                    <ModalDialog isOpen={isAnalysisVisible} setIsOpen={setIsAnalysisVisible} />


                    {/* Bird's Eye Section */}
                    <div>
                        <h3 className="text-xl font-medium mb-2">BIRD'S EYE</h3>
                        <p className="text-gray-400 text-sm mb-4">Set to: Home ▼</p>

                        {/* Map Container */}
                        <div className="bg-gray-800 rounded-lg p-4 w-96">
                            {/* Alert Banner */}
                            <div className="bg-orange-100 border border-orange-300 rounded px-3 py-2 mb-4 flex items-center gap-2">
                                <AlertTriangle size={16} className="text-orange-600" />
                                <span className="text-orange-800 text-sm">Increased loitering around Range</span>
                                <button className="ml-auto text-orange-600">×</button>
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-gray-700 rounded h-64 relative overflow-hidden">
                                {/* Simulated map with roads */}
                                <div className="absolute inset-0">
                                    {/* Road lines */}
                                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-600 transform -rotate-12"></div>
                                    <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-gray-600 transform rotate-45"></div>
                                    <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-gray-600 transform -rotate-45"></div>
                                    <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-gray-600 transform rotate-12"></div>
                                    <div className="absolute left-2/3 top-0 bottom-0 w-0.5 bg-gray-600 transform -rotate-12"></div>

                                    {/* Location markers */}
                                    <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"></div>
                                    <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-red-500 rounded-full"></div>
                                    <div className="absolute top-2/3 left-3/4 w-2 h-2 bg-red-500 rounded-full"></div>
                                    <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-orange-500 rounded-full"></div>

                                    {/* Area labels */}
                                    <div className="absolute top-6 left-6 text-xs text-gray-400">SURULERE</div>
                                    <div className="absolute bottom-6 right-6 text-xs text-gray-400">YABA</div>
                                    <div className="absolute bottom-6 left-6 text-xs text-gray-400">HERBERT MACAULAY</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-80">
                    {/* Search Bar */}
                    <div className="relative mb-8">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Enter Address"
                            className="w-full border border-white text-gray-200 rounded-full py-3 pl-12 pr-4 text-sm"
                        />
                    </div>

                    {/* Useful Tips */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Useful Tips in this Area</h3>
                        <ol className="space-y-2 text-sm text-gray-300">
                            <li>1. Avoid local enforcement.</li>
                            <li>2. Walk in a group.</li>
                            <li>3. If accosted,</li>
                        </ol>
                    </div>

                    {/* Alerts Section */}
                    <div className="mt-12">
                        <h3 className="text-lg font-medium mb-4">Alerts</h3>
                        {/* Alert indicators would go here */}
                    </div>
                </div>
            </div>
        </div>
    )
}
