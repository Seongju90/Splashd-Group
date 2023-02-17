from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, FloatField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange

class BeerForm (FlaskForm):
    name = StringField(
        "Beer Name",
        validators=[
            DataRequired(message='Name is Required')
            ])
    abv = FloatField(
        "ABV",
        validators=[
            DataRequired(message= 'ABV Content is Required'),
            NumberRange(min=3.0, max=17.0, message='ABV is between 3.0 to 17.0')
            ])
    ibu = IntegerField(
        "IBU",
        validators=[
            DataRequired(message= 'IBU'),
            NumberRange(min=5, max=100, message='IBU is between 5 to 100')
            ])
    type = StringField(
        "Type",
        validators=[
            DataRequired(message='Type of Beer is Required'),
            Length(min= 0, max= 50, message= "Type can't go over 50 characters")
            ])
    description = TextAreaField(
        "Description",
        validators=[
            DataRequired(message = 'Please add a Description'),
            Length(min= 5, message= 'Description is too short'),
            Length(max=2000, message='Description cant exceed 2000 characters')]),
    beer_logo =  StringField(
        "Beer Logo", 
        validators = [
            DataRequired(message='Beer Logo is required'), 
            Length(min=5, max=255, message='Address is between 5 and 255 characters')
            ])
    submit = SubmitField()
