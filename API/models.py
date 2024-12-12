from django.db import models
from django.utils.timezone import now
from django.core.validators import RegexValidator
from django.db.models import F, Sum


class UserAccount(models.Model):
    UserName = models.CharField(max_length=70)
    EmailAddress = models.EmailField(unique=True)
    Role = models.CharField(max_length=70)

    def __str__(self):
        return self.UserName


class Company(models.Model):
    CompanyName = models.CharField(max_length=70)
    NumberofDepartments = models.IntegerField(default=0, editable=True)
    NumberofEmployees = models.IntegerField(default=0, editable=True)

    def update_counts(self):
        self.NumberofDepartments = self.departments.count()
        self.NumberofEmployees = self.employees.count()
        self.save()

    def __str__(self):
        return self.CompanyName



class Department(models.Model):
    Company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="departments")
    DepartmentName = models.CharField(max_length=70)
    NumberofEmployees = models.IntegerField(default=0, editable=True)

    def update_counts(self):
        self.NumberofEmployees = EmployeeDetail.objects.filter(Department=self).count()
        self.save()

    def __str__(self):
        return self.DepartmentName



class EmployeeDetail(models.Model):
    Company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="employees")
    Department = models.ForeignKey(
        Department, 
        on_delete=models.CASCADE, 
        related_name="employees",
        limit_choices_to=models.Q(Company=F('Company'))
    )
    EmployeeStatus = models.CharField(max_length=70)
    EmployeeName = models.CharField(max_length=70)
    EmailAddress = models.EmailField(unique=True)
    MobileNumber = models.CharField(
        max_length=15,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^\+?\d{10,15}$',
                message="Enter a valid phone number.")])
    Address = models.CharField(max_length=300)
    Designation = models.CharField(max_length=70)
    HiredOn = models.DateTimeField(null=True, blank=True)
    DaysEmployed = models.IntegerField(default=0, editable=True)

    def save(self, *args, **kwargs):
        if self.HiredOn:
            self.DaysEmployed = (now() - self.HiredOn).days
        super().save(*args, **kwargs)
        self.Company.update_counts()
        self.Department.update_counts()

    def __str__(self):
        return self.EmployeeName
