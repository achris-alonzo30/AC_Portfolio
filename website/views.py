from django.shortcuts import render, redirect
from .forms import ContactForm
from .models import ContactMessage
import datetime
import json
import pprint
import os


def index(request):
    today = datetime.date.today()
    if request.method == 'POST':
        contact_form = ContactForm(request.POST)
        if contact_form.is_valid():
            full_name = contact_form.cleaned_data['full_name']
            email = contact_form.cleaned_data['email']
            message = contact_form.cleaned_data['message']

            # Create a new ContactMessage instance and save it to the database
            contact_message = ContactMessage(full_name=full_name, email=email, message=message)
            contact_message.save()

            return redirect('website:index')

    else:
        contact_form = ContactForm()
        year = today.year

    context = {
        "contact_form": contact_form,
        "year": year,
    }
    return render(request, 'website/index.html', context)


def project_list(request):
    # Get the absolute path to the directory where your JSON file is located
    json_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../static', 'files')

    # Combine the directory path with the JSON filename
    json_path = os.path.join(json_dir, 'project-files.json')

    # Load data from the JSON file
    with open(json_path, 'r') as json_file:
        project_data = json.load(json_file)

    pprint.pprint(project_data)
    context = {
        "project_data": project_data['projects'],  # Assuming 'projects' is the key for the projects list in your JSON
    }
    return render(request, 'website/project-list.html', context)
