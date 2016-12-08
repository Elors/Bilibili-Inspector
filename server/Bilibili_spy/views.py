from django.views.generic import View
from django.http import JsonResponse
import json
from . import models

class ExamView(View):
    def post(self, request):
        jsonstr = request.GET.get('data')
        params = json.loads(jsonstr)

        create = 0
        exists = 0
        for key,value in params.items():
            book,created = models.Book.objects.get_or_create(qs_id=key)
            if created:
                book.an_id = value
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

    def get(self, request):
        queryset = models.Book.objects.all()
        books = {book.qs_id:book.an_id for book in queryset}
        return JsonResponse(books, safe=False)