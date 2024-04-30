import { z } from "zod";
import { Event } from "@/types";

export const EventSchema = z.custom<Event>();
