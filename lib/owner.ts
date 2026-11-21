import type { Owner } from "@/lib/types";

const identity = {
  name: "Tom Poujon-Beney",
  role: "Vice-Président",
  company: "Neoma Conseil",
  address: "59 rue Pierre Taittinger, 51100 Reims",
};

export function getOwner(): Owner {
  return {
    ...identity,
    email: process.env.OWNER_EMAIL?.trim() || "tom.poujon-beney@neomaconseil.com",
  };
}
