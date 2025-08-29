import { Router } from "express";
import { authRequired, rbac } from "../auth/middleware";
import { ListTicketsQuerySchema } from "../schemas/tickets";
import { listTickets } from "../dao/ticketsRead";
import type { JWTPayload } from "../auth/jwt";

const router = Router();

// Ahora permitimos USER, TECH y ADMIN (el filtro por rol lo hace el DAO)
router.get("/", authRequired, rbac("USER", "TECH", "ADMIN"), async (req, res) => {
  const parsed = ListTicketsQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: "Parámetros inválidos", details: parsed.error.flatten() });
  }

  const viewer = (req as any).user as JWTPayload;
  const data = await listTickets(parsed.data, viewer);
  res.json({ ok: true, ...data });
});

export default router;
