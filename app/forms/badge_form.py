from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length, URL, ValidationError

# if it works use it if not take it out and do validation on front-end

#dexwork: it doesnt work. tried it everywhere and called and changed, nothing was returning a validation error to the front end we can use


# breweries = Brewery.query.filter(current_user.id == Brewery.owner_id).all()
# beers_list = []
# for brewery in  breweries:
#     beers = Beer.query.filter(Beer.brewery_id == brewery.id)
#     for beer in beers:
#         beers_list.append(beer.name)

class BadgeForm(FlaskForm):

    icon = StringField(
        'Badge Icon Url',
        validators=[
            DataRequired(message='Badge image url is required'),
        ])
    
    description = TextAreaField(
        'Description of badge',
        validators=[
             Length(min= 5, message= 'Description is too short'),
            Length(max=2000, message='Description cant exceed 2000 characters')
            ]),
    
    submit = SubmitField('Make my Badge!')
