from django.db.models import TextChoices


class LegalPersonChoices(TextChoices):
    RUNIT = ('RUNIT', 'ООО "РУНИТА"')
    RA_RUNIT = ('RA_RUNIT', 'ООО "РА РУНИТА"')
    UVAROVA = ('Uvarova', 'ИП Уварова')
