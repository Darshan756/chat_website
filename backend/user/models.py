from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager
from django.forms import ValidationError
# Create your models here.

def profile_picture_path(user,filename):
    return f"{user.username}/{filename}"

class CustomUser(AbstractUser):
    class ThemeTypes(models.TextChoices):
        BLACK = 'Black','Black'
        WHITE = 'White','White'
    profile_picture = models.ImageField(upload_to=profile_picture_path,null=True,blank=True)
    theme = models.CharField(max_length=20,choices=ThemeTypes.choices,default=ThemeTypes.WHITE)
    
    def __str__(self):
        return self.username
    
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
