# Generated by Django 4.2.1 on 2023-06-26 05:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
        ('payments', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clientinvoice',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='invoices', to='projects.project', verbose_name='Project'),
        ),
    ]