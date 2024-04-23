from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Product


class ProductTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.product_data = {'name': 'Test Product', 'description': 'Test Description', 'price': '10.99'}
        self.response = self.client.post(reverse('create-product'), self.product_data, format='json')
        self.product_id = self.response.data['id']

    def test_create_product(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)

    def test_retrieve_product(self):
        response = self.client.get(reverse('get-product', kwargs={'pk': self.product_id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response.data)
        self.assertEqual(response.data['name'], self.product_data['name'])
        self.assertEqual(response.data['description'], self.product_data['description'])
        self.assertEqual(float(response.data['price']), float(self.product_data['price']))

    def test_update_product(self):
        updated_data = {'name': 'Updated Product', 'description': 'Updated Description', 'price': '19.99'}
        response = self.client.put(reverse('get-product', kwargs={'pk': self.product_id}), updated_data,
                                   format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], updated_data['name'])
        self.assertEqual(response.data['description'], updated_data['description'])
        self.assertEqual(float(response.data['price']), float(updated_data['price']))

    def test_delete_product(self):
        response = self.client.delete(reverse('get-product', kwargs={'pk': self.product_id}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Product.objects.count(), 0)
