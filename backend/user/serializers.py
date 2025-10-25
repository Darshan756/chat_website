from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from django.contrib.auth import authenticate
from . models import CustomUser 

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import CustomUser
from django.contrib.auth import get_user_model

class UserRegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    username = serializers.CharField(
        validators=[
            UniqueValidator(queryset=CustomUser.objects.all()),
            *CustomUser._meta.get_field('username').validators
        ]
    )

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name','profile_picture','password', 'confirm_password']
        read_only_fields = ['id']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attrs.get('confirm_password')

        if not password or not confirm_password:
            raise serializers.ValidationError({"error":"Please enter both passwords"})

        if password != confirm_password:
            raise serializers.ValidationError({"error":"Passwords must match"})

        attrs.pop('confirm_password')
        return attrs

    def validate_username(self, value):
        if len(value) < 8:
            raise serializers.ValidationError({"error":'Username must be at least 8 characters'})
        return value

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)


            

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self,attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if not username or not  password:
            raise serializers.ValidationError({"error":'username and password must be provided'})
        
        user = authenticate(username=username,password=password)
        if not user:
            raise serializers.ValidationError('User  does not exist')
        attrs['user'] = user
        return attrs

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()
    confirm_new_password = serializers.CharField()

    def validate(self, attrs):
        old_password = attrs.get('old_password')
        new_password = attrs.get('new_password')
        confirm_new_password = attrs.get('confirm_new_password')
        if not old_password or  not new_password or not confirm_new_password:
            raise serializers.ValidationError({"error":'Please provide all passwords'})
        if new_password != confirm_new_password:
            raise serializers.ValidationError({"error":'New password and confirm new password  do not  match'})
        attrs.pop('confirm_new_password')
        return attrs
    
    def update(self, instance, validated_data):
        old_password = validated_data.get('old_password')
        new_password = validated_data.get('new_password')
        
        if not instance.check_password(old_password):
            raise serializers.ValidationError({'error':"Old password is incorrect"})
        
        instance.set_password(new_password)
        instance.save()    
        return instance



User = get_user_model()

class EditProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']

    def validate_username(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Username should not be less than 8 characters")
        return value

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class EditProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['profile_picture']

    def validate_profile_picture(self, value):
        print(value)
        # Max size 2MB
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError("Image too large (max 2MB).")
        
        # Validate file type
        content_type = getattr(value, "content_type", "")
        if not content_type.startswith("image/"):
            raise serializers.ValidationError("Invalid file type, must be an image.")
        
        return value

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

        
