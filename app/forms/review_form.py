from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField,FloatField
from wtforms.validators import DataRequired, Length, NumberRange


class ReviewForm(FlaskForm):
    image = StringField(
        "Image Link"
        )
    review_text = TextAreaField(
        "Review Text",
        validators=[
            DataRequired(message='Review is required'),
            Length(min= 5, message= 'Review is too short'),
            Length(max=2000, message='Review cant exceed 2000 characters')
            ]),
    rating = FloatField(
        "Rating",
        validators=[
            DataRequired(message='Rating is required'),
            NumberRange(min=0, max=5, message='Rating must be between 0 and 5')
        ])
    # submit = SubmitField("Submit Review")
