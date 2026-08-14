import express from "express";
import { PrismaClient, EntityType } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import cors from "cors";
import path from "path";
import upload from "./middleware/upload";
import dotenv from "dotenv";

const app = express();

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ttrpg-campaign-manager-1.onrender.com",
    "https://dungeon-drafts.onrender.com"
  ]
}));

app.use(express.json());

app.get("/campaigns/:id/dashboard", async (req, res) => {
    const campaignId = Number(req.params.id);

    const campaign = await prisma.campaign.findUnique({
        where: {
            id: campaignId
        }
    });

    if (!campaign) {
        return res.status(404).json({
            message: "Campaign not found"
        });
    }


    // Get random NPC
    const npcCount = await prisma.entity.count({
        where: {
            campaignId,
            type: "NPC"
        }
    });


    let randomNPC = null;

    if (npcCount > 0) {
        const randomIndex = Math.floor(Math.random() * npcCount);

        const npcs = await prisma.entity.findMany({
            where: {
                campaignId,
                type: "NPC"
            },
            include: {
                npcDetails: true
            },
            skip: randomIndex,
            take: 1
        });

        randomNPC = npcs[0];
    }


    // Get active quests
    const quests = await prisma.entity.findMany({
        where: {
            campaignId,
            type: "QUEST",
            questDetails: {
                status: "In progress"
            }
        },
        include: {
            questDetails: true
        }
    });


    // Get stats
    const stats = {
        npcs: await prisma.entity.count({
            where: {
                campaignId,
                type: "NPC"
            }
        }),

        locations: await prisma.entity.count({
            where: {
                campaignId,
                type: "LOCATION"
            }
        }),

        items: await prisma.entity.count({
            where: {
                campaignId,
                type: "ITEM"
            }
        }),

        quests: await prisma.entity.count({
            where: {
                campaignId,
                type: "QUEST"
            }
        }),

        pcs: await prisma.entity.count({
            where: {
                campaignId,
                type: "PLAYER"
            }
        }),

        factions: await prisma.entity.count({
            where: {
                campaignId,
                type: "FACTION"
            }
        }),
    };

    res.json({
        campaign,
        randomNPC,
        quests,
        stats,
    });
});


// Get campaign by ID with all entities
app.get("/campaigns/:id/full", async (req, res) => {
    const id = Number(req.params.id);

    const campaign = await prisma.campaign.findUnique({
        where: { id },
        include: {
            entities: {
            },
        },
    });

    if (!campaign) {
        return res.status(404).json({
            message: "Campaign not found",
        });
    }

    res.json(campaign);
});

// Get all campaigns
app.get("/campaigns", async (req, res) => {
    const campaigns = await prisma.campaign.findMany();

    res.json(campaigns);
});

// Get individual campaign by ID
app.get("/campaigns/:id", async (req, res) => {
    const id = Number(req.params.id);

    const campaign = await prisma.campaign.findUnique({
        where: { id },
        include: {
            entities: {
            },
        },
    });

    if (!campaign) {
        return res.status(404).json({
            message: "Campaign not found",
        });
    }

    res.json(campaign);
});

// Create a campaign
app.post("/campaigns", async (req, res) => {
    const campaign = await prisma.campaign.create({
        data: {
            name: req.body.name,
            description: req.body.description
        }
    });

    res.json(campaign);
});

// Update a campaign
app.put("/campaigns/:id", async (req, res) => {
    const id = Number(req.params.id);

    const campaign = await prisma.campaign.update({
        where: { id },
        data: {
            name: req.body.name,
            description: req.body.description,
        },
    });

    res.json(campaign);
});

// Delete a campaign
app.delete("/campaigns/:id", async (req, res) => {
    const id = Number(req.params.id);

    await prisma.campaign.delete({
        where: { id },
    });

    res.sendStatus(204);
});

// ----------------------------- ENTITIES --------------------------------------

// Get all entities
app.get("/entities", async (req, res) => {
const entities = await prisma.entity.findMany({
    include: {
        npcDetails: true
    }
});
    res.json(entities);
});

// Get all entities by campaign ID
app.get("/campaigns/:id/entities", async (req, res) => {
    const campaignId = Number(req.params.id);
    const type = req.query.type as string | undefined;

    let entityType: EntityType | undefined;

    if (type && Object.values(EntityType).includes(type as EntityType)) {
    entityType = type as EntityType;
    }

    const entities = await prisma.entity.findMany({
    where: {
        campaignId,
        ...(entityType && { type: entityType }),
        },
        include: {
            npcDetails: true,
            locationDetails: true,
            itemDetails: true,
            factionDetails: true,
            questDetails: true,
            playerDetails: true,
        },
    });

    const populatedEntities = await Promise.all(
    entities.map(async (entity) => {

        let location = null;
        let faction = null;

        // NPC location/faction
        if (entity.type === "NPC" && entity.npcDetails) {

            if (entity.npcDetails.locationId) {
                location = await prisma.entity.findUnique({
                    where: {
                        id: entity.npcDetails.locationId
                    },
                    select: {
                        id: true,
                        name: true
                    }
                });
            }

            if (entity.npcDetails.factionId) {
                faction = await prisma.entity.findUnique({
                    where: {
                        id: entity.npcDetails.factionId
                    },
                    select: {
                        id: true,
                        name: true
                    }
                });
            }

            return {
                ...entity,
                npcDetails: {
                    ...entity.npcDetails,
                    location,
                    faction
                }
            };
        }


        // PLAYER location
        if (entity.type === "PLAYER" && entity.playerDetails) {

            if (entity.playerDetails.locationId) {
                location = await prisma.entity.findUnique({
                    where: {
                        id: entity.playerDetails.locationId
                    },
                    select: {
                        id: true,
                        name: true
                    }
                });
            }

            return {
                ...entity,
                playerDetails: {
                    ...entity.playerDetails,
                    location
                }
            };
        }


        return entity;
    })
);


res.json(populatedEntities);
});

// Get one entity by ID
app.get("/entities/:id", async (req, res) => {
    const id = Number(req.params.id);

    const entity = await prisma.entity.findUnique({
        where: { id },
        include: {
            npcDetails: true,
            locationDetails: true,
            itemDetails: true,
            factionDetails: true,
            questDetails: true,
            playerDetails: true,
        },
    });

    if (!entity) {
        return res.status(404).json({
            message: "Entity not found",
        });
    }

    let location = null;
let faction = null;

if (entity.npcDetails?.locationId) {
    location = await prisma.entity.findUnique({
        where: {
            id: entity.npcDetails.locationId,
        },
        select: {
            id: true,
            name: true,
        },
    });
}

if (entity.npcDetails?.factionId) {
    faction = await prisma.entity.findUnique({
        where: {
            id: entity.npcDetails.factionId,
        },
        select: {
            id: true,
            name: true,
        },
    });
}

// Player location
if (entity.playerDetails?.locationId) {
    location = await prisma.entity.findUnique({
        where: {
            id: entity.playerDetails.locationId,
        },
        select: {
            id: true,
            name: true,
        },
    });
}

    res.json({
    ...entity,

    npcDetails: entity.npcDetails
        ? {
            ...entity.npcDetails,
            location,
            faction,
        }
        : null,

    playerDetails: entity.playerDetails
        ? {
            ...entity.playerDetails,
            location,
        }
        : null,
});
});

// Create an entitiy
app.post(
    "/entities",
    upload.single("image"), async (req, res) => {

    console.log(req.file);

    const jsonFields = [
  "npcDetails",
  "locationDetails",
  "itemDetails",
  "factionDetails",
  "playerDetails",
  "questDetails",
];

jsonFields.forEach((field) => {
  if (req.body[field]) {
    req.body[field] = JSON.parse(req.body[field]);
  }
});

    const entity = await prisma.entity.create({
        data: {
            campaignId: Number(req.body.campaignId),
            type: req.body.type,
            name: req.body.name,
            description: req.body.description,
            image: req.file?.path,

            npcDetails: req.body.type === "NPC"
                ? {
                    create: {
                        species: req.body.npcDetails.species,
                        age: req.body.npcDetails.age,
                        status: req.body.npcDetails.status,
                        appearance: req.body.npcDetails.appearance,
                        locationId: req.body.npcDetails.locationId,
            factionId: req.body.npcDetails.factionId,
                    }
                }
                : undefined,

            locationDetails: req.body.type === "LOCATION"
                ? {
                    create: {
                        population: req.body.locationDetails.population,
                        ruler: req.body.locationDetails.ruler,
                        region: req.body.locationDetails.region,
                    }
                }
                : undefined,

            itemDetails: req.body.type === "ITEM"
                ? {
                    create: {
                        owner: req.body.itemDetails.owner,
                        rarity: req.body.itemDetails.rarity,
                    }
                }
                : undefined,

            factionDetails: req.body.type === "FACTION"
                ? {
                    create: {
                        leader: req.body.factionDetails.leader,
                    }
                }
                : undefined,

            playerDetails: req.body.type === "PLAYER"
                ? {
                    create: {
                        species: req.body.playerDetails.species,
                        age: req.body.playerDetails.age,
                        status: req.body.playerDetails.status,
                        appearance: req.body.playerDetails.appearance,
                        player: req.body.playerDetails.player,
                        locationId: req.body.playerDetails.locationId,
                    }
                }
                : undefined,

            questDetails: req.body.type === "QUEST"
                ? {
                    create: {
                        questGiver: req.body.questDetails.questGiver,
                        status: req.body.questDetails.status,
                    }
                }
                : undefined,
        },
    });

    res.status(201).json(entity);
});

// Update an entity
app.put(
    "/entities/:id",
    upload.single("image"),
    async (req, res) => {

    const id = Number(req.params.id);

    console.log("Updating entity:", id);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    try {
        const existingEntity = await prisma.entity.findUnique({
            where: { id },
        });

        if (!existingEntity) {
            return res.status(404).json({
                message: "Entity not found",
            });
        }


        // Convert JSON strings from FormData back into objects
        const jsonFields = [
            "npcDetails",
            "locationDetails",
            "itemDetails",
            "factionDetails",
            "playerDetails",
            "questDetails",
        ];

        jsonFields.forEach((field) => {
            if (req.body[field]) {
                req.body[field] = JSON.parse(req.body[field]);
            }
        });


        // Update main entity
        await prisma.entity.update({
            where: { id },
            data: {
                name: req.body.name,
                description: req.body.description,

                // Only replace image if a new one was uploaded
                image: req.file?.path ?? existingEntity.image,

                dmNotes: req.body.dmNotes,
                playerNotes: req.body.playerNotes,
            },
        });


        // Update related table
        switch (existingEntity.type) {

            case "NPC":
                if (req.body.npcDetails) {
                    await prisma.nPCDetails.update({
                        where: { entityId: id },
                        data: {
                            species: req.body.npcDetails.species,
                            age: req.body.npcDetails.age,
                            status: req.body.npcDetails.status,
                            appearance: req.body.npcDetails.appearance,
                            locationId: req.body.npcDetails.locationId,
                            factionId: req.body.npcDetails.factionId,
                        },
                    });
                }
                break;


            case "LOCATION":
                if (req.body.locationDetails) {
                    await prisma.locationDetails.update({
                        where: { entityId: id },
                        data: {
                            population: req.body.locationDetails.population,
                            ruler: req.body.locationDetails.ruler,
                            region: req.body.locationDetails.region,
                        },
                    });
                }
                break;


            case "ITEM":
                if (req.body.itemDetails) {
                    await prisma.itemDetails.update({
                        where: { entityId: id },
                        data: {
                            owner: req.body.itemDetails.owner,
                            rarity: req.body.itemDetails.rarity,
                        },
                    });
                }
                break;


            case "FACTION":
                if (req.body.factionDetails) {
                    await prisma.factionDetails.update({
                        where: { entityId: id },
                        data: {
                            leader: req.body.factionDetails.leader,
                        },
                    });
                }
                break;


            case "PLAYER":
                if (req.body.playerDetails) {
                    await prisma.playerDetails.update({
                        where: { entityId: id },
                        data: {
                            species: req.body.playerDetails.species,
                            age: req.body.playerDetails.age,
                            status: req.body.playerDetails.status,
                            appearance: req.body.playerDetails.appearance,
                            player: req.body.playerDetails.player,
                            locationId: req.body.playerDetails.locationId,
                        },
                    });
                }
                break;


            case "QUEST":
                if (req.body.questDetails) {
                    await prisma.questDetails.update({
                        where: { entityId: id },
                        data: {
                            questGiver: req.body.questDetails.questGiver,
                            status: req.body.questDetails.status,
                        },
                    });
                }
                break;
        }


        // Return updated entity
        const updatedEntity = await prisma.entity.findUnique({
            where: { id },
            include: {
                npcDetails: true,
                locationDetails: true,
                itemDetails: true,
                factionDetails: true,
                questDetails: true,
                playerDetails: true,
            },
        });


        res.json(updatedEntity);


    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update entity",
        });
    }
});

// Delete an entity
app.delete("/entities/:id", async (req, res) => {
    const id = Number(req.params.id);

    await prisma.entity.delete({
        where: { id },
    });

    res.sendStatus(204);
});

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "D&D Campaign Manager API is running",
        endpoints: {
            campaigns: "/campaigns",
            entities: "/entities"
        }
    });
});

// SESSIONS

app.get("/campaigns/:campaignId/sessions", async (req, res) => {
    const campaignId = Number(req.params.campaignId);

    try {
        const sessions = await prisma.session.findMany({
            where: {
                campaignId,
            },
            orderBy: {
                sessionNumber: "asc",
            },
        });

        res.json(sessions);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch sessions",
        });
    }
});

app.get("/sessions/:id", async (req, res) => {
    const id = Number(req.params.id);

    try {
        // Get the current session
        const session = await prisma.session.findUnique({
            where: {
                id,
            },
        });

        if (!session) {
            return res.status(404).json({
                message: "Session not found",
            });
        }

        // Find the immediately previous session
        const previousSession = await prisma.session.findFirst({
            where: {
                campaignId: session.campaignId,
                sessionNumber: {
                    lt: session.sessionNumber,
                },
            },
            orderBy: {
                sessionNumber: "desc",
            },
            select: {
                id: true,
                sessionNumber: true,
                title: true,
                description: true,
                date: true,
                recap: true,
                playerNotes: true,
            },
        });

        res.json({
            ...session,
            previousSession,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch session",
        });
    }
});

app.delete("/sessions/:id", async (req, res) => {

    const id = Number(req.params.id);

    try {

        await prisma.session.delete({
            where:{
                id,
            },
        });


        res.json({
            message:"Session deleted",
        });


    } catch(error){

        console.error(error);

        res.status(500).json({
            message:"Failed to delete session",
        });
    }
});

app.put("/sessions/:id", async (req, res) => {
    const id = Number(req.params.id);

    const {
        playerNotes,
        recap,
    } = req.body;

    try {
        const existingSession = await prisma.session.findUnique({
            where: {
                id,
            },
        });

        if (!existingSession) {
            return res.status(404).json({
                message: "Session not found",
            });
        }

        const updatedSession = await prisma.session.update({
            where: {
                id,
            },
            data: {
                playerNotes,
                recap,
            },
        });

        res.json(updatedSession);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update session",
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});