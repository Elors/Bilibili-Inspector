from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse, JsonResponse
import json
from . import models

class ExamView(View):
    def post(self, request):
        jsonstr = request.GET.get('data')
        params = json.loads(jsonstr)

        create = 0
        exists = 0
        for value in params:
            book,created = models.Book.objects.get_or_create(qs_id=value['id'])
            if created:
                book.an_id = value['hash']
                create += 1
                book.save()
            else:
                exists += 1

        response_data = {
            'create': create,
            'exists': exists,
            'message': 'yes',
        }
        return JsonResponse(response_data)

