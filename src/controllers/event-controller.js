import eventService from "../services/event-service.js";
import { chekValidObjectID } from "../utils/index.js";

export const getAllEvents = async (req, res, next) => {
  const events = await eventService.getAllEvents(req.user);
  res.status(200).json({ events });
};

export const createEvent = async (req, res, next) => {
  const { title, start, end, desc, client } = req.body;
  const { user } = req;
  const data = { title, start, end, desc, client, user };
  const event = await eventService.createEvent(data);
  res.status(201).json(event);
};

export const getEventById = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  await chekValidObjectID(id);
  const event = await eventService.getEventById({ id, user });
  res.status(200).json(event);
};
export const changeEventById = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  await chekValidObjectID(id);
  const event = await eventService.changeEventById({ id, body });
  res.status(200).json(event);
};

export const getEventsByDate = async (req, res, next) => {
  const { start, end } = req.body;
  const { user } = req;
  const events = await eventService.getEventsByDate({ start, end, user });
  res.status(200).json({ events });
};

export const getFreeSlots = async (req, res, next) => {
  const { date, duration } = req.query;
  const { id } = req.params;
  const freeSlots = await eventService.getFreeSlots({ date, duration, id });
  res.status(200).json({ freeSlots });
};
