from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange


class ReviewForm(FlaskForm):
    image = StringField(
        "Image Link",
        validators=[
            Length(min=10, max=255, message='Length of image url must be between 10 and 255 characters')
        ])
    review_text = TextAreaField(
        "Review",
        validators=[
            DataRequired(message='Review is required'),
            Length(min=10, max=2000, message='Review length must be between 10 and 2000 letters')
        ])
    rating = IntegerField(
        "Rating",
        validators=[
            DataRequired(message='Rating is required'),
            NumberRange(min=0, max=5, message='Rating must be between 0 and 5')
        ])
    submit = SubmitField("Submit Review")
