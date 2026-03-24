'use client';

import { useMemo } from 'react';

type AsciiVariant = 'main' | `detail-${number}`;

const ASCII_PATTERNS: Record<string, string[]> = {
  '01-main': [
    '    SYNAPSE MESH // EDGE INFERENCE    ',
    '  +----------------------------------+ ',
    '  | O--O---O--O---O--O---O--O---O   | ',
    '  |  \\  \\ /  / \\ /  / \\ /  /  [N] | ',
    '  |   \\  X  /   X   /   X  /   [N] | ',
    '  |   / / \\ \\  / \\ / \\ / \\  [N] | ',
    '  |  O--O---O--O---O--O---O--O---O  | ',
    '  +----------------------------------+ ',
  ],
  '01-detail-1': [
    '      LOCAL TOKENS / SECURE PIPELINE  ',
    '    .--------------------------------. ',
    '    | [PROMPT] -> [SHARD] -> [LOGITS]| ',
    '    |   ######      ######    ###### | ',
    '    |   ##  ##  >>  ##  ## >> ##  ## | ',
    '    |   ######      ######    ###### | ',
    '    `--------------------------------` ',
  ],
  '02-main': [
    '       VOID // SPATIAL COMPUTING      ',
    '  .----------------------------------. ',
    '  |      .---------.   .---------.   | ',
    '  |     /  _   _  /|  /  _   _  /|   | ',
    '  |    /__/ |_|__/ | /__/ |_|__/ |   | ',
    '  |    |  EYE-TRACK | | GESTURE  |   | ',
    '  |    |___________|/ |__________|/   | ',
    '  `----------------------------------` ',
  ],
  '02-detail-1': [
    '      VOLUMETRIC UI FIELD MAP         ',
    '  +----------------------------------+ ',
    '  |  .  .  .   .  . .  .   .  .  .   | ',
    '  | .  [X]  . [X] . [X] . [X] .  .   | ',
    '  |  .  .  .   .  . .  .   .  .  .   | ',
    '  |     OCCLUSION / PHYSICS GRID     | ',
    '  +----------------------------------+ ',
  ],
  '03-main': [
    '     KINETIC // HUMANOID ACTUATION    ',
    '  +----------------------------------+ ',
    '  |        ___                        | ',
    '  |       /o o\\__                    | ',
    '  |   ____\\_^_/  \\___               | ',
    '  |  /  /|  ||  |\\   \\              | ',
    '  | /__/ |__||__| \___/  HYDRAULIC   | ',
    '  +----------------------------------+ ',
  ],
  '03-detail-1': [
    '      CONTROL LOOP / SENSOR BUS       ',
    '  .----------------------------------. ',
    '  | [IMU]--[VISION]--[TACTILE]       | ',
    '  |    \\      |        //            | ',
    '  |      -> [POLICY NET] -> [MOTOR]  | ',
    '  |             0.7ms RTT            | ',
    '  `----------------------------------` ',
  ],
  '04-main': [
    '      AETHER // DECENTRALIZED GPU     ',
    '  +----------------------------------+ ',
    '  |  [GPU] [GPU] [GPU] [GPU] [GPU]   | ',
    '  |   ||    ||    ||    ||    ||     | ',
    '  |  [NODE]-[NODE]-[NODE]-[NODE]     | ',
    '  |    \\____________________//       | ',
    '  |          MARKET ENGINE            | ',
    '  +----------------------------------+ ',
  ],
  '04-detail-1': [
    '        LIVE AUCTION ORDERBOOK        ',
    '  .----------------------------------. ',
    '  | BID  4.20  #######               | ',
    '  | BID  4.10  #####                 | ',
    '  | ASK  4.30          #####         | ',
    '  | ASK  4.45            #######     | ',
    '  `----------------------------------` ',
  ],
};

const DENSE_CHARS = ' .-+*=%@#';

function getArtKey(id: string, variant: AsciiVariant): string {
  return `${id.toLowerCase()}-${variant}`;
}

function createFallback(id: string, variant: AsciiVariant): string[] {
  const seed = `${id}-${variant}`.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const lines: string[] = [];
  for (let row = 0; row < 8; row++) {
    let line = '';
    for (let col = 0; col < 36; col++) {
      const noise = Math.sin(row * 0.35 + col * 0.19 + seed * 0.01) * 0.5 + 0.5;
      const charIndex = Math.floor(noise * (DENSE_CHARS.length - 1));
      line += DENSE_CHARS[charIndex];
    }
    lines.push(line);
  }
  return lines;
}

export default function ProjectAsciiArt({ id, variant = 'main' }: { id: string; variant?: AsciiVariant }) {
  const art = useMemo(() => {
    const artKey = getArtKey(id, variant);
    return ASCII_PATTERNS[artKey] || createFallback(id, variant);
  }, [id, variant]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-white dark:bg-[#050505] overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      <pre className="font-mono text-[8px] md:text-[10px] leading-tight text-black/70 dark:text-white/70 whitespace-pre select-none px-2">
        {art.join('\n')}
      </pre>
    </div>
  );
}
