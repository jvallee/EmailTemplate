"""djangoProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# backend/urls.py

from django.contrib import admin
from django.urls import path, include                 # add this
from drf_yasg import openapi
# from drf_yasg.views import get_schema_view
# from drf_spectacular import openapi
from drf_yasg.views import get_schema_view
from rest_framework import routers                    # add this
from candidate import views as candidateviews
from client import views as clientsviews


from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


api_info = openapi.Info(
    title="Back End API",
    description="CareIgnition Back End API for code demo",
    default_version="0.0.1",
    terms_of_service="https://www.google.com/policies/terms/",
    contact=openapi.Contact(email="jasonmvallee@gmail.com"),
    license=openapi.License(name="No License"),
)


schema_view = get_schema_view(
    api_info,
    public=True,
)

router = routers.DefaultRouter()                      # add this
router.register(r'candidates', candidateviews.CandidateView, 'candidate')
router.register(r'clients', clientsviews.ClientView)
router.register(r'jobs', clientsviews.JobView)
router.register(r'outreaches', clientsviews.OutreachView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),                # add this
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
