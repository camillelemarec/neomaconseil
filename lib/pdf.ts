import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { ContractContent } from "@/lib/types";

const PAGE: [number, number] = [595.28, 841.89];
const MARGIN = 56;
const INK = rgb(0.11, 0.1, 0.09);
const MUTED = rgb(0.4, 0.38, 0.35);
const LINE = rgb(0.75, 0.72, 0.68);

function toWinAnsi(text: string): string {
  const replacements: Record<string, string> = {
    "œ": "oe",
    "Œ": "OE",
    "’": "'",
    "‘": "'",
    "“": '"',
    "”": '"',
    "–": "-",
    "—": "-",
    "…": "...",
    "€": "EUR",
    "\u00A0": " ",
  };

  return text
    .replace(/[œŒ’‘“”–—…€\u00A0]/g, (char) => replacements[char] ?? char)
    .replace(/[^\u0000-\u00FF]/g, "?");
}

function splitLongWord(word: string, font: PDFFont, size: number, maxWidth: number): string[] {
  if (font.widthOfTextAtSize(word, size) <= maxWidth) return [word];

  const parts: string[] = [];
  let chunk = "";
  for (const char of word) {
    const next = chunk + char;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) {
      chunk = next;
    } else {
      if (chunk) parts.push(chunk);
      chunk = char;
    }
  }
  if (chunk) parts.push(chunk);
  return parts;
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  let current = "";

  const words = text.split(/\s+/).filter(Boolean);
  for (const word of words) {
    for (const part of splitLongWord(word, font, size, maxWidth)) {
      const candidate = current ? `${current} ${part}` : part;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        current = candidate;
      } else {
        if (current) lines.push(current);
        current = part;
      }
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function buildContractPdf(input: {
  content: ContractContent;
  signaturePng: Uint8Array;
  signedAt: Date;
  signedAtLabel: string;
}): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const signature = await pdf.embedPng(input.signaturePng);

  let page = pdf.addPage(PAGE);
  let y = PAGE[1] - MARGIN;
  const width = PAGE[0] - MARGIN * 2;

  const nextPage = () => {
    page = pdf.addPage(PAGE);
    y = PAGE[1] - MARGIN;
  };

  const ensure = (needed: number) => {
    if (y - needed < MARGIN) nextPage();
  };

  const drawParagraph = (
    text: string,
    font: PDFFont,
    size: number,
    color = INK,
    after = 8,
  ) => {
    const blocks = toWinAnsi(text).split("\n");
    for (const block of blocks) {
      const lines = wrap(block, font, size, width);
      const rendered = lines.length > 0 ? lines : [""];
      const gap = size + 4;
      for (const line of rendered) {
        ensure(gap);
        if (line) {
          page.drawText(line, {
            x: MARGIN,
            y: y - size,
            size,
            font,
            color,
          });
        }
        y -= gap;
      }
    }
    y -= after;
  };

  const title = toWinAnsi(input.content.title);
  const titleSize = 18;
  const titleWidth = bold.widthOfTextAtSize(title, titleSize);
  ensure(40);
  page.drawText(title, {
    x: MARGIN + Math.max(0, (width - titleWidth) / 2),
    y: y - titleSize,
    size: titleSize,
    font: bold,
    color: INK,
  });
  y -= titleSize + 14;
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: MARGIN + width, y },
    thickness: 0.6,
    color: LINE,
  });
  y -= 20;

  for (const paragraph of input.content.intro) {
    drawParagraph(paragraph, regular, 11);
  }

  for (const article of input.content.articles) {
    drawParagraph(article.title, bold, 12, INK, 2);
    drawParagraph(article.body, regular, 11, INK, 10);
  }

  drawParagraph(input.content.closing, regular, 11, INK, 16);

  const boxWidth = 240;
  const boxHeight = 90;
  ensure(boxHeight + 78);
  drawParagraph("Signature du client", bold, 12, INK, 6);

  page.drawRectangle({
    x: MARGIN,
    y: y - boxHeight,
    width: boxWidth,
    height: boxHeight,
    borderColor: LINE,
    borderWidth: 0.8,
  });

  const scale = Math.min(
    (boxWidth - 16) / signature.width,
    (boxHeight - 16) / signature.height,
  );
  const drawWidth = signature.width * scale;
  const drawHeight = signature.height * scale;
  page.drawImage(signature, {
    x: MARGIN + 8,
    y: y - boxHeight + (boxHeight - drawHeight) / 2,
    width: drawWidth,
    height: drawHeight,
  });
  y -= boxHeight + 16;

  drawParagraph(`Signé le ${input.signedAtLabel}.`, regular, 11, INK, 14);
  drawParagraph(input.content.legalNotice, regular, 8, MUTED, 0);

  const pages = pdf.getPages();
  pages.forEach((current: PDFPage, index) => {
    const label = `${index + 1} / ${pages.length}`;
    const labelWidth = regular.widthOfTextAtSize(label, 9);
    current.drawText(label, {
      x: PAGE[0] - MARGIN - labelWidth,
      y: 32,
      size: 9,
      font: regular,
      color: MUTED,
    });
  });

  pdf.setTitle(title);
  pdf.setAuthor(toWinAnsi("Signature de contrat"));
  pdf.setCreator("Signature de contrat");
  pdf.setCreationDate(input.signedAt);
  pdf.setModificationDate(input.signedAt);

  return pdf.save();
}
