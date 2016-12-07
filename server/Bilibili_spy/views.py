from django.shortcuts import render
from django.views.generic import View
import json
from . import models

class ExamView(View):
    def get(self, request):
        jsonstr = request.GET.get('data')
        params = json.loads(jsonstr)
        for value in params:
            book = models.Book(qs_id=value['id'], an_id= value['hash'])
            book.save()