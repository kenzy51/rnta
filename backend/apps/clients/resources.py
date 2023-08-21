from import_export import resources

from utils.translations import get_verbose_name_by_name

from .models import Client


class ClientResource(resources.ModelResource):
    name = resources.Field(
        column_name=get_verbose_name_by_name(Client, 'name'),
        attribute='name',
    )
    legal_name = resources.Field(
        column_name=get_verbose_name_by_name(Client, 'legal_entity'),
        attribute='legal_entity',
    )
    site = resources.Field(
        column_name=get_verbose_name_by_name(Client, 'site'),
        attribute='site',
    )
    created_at = resources.Field(
        column_name=get_verbose_name_by_name(Client, 'created_at'),
        attribute='created_at',
        readonly=True
    )
    updated_at = resources.Field(
        column_name=get_verbose_name_by_name(Client, 'updated_at'),
        attribute='updated_at',
        readonly=True
    )

    class Meta:
        model = Client
        fields = (
            'id',
            'name',
            'legal_name',
            'site',
            'created_at',
            'updated_at',
        )
        export_order = fields
        import_id_fields = ('name',)
