from django.urls import path

from .customLogin import custom_login
from .views import CreateProduct, GetUpdateDeleteProduct, searchProducts

urlpatterns = [
    path('products/', CreateProduct.as_view(), name='create-product'),
    path('products/<int:pk>/', GetUpdateDeleteProduct.as_view(), name='get-product'),
    path('products/searchProducts', searchProducts, name='create-product'),
    path('products/login/', custom_login, name='custom_login'),
]
