from django.db import models


class Book(models.Model):
    '''

    '''
    qs_id = models.CharField(max_length=50)
    an_id = models.CharField(max_length=50)