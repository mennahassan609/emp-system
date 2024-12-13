from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Company, Department, EmployeeDetail, UserAccount
from .serialiser import CompanySerializer, DepartmentSerializer, EmployeeDetailSerializer, UserAccountSerializer
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import AbstractUser
from django.db import models
def home(request):

    return HttpResponse('Welcome to our home page')


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        user = User.objects.filter(email=email).first()
        if user and user.check_password(password):
            return Response({"token": "some_token_value"}, status=status.HTTP_200_OK)
        
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class Companyviewset(viewsets.ModelViewSet):
    permission_classes = []
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def list(self, request):
        display = self.queryset
        serializer = self.serializer_class(display, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        company = self.queryset.get(pk=pk)
        serializer = self.serializer_class(company)
        return Response(serializer.data)




class Departmentviewset(viewsets.ModelViewSet):
    permission_classes = []
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    def list(self, request):
        display = self.queryset
        serializer = self.serializer_class(display, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        department = self.queryset.get(pk=pk)
        serializer = self.serializer_class(department)
        return Response(serializer.data)


class Empviewset(viewsets.ModelViewSet):
    permission_classes = []
    queryset = EmployeeDetail.objects.all()
    serializer_class = EmployeeDetailSerializer

    def list(self, request):
        display = self.queryset
        serializer = self.serializer_class(display, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        employee = self.queryset.get(pk=pk)
        serializer = self.serializer_class(employee)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        
        try:
            employee = self.queryset.get(pk=pk)
            serializer = self.serializer_class(employee, data=request.data, partial=partial)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except EmployeeDetail.DoesNotExist:
            return Response({"error": f"Employee with id {pk} does not exist"}, status=status.HTTP_404_NOT_FOUND)



    def destroy(self, request, pk=None):
        employee = self.queryset.get(pk=pk)
        employee.delete()
        return Response(status=204)
class UserAccountviewset(viewsets.ViewSet):
    permission_classes = []
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer

    def list(self, request):
        users = self.queryset
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            user = self.queryset.get(pk=pk)
            serializer = self.serializer_class(user)
            return Response(serializer.data)
        except UserAccount.DoesNotExist:
            return Response({"error": "UserAccount not found"}, status=404)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def partial_update(self, request, pk=None, *args, **kwargs):
        try:
            user = self.queryset.get(pk=pk)
            serializer = self.serializer_class(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except UserAccount.DoesNotExist:
            return Response({"error": f"UserAccount with id {pk} does not exist"}, status=404)


    def destroy(self, request, pk=None):
        try:
            user = self.queryset.get(pk=pk)
            user.delete()
            return Response({"message": "UserAccount deleted successfully"}, status=204)
        except UserAccount.DoesNotExist:
            return Response({"error": "UserAccount not found"}, status=404)
