from import_export import resources

from utils.translations import get_verbose_name_by_name

from .models import Service


class ServiceResource(resources.ModelResource):
    name = resources.Field(
        column_name=get_verbose_name_by_name(Service, 'name'),
        attribute='name',
    )
    parent = resources.Field(
        column_name=get_verbose_name_by_name(Service, 'parent'),
        attribute='parent',
        widget=resources.widgets.ForeignKeyWidget(Service, 'name'),
    )
    description = resources.Field(
        column_name=get_verbose_name_by_name(Service, 'description'),
        attribute='description',
    )
    created_at = resources.Field(
        column_name=get_verbose_name_by_name(Service, 'created_at'),
        attribute='created_at',
        readonly=True,
    )
    updated_at = resources.Field(
        column_name=get_verbose_name_by_name(Service, 'updated_at'),
        attribute='updated_at',
        readonly=True,
    )

    def dehydrate_parent(self, service):
        return service.parent.name if service.parent else None

    class Meta:
        model = Service
        fields = (
            'id',
            'name',
            'parent',
            'description',
            'created_at',
            'updated_at',
        )
        export_order = fields
