from django.shortcuts import render

# todo/views.py

from django.shortcuts import render
from django.utils.decorators import method_decorator
from drf_spectacular.utils import extend_schema
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework import viewsets, status  # add this
from rest_framework.decorators import action

from .serializers import ClientSerializer, JobSerializer, OutreachSerializer  # add this
from .models import Client, Job, Outreach  # add this

TAG_NAME = ["ValleeBackend"]


@method_decorator(
    name="list", decorator=swagger_auto_schema(description="list client", operation_id="listClient", tags=TAG_NAME),
)
@method_decorator(
    name="retrieve",
    decorator=swagger_auto_schema(description="retrieve client", operation_id="getClient", tags=TAG_NAME),
)
@method_decorator(
    name="create",
    decorator=swagger_auto_schema(description="create client", operation_id="createClient", tags=TAG_NAME),
)
@method_decorator(
    name="update",
    decorator=swagger_auto_schema(description="update client", operation_id="updateClient", tags=TAG_NAME),
)
@method_decorator(
    name="partial_update",
    decorator=swagger_auto_schema(description="partial update client", operation_id="partialUpdateClient",
                                  tags=TAG_NAME),
)
class ClientView(viewsets.ModelViewSet):  # add this
    serializer_class = ClientSerializer  # add this
    queryset = Client.objects.all()  # add this


@method_decorator(
    name="list", decorator=swagger_auto_schema(description="list job", operation_id="listJob", tags=TAG_NAME),
)
@method_decorator(
    name="retrieve",
    decorator=swagger_auto_schema(description="retrieve job", operation_id="getJob", tags=TAG_NAME),
)
@method_decorator(
    name="create",
    decorator=swagger_auto_schema(description="create job", operation_id="createJob", tags=TAG_NAME),
)
@method_decorator(
    name="update", decorator=swagger_auto_schema(description="update job", operation_id="updateJob", tags=TAG_NAME),
)
@method_decorator(
    name="partial_update",
    decorator=swagger_auto_schema(description="partial update job", operation_id="partialUpdateJob", tags=TAG_NAME),
)
class JobView(viewsets.ModelViewSet):  # add this
    serializer_class = JobSerializer  # add this
    queryset = Job.objects.all()  # add this

    # ordering_fields = '__all__'

    @method_decorator(name='list',
                      decorator=swagger_auto_schema(tags=TAG_NAME, responses={200: OutreachSerializer(many=True)}))
    @action(detail=True, methods=['get'])
    def outreach_list(self, request, pk=None):
        j = self.get_object()  # retrieve an object by pk provided
        outreaches = Outreach.objects.filter(job=j).distinct().order_by('-created')
        outreaches_json = OutreachSerializer(outreaches, many=True)
        return Response(outreaches_json.data)


@method_decorator(
    name="list", decorator=swagger_auto_schema(description="list outreach", operation_id="listOutreach", tags=TAG_NAME),
)
@method_decorator(
    name="retrieve",
    decorator=swagger_auto_schema(description="retrieve outreach", operation_id="getOutreach", tags=TAG_NAME),
)
@method_decorator(
    name="create",
    decorator=swagger_auto_schema(description="create outreach", operation_id="createOutreach", tags=TAG_NAME),
)
@method_decorator(
    name="update",
    decorator=swagger_auto_schema(description="update outreach", operation_id="updateOutreach", tags=TAG_NAME),
)
@method_decorator(
    name="partial_update",
    decorator=swagger_auto_schema(description="partial update outreach", operation_id="partialUpdateOutreach",
                                  tags=TAG_NAME),
)
class OutreachView(viewsets.ModelViewSet):  # add this
    serializer_class = OutreachSerializer  # add this
    queryset = Outreach.objects.all()  # add this
    # ordering_fields = '__all__'
    ordering = ['-created']
    ordering_fields = [
        "created",
        "modified",
        "state",
    ]

    def create(self, request, *args, **kwargs):
        print(request.data)
        if 'editorState' in request.data:
            request.data['editor_state'] = request.data.pop('editorState')

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)