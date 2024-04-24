from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response


@csrf_exempt
@api_view(['POST'])
def custom_login(request):

    if request.method == 'POST':
        username = request.data['username']
        password = request.data['password']

        # Authenticate the user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # If authentication succeeds, log the user in
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})

        else:
            # If authentication fails, return an error message
            return JsonResponse({'error': 'Invalid username or password'}, status=400)
    else:
        # Return an error if the request method is not POST
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
