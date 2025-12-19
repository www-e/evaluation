import { NextRequest } from 'next/server';
import { saveImageBuffer } from '@/lib/fileUpload';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert blob to ArrayBuffer and then to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await saveImageBuffer(buffer, file.name || 'upload', file.type);

    if (result.success && result.url) {
      return Response.json({ url: result.url });
    } else {
      return Response.json({ error: result.error || 'Upload failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Upload API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}