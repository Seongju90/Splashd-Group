from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length, URL

# if it works use it if not take it out and do validation on front-end
def validate_image_url(form, field):
    if not (field.data.endswith('.jpeg') or field.data.endswith('.jpg') or
            field.data.endswith('.png') or field.data.endswith('.svg')):
        raise ValidationError('URL must end with .jpeg, .jpg, .png, or .svg')

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
            Length(min=10, max=255, message='Badge Icon Url must be between 10 and 255 characters'),
            URL(),
            validate_image_url
        ])
    description = TextAreaField(
        'Description of badge',
        validators=[
            DataRequired(message='Description of the badge is required'),
            Length(min=10, max=2000, message='Length of the description must be between 10 and 2000 characters')
        ])
    submit = SubmitField('Make my Badge!')
