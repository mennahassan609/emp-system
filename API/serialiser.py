from rest_framework import serializers
from .models import *

class EmployeeDetailSerializer(serializers.ModelSerializer):
    CompanyName = serializers.CharField(source='Company.CompanyName', read_only=True)
    DepartmentName = serializers.CharField(source='Department.DepartmentName', read_only=True)

    class Meta:
        model = EmployeeDetail
        fields = [
            'id', 
            'EmployeeName', 
            'EmailAddress', 
            'MobileNumber', 
            'Address', 
            'Designation', 
            'HiredOn', 
            'EmployeeStatus',
            'CompanyName',
            'DepartmentName',
            'DaysEmployed',
            'Company',
            'Department',
        ]
    
    def validate_MobileNumber(self, value):
        if len(value) < 10:
            raise serializers.ValidationError("Phone number should be at least 10 digits.")
        return value



class DepartmentSerializer(serializers.ModelSerializer):
    CompanyName = serializers.CharField(source='Company.CompanyName', read_only=True)
    
    class Meta:
        model = Department
        fields = ['id', 'DepartmentName', 'NumberofEmployees', 'CompanyName', 'Company']

    def validate(self, data):
        company = data.get('Company')
        
        if company and not Company.objects.filter(id=company.id).exists():
            raise serializers.ValidationError("The selected company does not exist.")
        
        department_name = data.get('DepartmentName')
        if Department.objects.filter(Company=company, DepartmentName=department_name).exists():
            raise serializers.ValidationError(f"A department named '{department_name}' already exists in this company.")
        
        return data

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'