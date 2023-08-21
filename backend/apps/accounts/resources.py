from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

from import_export import resources
from import_export.fields import Field

from .models import CustomUser

from utils.translations import get_verbose_name_by_name

User = get_user_model()


class CustomUserResource(resources.ModelResource):
    username = Field(
        column_name=get_verbose_name_by_name(User, 'username'),
        attribute='username',
    )
    first_name = Field(
        column_name=get_verbose_name_by_name(User, 'first_name'),
        attribute='first_name',
    )
    last_name = Field(
        column_name=get_verbose_name_by_name(User, 'last_name'),
        attribute='last_name',
    )
    email = Field(
        column_name=get_verbose_name_by_name(User, 'email'),
        attribute='email',
    )
    role = Field(
        column_name=get_verbose_name_by_name(User, 'role'),
        attribute='role',
    )
    salary = Field(
        column_name=get_verbose_name_by_name(User, 'salary'),
        attribute='salary',
    )
    hour_rate = Field(
        column_name=get_verbose_name_by_name(User, 'hour_rate'),
        attribute='hour_rate',
    )
    password = Field(
        column_name=get_verbose_name_by_name(User, 'password'),
        attribute='password',
    )

    def before_import_row(self, row, **kwargs):
        password_label = get_verbose_name_by_name(User, 'password')
        password = row.get(password_label)

        if password:
            row[password_label] = make_password(password)
        else:
            del row[password_label]

    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'role',
            'salary',
            'hour_rate',
            'password'
        ]
        export_order = fields
        import_id_fields = (
            'username',
        )
