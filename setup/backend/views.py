from django.shortcuts import render
from .models import *
import os

from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET

from django.http import JsonResponse

from .services import audiobook_service

@csrf_exempt
@require_GET
def getAudioBook(request, bookId):
   if os.path.exists(f'backend/media/{bookId}/'):
      f = open(f'backend/media/{bookId}/url.txt', "r")
      return JsonResponse({'url': f.read()})
   else:
      return JsonResponse({'url': audiobook_service.generateAudioBook(audiobook_service.getEbook(bookId), bookId)})

@csrf_exempt
@require_GET
def getEbook(request, bookId):
   return JsonResponse(audiobook_service.getEbook(bookId), safe=False)

