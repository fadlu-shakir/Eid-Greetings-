"""
URL configuration for eid_backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static


def health_check(request):
    return JsonResponse({"status": "ok", "message": "Eid al-Adha Backend is running 🌙"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health/", health_check, name="health_check"),
    path("api/", include("greeting.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
