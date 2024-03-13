from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextAreaField, BooleanField
from wtforms.validators import InputRequired, Length, NumberRange, URL, Optional

class AddPetForm(FlaskForm):
    """Form for adding a new pet."""

    name = StringField(
        "Pet Name",
        validators=[InputRequired()],
    )

    species = SelectField(
        "Species",
        choices=[("cat", "Cat"), ("dog", "Dog"), ("porcupine", "Porcupine")],
    )

    photo_url = StringField(
        "Photo URL",
        validators=[Optional(), URL()],
        description="Add a URL for the pet's photo (optional)."
    )

    age = IntegerField(
        "Age",
        validators=[Optional(), NumberRange(min=0, max=30)],
        description="Specify the age of the pet in years (optional)."
    )

    notes = TextAreaField(
        "Comments",
        validators=[Optional(), Length(min=10)],
        description="Include any additional comments about the pet (optional)."
    )

class EditPetForm(FlaskForm):
    """Form for editing an existing pet."""

    photo_url = StringField(
        "Photo URL",
        validators=[Optional(), URL()],
        description="Update the URL for the pet's photo (optional)."
    )

    notes = TextAreaField(
        "Comments",
        validators=[Optional(), Length(min=10)],
        description="Modify or add comments about the pet (optional)."
    )

    available = BooleanField("Available?")
    # Checkbox indicating whether the pet is available for adoption.
