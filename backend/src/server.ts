import express from "express";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const app = express();

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

app.use(express.json());

// Get campaign by ID with all entities
app.get("/campaigns/:id/full", async (req, res) => {
    const id = Number(req.params.id);

    const campaign = await prisma.campaign.findUnique({
        where: { id },
        include: {
            entities: {
                include: {
                    npcDetails: true,
                },
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
                include: {
                    npcDetails: true,
                },
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

    const entities = await prisma.entity.findMany({
        where: {
            campaignId,
        },
        include: {
            npcDetails: true,
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

    const entity = await prisma.entity.create({
        data: {
            campaignId: req.body.campaignId,
            type: req.body.type,
            name: req.body.name,
            description: req.body.description,

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
                : undefined
        },

        include: {
            npcDetails: true
        }
    });


    res.status(201).json(entity);
});

// Update an entity
app.put("/entities/:id", async (req, res) => {
    const id = Number(req.params.id);

    const entity = await prisma.entity.update({
        where: { id },
        data: {
            type: req.body.type,
            name: req.body.name,
            description: req.body.description,
        },
    });

    res.json(entity);
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