// This file is replaced by UploadThing's router
// See src/uploadthing.ts for the actual upload handler
export async function POST() {
  // This route is handled by UploadThing
  return new Response("UploadThing handles this route", { status: 405 });
}