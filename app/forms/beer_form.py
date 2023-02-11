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
            NumberRange(min=3.0, max=13.0, message='ABV is usually between 3.0 to 13.0')
            ])
    ibu = IntegerField(
        "IBU", 
        validators=[
            DataRequired(message= 'IBU'), 
            NumberRage(min=5, max=100, message='IBU is typically between 5 to 100')
            ])
    type = StringField(
        "Type", 
        validators=[
            DataRequired(message='Type of Beer is Required'),
            Length(min= none, max= 50, message= 'Beer Type Cannot Exceed 50 Characters')
            ])
    description = TextAreaField(
        "Description", 
        validators=[
            DataRequired(message = 'Please add a Description'), 
            Length(min= 5, max= 2000, message= 'Description must be between 5 to 2000 characters')])
    submit = SubmitField("Bottoms Up!")


