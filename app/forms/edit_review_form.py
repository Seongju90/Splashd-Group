from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange


class EditReviewForm(FlaskForm):
    image = StringField(
        "Image Link",
        validators=[
            #dexwork doesnt need because a review has a optional image
            # Length(min=10, max=255, message='Length of image url must be between 10 and 255 characters')
        ])
    review_text = TextAreaField(
        "Review",
        validators=[
            DataRequired(message='Review is required'),
             Length(min= 5, message= 'Review is too short'),
            Length(max=2000, message='Review cant exceed 2000 characters')
            ]),
    
       
    rating = IntegerField(
        "Rating",
        validators=[
            NumberRange(min=0, max=5, message='Rating must be between 0 and 5')
        ])
    submit = SubmitField("Edit Review")
