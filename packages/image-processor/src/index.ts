import sharp from 'sharp'

export type ImageFormat = 'webp' | 'png' | 'jpeg' | 'avif'

export interface ProcessImageOptions {
  format?: ImageFormat; width?: number; height?: number
  quality?: number; fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
}

export interface ProcessedImage {
  buffer: Buffer; format: ImageFormat; width: number; height: number; sizeKb: number
}

export async function processImage(input: Buffer | string, options: ProcessImageOptions = {}): Promise<ProcessedImage> {
  const { format = 'webp', width, height, quality = 85, fit = 'cover' } = options
  let pipeline = sharp(input)
  if (width || height) pipeline = pipeline.resize({ width, height, fit })
  const outputBuffer = await pipeline[format]({ quality }).toBuffer()
  const metadata     = await sharp(outputBuffer).metadata()
  return { buffer: outputBuffer, format, width: metadata.width ?? 0, height: metadata.height ?? 0, sizeKb: Math.round(outputBuffer.length / 1024) }
}

export async function generateThumbnail(input: Buffer | string): Promise<Buffer> {
  return sharp(input).resize({ width: 300, height: 200, fit: 'cover' }).webp({ quality: 70 }).toBuffer()
}

export async function extractMetadata(input: Buffer | string) {
  return sharp(input).metadata()
}

export async function convertFormat(input: Buffer | string, format: ImageFormat, quality = 85): Promise<Buffer> {
  return sharp(input)[format]({ quality }).toBuffer()
}
