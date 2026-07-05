import express from "express";
import { PrismaClient, EntityType } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import cors from "cors";
import path from "path";

const app = express();

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

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

    res.json(entities);
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

    res.json(entity);
});

// Create an entitiy
app.post("/entities", async (req, res) => {

    console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);

    const entity = await prisma.entity.create({
        data: {
            campaignId: req.body.campaignId,
            type: req.body.type,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,

            npcDetails: req.body.type === "NPC"
                ? {
                    create: {
                        species: req.body.npcDetails.species,
                        age: req.body.npcDetails.age,
                        location: req.body.npcDetails.location,
                        status: req.body.npcDetails.status,
                        appearance: req.body.npcDetails.appearance,
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
                        location: req.body.playerDetails.location,
                        status: req.body.playerDetails.status,
                        appearance: req.body.playerDetails.appearance,
                        player: req.body.playerDetails.player,
                    }
                }
                : undefined,

            questDetails: req.body.type === "QUEST"
                ? {
                    create: {
                        questGiver: req.body.questDetails.questGiver,
                    }
                }
                : undefined,
        },
    });


    res.status(201).json(entity);
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

app.listen(3000, () => {
    console.log("Server running on port 3000");
});