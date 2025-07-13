import type { LatLngTuple } from "leaflet";

export const dangerousLocations: {
    name: string;
    coordinates: LatLngTuple;
    description: string;
    safetyRating: number;
    crimeTypes: string[];
}[] = [
        {
            name: "Ikeja",
            coordinates: [6.60, 3.35],
            description: "High crime rates, including pickpocketing, armed robbery, and general crime. Often cited as a top 3 hotspot.",
            safetyRating: 1,
            crimeTypes: ["pickpocketing", "armed_robbery", "theft"]
        },
        {
            name: "Lagos Island (CBD)",
            coordinates: [6.45, 3.40],
            description: "Prone to pickpocketing and bag snatching in crowded areas. Also cited as a top 3 hotspot.",
            safetyRating: 1,
            crimeTypes: ["pickpocketing", "bag_snatching", "theft"]
        },
        {
            name: "Lekki Phase 1",
            coordinates: [6.493, 3.719],
            description: "Reports of armed robbery and kidnapping. Cited as a top 3 hotspot.",
            safetyRating: 1,
            crimeTypes: ["armed_robbery", "kidnapping"]
        },
        {
            name: "Oshodi Under Bridge",
            coordinates: [6.514193, 3.308678],
            description: "Major hotspot for armed robbery, extortion, and pickpocketing, with criminals often operating in groups.",
            safetyRating: 2,
            crimeTypes: ["armed_robbery", "extortion", "pickpocketing"]
        },
        {
            name: "Ojodu-Berger",
            coordinates: [6.666, 3.375],
            description: "Known for bag snatching, phone theft, and robberies at gunpoint, with criminals posing as commuters.",
            safetyRating: 2,
            crimeTypes: ["bag_snatching", "phone_theft", "armed_robbery"]
        },
        {
            name: "Shomolu-Bariga",
            coordinates: [6.54324, 3.38414],
            description: "High concentration of street urchins, with reports of daylight robbery and theft of personal belongings.",
            safetyRating: 3,
            crimeTypes: ["robbery", "theft"]
        },
        {
            name: "Mile 2",
            coordinates: [6.45, 3.26],
            description: "Popular for traffic robberies, where armed criminals break car windows to access valuables.",
            safetyRating: 2,
            crimeTypes: ["traffic_robbery", "vehicle_break_in"]
        },
        {
            name: "Ojuelegba",
            coordinates: [6.5092, 3.3668],
            description: "Associated with high crime rates and a boisterous nightlife, requiring caution after dark.",
            safetyRating: 3,
            crimeTypes: ["assault", "theft", "harassment"]
        },
        {
            name: "Agege",
            coordinates: [6.61563, 3.33337],
            description: "Notorious for criminal activities including rape, murder, and armed robbery.",
            safetyRating: 2,
            crimeTypes: ["rape", "murder", "armed_robbery"]
        },
        {
            name: "Ijora",
            coordinates: [6.469, 3.367],
            description: "Populated with thugs who harass and steal from people, and known for slum areas.",
            safetyRating: 3,
            crimeTypes: ["harassment", "theft", "assault"]
        },
        {
            name: "Igando Road",
            coordinates: [6.609, 3.296],
            description: "Has seen a rise in armed robbery, leading to fear among residents.",
            safetyRating: 3,
            crimeTypes: ["armed_robbery"]
        },
        {
            name: "Mushin",
            coordinates: [6.535233, 3.3489671],
            description: "A notorious area known for cultism, sudden violent breakouts, and armed robbery.",
            safetyRating: 2,
            crimeTypes: ["cultism", "violence", "armed_robbery"]
        },
        {
            name: "Ajegunle",
            coordinates: [6.578, 3.447],
            description: "A highly populated district with open sewers and dilapidated buildings, requiring caution if you don't reside there.",
            safetyRating: 3,
            crimeTypes: ["theft", "assault"]
        },
        {
            name: "Ikorodu",
            coordinates: [6.60, 3.50],
            description: "Described as a ghetto area, though also known for its cultural heritage. Reports indicate high crime rates.",
            safetyRating: 2,
            crimeTypes: ["theft", "robbery", "assault"]
        },
        {
            name: "Ketu",
            coordinates: [6.633, 3.883],
            description: "Also described as a ghetto area, with traditional markets and music venues. General safety concerns.",
            safetyRating: 3,
            crimeTypes: ["theft", "pickpocketing"]
        },
        {
            name: "Apapa",
            coordinates: [6.45, 3.36],
            description: "Has been listed among areas with high crime rates, particularly related to port activities and traffic.",
            safetyRating: 2,
            crimeTypes: ["theft", "robbery", "traffic_crime"]
        }
    ];