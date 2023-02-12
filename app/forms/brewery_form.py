from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange

#if it works use this, but if not, put validations on front end
def validate_city_state(form, field):
    state = field.data[-2:]
    comma = field.data[-4]
    if (state.isupper() == False or state.isalpha() == False):
        raise ValidationError('City, State Format Must Be: City, NY')
    if (comma != ','):
        raise ValidationError('City, State Format Must Be: City, NY')


class BreweryForm(FlaskForm):
    name = StringField(
        "Brewery Name",
        validators = [
            DataRequired(message='Brewery Name is required'),
            Length(min=5, max=255, message='Brewery Name must be between 5 and 255 characters')
        ])
    city_state = StringField(
        "City/State", 
        validators=[
            DataRequired(message='City and/or State required'), 
            Length(min=2, max=255, message='City and State information must be between 255 characters'),
            # validate_city_state
        ])
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

#if philip's custom validator for url image link works, insert that validator
#here as well
    brewery_logo = StringField(
        "Brewery Logo", 
        validators = [
            DataRequired(message='Brewery Logo is required'), 
            Length(min=5, max=255, message='Address must be between 5 and 255 characters')
            ])
    submit = SubmitField("Add a Brewery!")