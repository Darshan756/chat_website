from django.urls import path 
from . import views

urlpatterns = [
    path('signup',views.SignUp.as_view(),name='signup'),
    path('signin',views.SignIn.as_view(),name='signin'),
    path('refresh',views.GetRefreshToken.as_view(),name='refresh'),
    path('profile',views.ProfileData.as_view(),name='refresh'),
    path('change-password',views.ChangePassword.as_view(),name='change_password'),
    path('logout',views.Logout.as_view(),name='logout'),
    path('edit-profile',views.EditProfile.as_view(),name='edit_profile'),
    path('edit-profile-image',views.EditProfileImage.as_view(),name='edit_profile_image')
]