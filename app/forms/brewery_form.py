from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange

class BreweryForm(FlaskForm):
    name = StringField(
        "Brewery Name",
        validators = [
            DataRequired(message='Brewery Name is required'),
            Length(min=5, max=255, message='Name must be 5 to 255 characters')
        ])
    city_state = StringField(
        "City/State", 
        validators=[
            DataRequired(message='City and/or State required'), 
            Length(min=2, max=255, message='City is too long'),
            # validate_city_state
        ])
    description = TextAreaField(
        "Description",
        validators=[
            DataRequired(message = 'Please add a Description'),
            Length(min= 5, message= 'Description is too short'),
            Length(max=2000, message='Description cant exceed 2000 characters')
            ]),
    brewery_type = SelectField(
        "Brewery", 
        choices=[
            "Regional Brewery",
            "Macro Brewery",
            "Home-brewery",
            "International Brewery"
            ], 
        validators=[
            DataRequired(message='Brewery Type is required')
            ])

    brewery_logo = StringField(
        "Brewery Logo", 
        validators = [
            DataRequired(message='Brewery Logo is required'), 
            Length(min=5, max=255, message='URL must be between 5 and 255 characters')
            ])
    submit = SubmitField("Add a Brewery!")