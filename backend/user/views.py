from functools import partial
from django.forms import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser
from .serializers import UserRegisterSerializer,UserLoginSerializer,ChangePasswordSerializer,EditProfileSerializer,EditProfileImageSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,IsAuthenticated
from urllib.parse import quote
from rest_framework_simplejwt.exceptions import TokenError


# Create your views here.

class SignUp(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        print(request.data)
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message':'Registration successfull!'},status=status.HTTP_201_CREATED)
    
class SignIn(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
      serializer = UserLoginSerializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      user = serializer.validated_data['user']
      
      refresh = RefreshToken.for_user(user)
      return Response(
          {
           'message':'Signin Successfull!',
           'access':str(refresh.access_token),
            'refresh':str(refresh)   
          },
         status= status.HTTP_200_OK
      )

class GetRefreshToken(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        refresh = request.data.get('refresh')
        refresh = RefreshToken(refresh)
        return Response(
            {'access':str(refresh.access_token),
             'refresh':str(refresh)},
             status=status.HTTP_200_OK

        )
class Logout(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        refreshToekn = request.data.get('refresh')
        if refreshToekn is not None:
          try:
              refresh =  RefreshToken(refreshToekn)
              refresh.blacklist()
          except TokenError:
               return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'Logged Out'},status=status.HTTP_200_OK)
class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self,request):
        print(request.data)
        serializer = ChangePasswordSerializer(instance=request.user,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        refresh_token = RefreshToken(request.data.get('refresh'))
        if refresh_token:
           try:
               refresh_token.blacklist()
           except:
               pass

        return Response({'message':'Password updated successfully!'},status=status.HTTP_200_OK)
        


class ProfileData(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        try:
            user = CustomUser.objects.get(id=request.user.id)
            path = user.profile_picture.url
            user_data = {
                'username':user.username,
                'first_name':user.first_name,
                'last_name':user.last_name,
                'profile_image':request.build_absolute_uri(path) if path else None
            }
            return Response({
                'user':user_data,
                },status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'error':"User does not exist"},status=status.HTTP_404_NOT_FOUND)
            
class EditProfile(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self,request):
        serializer = EditProfileSerializer(instance=request.user,data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message':'Profile updated successfully!'},status=status.HTTP_200_OK)


class EditProfileImage(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self,request):
        print(request.FILES)
        serializer = EditProfileImageSerializer(instance=request.user,data=request.FILES,partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)

          
    