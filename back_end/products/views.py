import json

from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.authentication import TokenAuthentication, BasicAuthentication, SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated

import products
from .models import Product
from .serializers import ProductSerializer



class CreateProduct(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class GetUpdateDeleteProduct(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def searchProducts(request):
    request_json = json.loads(request.body)
    keyword = request_json['keyword']
    if keyword != "":
        try:
            data = Product.objects.filter(name__icontains=keyword) | Product.objects.filter(description__icontains=keyword)
        except products.models.Product.DoesNotExist:
            data = []
    else:
        data = Product.objects.all()

    if isinstance(data, Product):
        serializer = ProductSerializer(data)
    else:
        serializer = ProductSerializer(data, many=True)

    response = JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
    return response