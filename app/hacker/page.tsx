"use client";

import { useEffect, useState } from "react";

const messages = [
  "Initializing breach protocol...",
  "Bypassing firewall █▒▒▒▒▒▒▒▒▒ 12%",
  "Bypassing firewall █████▒▒▒▒▒ 54%",
  "Bypassing firewall ██████████ 100%",
  "Accessing client database...",
  "Decrypting credentials...",
  "Uploading data to remote server...",
  "Just kidding 😈",
  "Relax. This is a demo page.",
];

export default function HackerPage() {
  const [lines, setLines] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < messages.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, messages[index]]);
        setIndex((prev) => prev + 1);
      }, 900);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono p-6">
      <h1 className="text-xl mb-4">root@client-server:~$</h1>

      <div className="space-y-2">
        {lines.map((line, i) => (
          <p key={i}>> {line}</p>
        ))}
      </div>

      {index >= messages.length && (
        <div className="mt-8 text-white">
          <p className="text-lg">😅 Got you.</p>
          <p>Software is life...Yeah software is life</p>
        </div>
      )}
    </main>
  );
}

