from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import LoginView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register('emp_api', views.Empviewset, basename='emp_api')
router.register('department_api', views.Departmentviewset, basename='department_api')
router.register('company_api', views.Companyviewset, basename='company_api')
router.register('useraccount_api', views.UserAccountviewset, basename='useraccount_api')

# Define urlpatterns
urlpatterns = [
    path('', views.home, name='home'),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login/', LoginView.as_view(), name='login'),
]
