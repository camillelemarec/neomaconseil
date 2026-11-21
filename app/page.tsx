import { Suspense } from "react";
import { connection } from "next/server";
import { Shell } from "@/components/shell";
import { SignerFlow } from "@/components/signer-flow";
import { getOwner } from "@/lib/owner";

export default function Home() {
  return (
    <Suspense
      fallback={
        <Shell brand="Neoma Conseil">
          <p className="text-sm text-stone-600">Chargement de la convention...</p>
        </Shell>
      }
    >
      <HomeGate />
    </Suspense>
  );
}

async function HomeGate() {
  await connection();
  return <SignerFlow owner={getOwner()} />;
}
