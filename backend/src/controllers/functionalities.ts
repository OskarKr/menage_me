import { Priority, Status } from "@prisma/client";
import express from "express";
import { z } from "zod";
import { prisma } from "../prisma";

const router = express.Router();

const updateFunctionalityStatus = async (id: number) => {
  const functionality = await prisma.functionality.findFirst({
    where: { id },
    include: { tasks: true },
  });

  if (functionality?.tasks.every((task) => task.status === "TODO")) {
    await prisma.functionality.update({
      where: { id },
      data: { status: "TODO" },
    });
  }

  if (functionality?.tasks.every((task) => task.status === "DONE")) {
    await prisma.functionality.update({
      where: { id },
      data: { status: "DONE" },
    });
  }

  if (functionality?.tasks.some((task) => task.status === "IN_PROGRESS")) {
    await prisma.functionality.update({
      where: { id },
      data: { status: "IN_PROGRESS" },
    });
  }
};

router.get("/", async (req, res) => {
  const functionalities = await prisma.functionality.findMany();
  res.json(functionalities);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const functionality = await prisma.functionality.findFirst({
    where: { id },
    include: { tasks: true },
  });

  res.json(functionality);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const functionality = await prisma.functionality.delete({
    where: { id },
  });

  res.json(functionality);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = z
    .object({
      name: z.string(),
      description: z.string(),
      priority: z.nativeEnum(Priority),
    })
    .parse(req.body);

  const functionality = await prisma.functionality.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priority: data.priority,
    },
  });

  res.json(functionality);
});

router.get("/:id/tasks/:taskId", async (req, res) => {
  const id = parseInt(req.params.id);
  const taskId = parseInt(req.params.taskId);
  const task = await prisma.task.findFirst({
    where: { AND: [{ id: taskId }, { functionalityId: id }] },
    include: { functionality: true },
  });

  res.json(task);
});

router.put("/:id/tasks/:taskId", async (req, res) => {
  const id = parseInt(req.params.id);
  const taskId = parseInt(req.params.taskId);
  const data = z
    .object({
      name: z.string(),
      description: z.string(),
      priority: z.nativeEnum(Priority),
      status: z.nativeEnum(Status),
    })
    .parse(req.body);

  const startedAt = data.status === "IN_PROGRESS" ? new Date() : null;
  const finishedAt = data.status === "DONE" ? new Date() : null;

  const task = await prisma.task.update({
    where: { id: taskId },
    data: {
      name: data.name,
      description: data.description,
      priority: data.priority,
      status: data.status,
      startedAt,
      finishedAt,
    },
  });

  await updateFunctionalityStatus(id);

  res.json(task);
});

router.delete("/:id/tasks/:taskId", async (req, res) => {
  const id = parseInt(req.params.id);
  const taskId = parseInt(req.params.taskId);
  const task = await prisma.task.delete({
    where: { id: taskId },
  });

  await updateFunctionalityStatus(id);

  res.json(task);
});

router.post("/:id/create-task", async (req, res) => {
  const data = z
    .object({
      functionalityId: z.number(),
      name: z.string(),
      description: z.string(),
      priority: z.nativeEnum(Priority),
    })
    .parse(req.body);

  const task = await prisma.task.create({
    data: {
      name: data.name,
      description: data.description,
      priority: data.priority,
      functionalityId: data.functionalityId,
      status: "TODO",
    },
  });

  await updateFunctionalityStatus(data.functionalityId);

  res.json(task);
});

router.post("/", async (req, res) => {
  const data = z
    .object({
      name: z.string(),
      description: z.string(),
      priority: z.nativeEnum(Priority),
    })
    .parse(req.body);

  const functionality = await prisma.functionality.create({
    data: {
      name: data.name,
      description: data.description,
      priority: data.priority,
      status: "TODO",
    },
  });

  res.json(functionality);
});

export default router;
