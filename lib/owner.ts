import type { Owner } from "@/lib/types";

export function getOwner(): Owner {
  return {
    name: process.env.OWNER_NAME?.trim() || "Tom Poujon-Beney",
    role: process.env.OWNER_ROLE?.trim() || "Vice-Président",
    company: process.env.OWNER_COMPANY?.trim() || "Neoma Conseil",
    email: process.env.OWNER_EMAIL?.trim() || "tom.poujon-beney@neomaconseil.com",
    address: process.env.OWNER_ADDRESS?.trim() || "59 rue Pierre Taittinger, 51100 Reims",
  };
}
