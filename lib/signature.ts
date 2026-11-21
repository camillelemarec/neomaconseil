const MAX_DATA_URL_LENGTH = 1_500_000;

export function decodeSignaturePng(dataUrl: string): Uint8Array {
  if (typeof dataUrl !== "string" || dataUrl.length > MAX_DATA_URL_LENGTH) {
    throw new Error("size");
  }

  const match = /^data:image\/png;base64,([A-Za-z0-9+/=\s]+)$/.exec(dataUrl.trim());
  if (!match) throw new Error("format");

  const bytes = Buffer.from(match[1].replace(/\s/g, ""), "base64");
  const isPng =
    bytes.length > 32 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47;

  if (!isPng) throw new Error("format");
  return new Uint8Array(bytes);
}
