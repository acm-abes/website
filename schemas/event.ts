import { z } from "zod";
import { EventType } from "@/types";

export const EventSchema = z.custom<EventType>();
