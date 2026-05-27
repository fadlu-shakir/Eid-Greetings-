import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import GalleryImage

ADMIN_PASSWORD = "3496"  # Simple pin/password to protect edits


def check_auth(request):
    # Check custom header or query parameter
    auth_header = request.headers.get("X-Admin-Password")
    auth_param = request.GET.get("password")
    return auth_header == ADMIN_PASSWORD or auth_param == ADMIN_PASSWORD


@api_view(["GET", "POST"])
def image_list(request):
    if request.method == "GET":
        images = GalleryImage.objects.all().order_by("-uploaded_at")
        data = []
        for img in images:
            img_url = img.image.url
            if request:
                img_url = request.build_absolute_uri(img_url)
            data.append(
                {
                    "id": img.id,
                    "url": img_url,
                    "uploaded_at": img.uploaded_at,
                }
            )
        return Response(data)

    elif request.method == "POST":
        file_obj = request.FILES.get("image")
        if not file_obj:
            return Response(
                {"error": "No image file provided"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        img = GalleryImage.objects.create(image=file_obj)
        img_url = img.image.url
        if request:
            img_url = request.build_absolute_uri(img_url)

        return Response(
            {
                "id": img.id,
                "url": img_url,
                "uploaded_at": img.uploaded_at,
            },
            status=status.HTTP_201_CREATED,
        )


@api_view(["DELETE"])
def image_detail(request, pk):
    if not check_auth(request):
        return Response(
            {"error": "Unauthorized access code"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    try:
        img = GalleryImage.objects.get(pk=pk)
    except GalleryImage.DoesNotExist:
        return Response(
            {"error": "Image not found"}, status=status.HTTP_404_NOT_FOUND
        )

    # Delete physical file from media storage
    if img.image:
        try:
            if os.path.exists(img.image.path):
                os.remove(img.image.path)
        except Exception:
            pass

    img.delete()
    return Response(
        {"message": "Image deleted successfully"},
        status=status.HTTP_200_OK,
    )

