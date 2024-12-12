from django.contrib import admin
from .models import *

from .models import UserAccount, Department, Company, EmployeeDetail
admin.site.register([UserAccount, Department, Company, EmployeeDetail])
