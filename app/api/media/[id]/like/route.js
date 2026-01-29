import { incrementMediaLike } from "../../../../lib/prisma-db";

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const mediaId = Number(id);

    if (Number.isNaN(mediaId)) {
      return Response.json(
        { error: "Invalid media ID" },
        { status: 400 }
      );
    }

    const updatedMedia = await incrementMediaLike(mediaId);

    return Response.json({
      id: updatedMedia.id,
      likes: updatedMedia.likes,
    });
  } catch (error) {
    console.error("Error incrementing likes:", error);
    return Response.json(
      { error: "Failed to increment likes" },
      { status: 500 }
    );
  }
}
